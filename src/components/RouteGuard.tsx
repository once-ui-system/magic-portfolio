"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { protectedRoutes } from "@/resources";
import { isCheckedOnServer, isRouteEnabled } from "@/utils/routes";
import { Flex, Spinner, Button, Heading, Column, Input } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

// Everything is decided during render, so the server ships the real page content instead of a
// spinner. Only password-protected pages wait for the auth check.
const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const isPasswordRequired = !!protectedRoutes[pathname as keyof typeof protectedRoutes];
  const [password, setPassword] = useState("");
  // The auth result is kept per path, so it never carries over to another protected page.
  const [auth, setAuth] = useState<{ path: string; ok: boolean } | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isPasswordRequired) return;

    let cancelled = false;
    fetch("/api/check-auth")
      .then((response) => response.ok)
      .catch(() => false)
      .then((ok) => {
        if (!cancelled) setAuth({ path: pathname, ok });
      });

    return () => {
      cancelled = true;
    };
  }, [pathname, isPasswordRequired]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setAuth({ path: pathname, ok: true });
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  // Switched-off pages that check `routes` on the server already render the 404 page with a 404
  // status, so they pass through. Any other switched-off path (a page you added) gets it here.
  if (!isRouteEnabled(pathname) && !isCheckedOnServer(pathname)) {
    return <NotFound />;
  }

  if (isPasswordRequired && auth?.path !== pathname) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (isPasswordRequired && !auth?.ok) {
    return (
      <Column paddingY="128" maxWidth="24rem" gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <Input
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
            type="password"
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };

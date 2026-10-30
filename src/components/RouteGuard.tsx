"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

// src/proxy.ts rewrites a protected page to /locked for visitors without
// access, so that is the pathname the server renders with.
const LOCKED_PATH = "/locked";

function isRouteEnabled(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname === LOCKED_PATH) return true;

  if (pathname in routes) {
    return routes[pathname as keyof typeof routes];
  }

  const dynamicRoutes = ["/blog", "/work"] as const;
  for (const route of dynamicRoutes) {
    if (pathname.startsWith(route) && routes[route]) {
      return true;
    }
  }

  return false;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  // Both are known from the path alone, so public pages render their content
  // on the server (crawlers and first paint see it); only a protected page
  // waits for the access check.
  const routeEnabled = isRouteEnabled(pathname);
  const isPasswordRequired =
    pathname === LOCKED_PATH || Boolean(protectedRoutes[pathname as keyof typeof protectedRoutes]);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(isPasswordRequired);

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-check access on every navigation, even between two protected pages.
  useEffect(() => {
    if (!isPasswordRequired) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setIsAuthenticated(false);
    fetch("/api/check-auth").then((response) => {
      if (cancelled) return;
      setIsAuthenticated(response.ok);
      setLoading(false);
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
      setIsAuthenticated(true);
      setError(undefined);
      // The server rendered this page without its content; render it again
      // now that the access cookie is set.
      router.refresh();
    } else if (response.status === 429) {
      setError("Too many attempts, try again later");
    } else {
      setError("Incorrect password");
    }
  };

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (!routeEnabled) {
    return <NotFound />;
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };

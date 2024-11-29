"use client";

import { useEffect, useState } from "react";
import { routes, protectedRoutes } from "@/app/resources";
import { Flex, Spinner, Input, Button, Heading } from "@/once-ui/components";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performChecks = async () => {
      setLoading(true);
      setIsRouteEnabled(false);
      setIsPasswordRequired(false);
      setIsAuthenticated(false);
      setIsRouteEnabled(true);
      setLoading(false);
    };

    performChecks();
  }, []);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" justifyContent="center">
        <Spinner />
      </Flex>
    );
  }

  if (!isRouteEnabled) {
    return (
      <Flex fillWidth paddingY="128" justifyContent="center">
        <Spinner />
      </Flex>
    );
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Flex
        fillWidth
        paddingY="128"
        maxWidth={24}
        gap="24"
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Input
          id="password"
          type="password"
          label="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(undefined);
          }}
          error={error}
        />
        <Button onClick={handlePasswordSubmit} size="l">
          Submit
        </Button>
      </Flex>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };

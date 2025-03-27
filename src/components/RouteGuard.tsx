"use client";

// React/Next.js imports
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Internal imports
import { routes, protectedRoutes } from "@/app/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@/once-ui/components";
import NotFound from "@/app/not-found";

/**
 * Props for the RouteGuard component
 */
interface RouteGuardProps {
  children: React.ReactNode;
}

/**
 * RouteGuard component that protects routes based on configuration and password authentication
 * 
 * This component checks if a route is enabled and if it requires password protection.
 * If the route is not enabled, it shows a 404 page.
 * If the route is password protected, it shows a password input form.
 * 
 * @param {RouteGuardProps} props - Component props
 * @returns {React.ReactElement} The protected route content or appropriate UI
 */
const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    /**
     * Performs checks to determine if the current route is enabled and if it requires authentication
     */
    const performChecks = async () => {
      setLoading(true);
      setIsRouteEnabled(false);
      setIsPasswordRequired(false);
      setIsAuthenticated(false);
      setError(null);

      /**
       * Checks if the current route is enabled based on the configuration
       * 
       * @returns {boolean} Whether the current route is enabled
       */
      const checkRouteEnabled = () => {
        if (!pathname) return false;

        // Check if pathname exists directly in routes
        if (pathname in routes) {
          return Boolean(routes[pathname as keyof typeof routes]);
        }

        // Check for dynamic routes that start with certain prefixes
        const dynamicRoutes = ["/blog", "/work"] as const;
        for (const route of dynamicRoutes) {
          if (pathname.startsWith(route) && routes[route as keyof typeof routes]) {
            return true;
          }
        }

        return false;
      };

      const routeEnabled = checkRouteEnabled();
      setIsRouteEnabled(routeEnabled);

      // Check if route is password protected
      const isProtected = pathname ? pathname in protectedRoutes : false;
      if (isProtected) {
        setIsPasswordRequired(true);

        try {
          const response = await fetch("/api/check-auth");
          if (response.ok) {
            setIsAuthenticated(true);
          } else if (response.status !== 401) {
            // Only set error if it's not a standard unauthorized response
            setError("Error checking authentication status");
          }
        } catch (err) {
          setError("Failed to check authentication status");
          console.error("Authentication check error:", err);
        }
      }

      setLoading(false);
    };

    performChecks();
  }, [pathname]);

  /**
   * Handles password form submission for protected routes
   * 
   * @returns {Promise<void>}
   */
  const handlePasswordSubmit = async () => {
    // Don't submit if already in progress or password is empty
    if (isSubmitting || !password.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        // Clear password from state after successful authentication
        setPassword("");
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.message || "Incorrect password");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
      console.error("Authentication error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles Enter key press in password input
   * 
   * @param {React.KeyboardEvent<HTMLInputElement>} e - Keyboard event
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePasswordSubmit();
    }
  };

  // Show loading spinner while checking route access
  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  // Show 404 page if route is not enabled
  if (!isRouteEnabled) {
    return <NotFound />;
  }

  // Show password input form for protected routes
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
            onKeyDown={handleKeyDown}
            errorMessage={error}
            disabled={isSubmitting}
            autoComplete="current-password"
            aria-label="Enter password to access this page"
          />
          <Button 
            onClick={handlePasswordSubmit} 
            disabled={isSubmitting || !password.trim()}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Column>
      </Column>
    );
  }

  // Render children if all checks pass
  return <>{children}</>;
};

export { RouteGuard };

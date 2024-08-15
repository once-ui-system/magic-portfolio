"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { routes } from '@/app/resources/config';
import { Flex, Spinner } from '@/once-ui/components';

interface RouteGuard {
    children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuard> = ({ children }) => {
    const pathname = usePathname();
    const [isRouteEnabled, setIsRouteEnabled] = useState(false);

    useEffect(() => {
        const checkRouteEnabled = () => {
            if (pathname in routes) {
                return routes[pathname as keyof typeof routes];
            }

            const dynamicRoutes = ['/blog', '/work'] as const;
            for (const route of dynamicRoutes) {
                if (pathname?.startsWith(route) && routes[route]) {
                    return true;
                }
            }

            return false;
        };

        setIsRouteEnabled(checkRouteEnabled());
    }, [pathname]);

    if (!isRouteEnabled) {
        return (
            <Flex
                fillWidth paddingY="128"
                justifyContent="center">
                <Spinner/>
            </Flex>
        );
    }

    return <>{children}</>;
};

export { RouteGuard };
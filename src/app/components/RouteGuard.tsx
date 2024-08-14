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
        if (routes[pathname as keyof typeof routes]) {
            setIsRouteEnabled(true);
        } else {
            const isBlogRoute = pathname?.startsWith('/blog');
            setIsRouteEnabled(isBlogRoute && routes['/blog']);
        }
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
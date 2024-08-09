"use client";

import { Flex, SmartLink } from "@/once-ui/components"
import { usePathname } from "next/navigation";
import { config } from '@/app/resources'

export const Header = () => {
    const pathname = usePathname() ?? '';

    return (
        <Flex style={{top: '0'}}
            as="header"
            position="sticky"
            fillWidth padding="8"
            justifyContent="center">
            <Flex
                background="surface" border="surface" borderStyle="solid-1" radius="l" shadow="l"
                paddingY="12" paddingX="16"
                justifyContent="center">
                <Flex
                    gap="16"
                    textVariant="body-default-s">
                    { config.routes['/'] && (
                        <SmartLink
                            prefixIcon="home"
                            href="/"
                            selected={pathname === "/"}>
                            Home
                        </SmartLink>
                    )}
                    { config.routes['/about'] && (
                        <SmartLink
                            prefixIcon="person"
                            href="/about"
                            selected={pathname === "/about"}>
                            About
                        </SmartLink>
                    )}
                    { config.routes['/projects'] && (
                        <SmartLink
                            prefixIcon="grid"
                            href="/projects"
                            selected={pathname === "/projects"}>
                            Projects
                        </SmartLink>
                    )}
                    { config.routes['/blog'] && (
                        <SmartLink
                            prefixIcon="book"
                            href="/blog"
                            selected={pathname === "/blog"}>
                            Blog
                        </SmartLink>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}
"use client";

import { Logo, useTheme } from '@once-ui-system/core';

export default function BrandLogo() {

    const { theme } = useTheme();

    return (
        <Logo
            dark={theme === "dark"}
            light={theme === "light"}
            icon={
                theme === "light"
                    ? "/trademarks/wordmark-light.svg"
                    : "/trademarks/wordmark-dark.svg"
            }
            style={{
                display: "inline-flex",
                top: "0.25em",
                marginLeft: "-0.25em",
            }}
        />
    )
}

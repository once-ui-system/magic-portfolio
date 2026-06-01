"use client";

import React, { useEffect, useState } from "react";
import { ToggleButton } from "@once-ui-system/core";
import { useParams, usePathname, useRouter } from "next/navigation";

export const LanguageToggle: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentLocale = (params?.locale as string) || "en";
    const nextLocale = currentLocale === "en" ? "pt-BR" : "en";
    const label = currentLocale === "en" ? "PT" : "EN";

    const toggleLanguage = () => {
        let newPathname = pathname || "/";
        if (newPathname.startsWith(`/${currentLocale}`)) {
            newPathname = newPathname.replace(`/${currentLocale}`, `/${nextLocale}`);
        } else {
            newPathname = `/${nextLocale}${newPathname}`;
        }
        router.push(newPathname);
    };

    if (!mounted) return null;

    return (
        <ToggleButton
            onClick={toggleLanguage}
            label={label}
            aria-label={`Switch to ${nextLocale}`}
            style={{ fontWeight: "bold", padding: "0 8px" }}
        />
    );
};

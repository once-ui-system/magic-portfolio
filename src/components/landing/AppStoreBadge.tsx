"use client";

import { useTheme } from "@once-ui-system/core";
import { appStoreUrl } from "@/resources";

type AppStoreBadgeProps = {
  theme?: "light" | "dark";
  href?: string;
};

export const AppStoreBadge = ({
  theme,
  href = appStoreUrl,
}: AppStoreBadgeProps) => {
  // Apple's badge is designed as either all-black (on light surfaces) or
  // all-white (on dark surfaces) — it must flip with the site's actual
  // resolved theme, not just default to light, or it disappears in dark mode.
  const { resolvedTheme } = useTheme();
  const isDark = (theme ?? resolvedTheme) === "dark";
  const bg = isDark ? "#FFFFFF" : "#000000";
  const fg = isDark ? "#000000" : "#FFFFFF";

  return (
    <a
      href={href}
      aria-label="Download on the App Store"
      target="_blank"
      rel="noopener noreferrer"
      className="streaktap-tap"
      style={{
        alignItems: "center",
        gap: "10px",
        padding: "10px 18px",
        height: "52px",
        background: bg,
        color: fg,
        borderRadius: "10px",
        textDecoration: "none",
        fontFamily: "var(--font-body), -apple-system, system-ui, sans-serif",
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill={fg}
      >
        <path d="M16.365 1.43c0 1.14-.44 2.234-1.165 3.029-.785.852-2.05 1.514-3.084 1.43-.124-1.114.43-2.276 1.146-3.024.79-.835 2.13-1.46 3.103-1.435zM20.18 17.402c-.564 1.273-.836 1.84-1.566 2.965-1.02 1.571-2.458 3.53-4.24 3.547-1.583.014-1.99-1.025-4.137-1.014-2.147.012-2.595 1.033-4.18 1.018-1.78-.016-3.144-1.78-4.165-3.353-2.85-4.38-3.148-9.52-1.39-12.252 1.247-1.94 3.214-3.073 5.062-3.073 1.881 0 3.064 1.028 4.618 1.028 1.51 0 2.43-1.03 4.605-1.03 1.646 0 3.39.896 4.63 2.444-4.067 2.226-3.406 8.04.763 9.72z" />
      </svg>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontSize: "10px", opacity: 0.85 }}>Download on the</span>
        <span style={{ fontSize: "19px", fontWeight: 600, marginTop: "2px" }}>
          App Store
        </span>
      </span>
    </a>
  );
};

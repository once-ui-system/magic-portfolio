import localFont from 'next/font/local'

// Font configuration
export const fontConfig = {
  primary: {
    name: "Inter",
    src: "/fonts/Inter.ttf",
    variable: "font-primary",
    display: "swap" as const
  },
  fallback: "system-ui, -apple-system, sans-serif"
} as const

// Font loader - using Inter as the default example
export const primary = localFont({
  src: '../../../public/fonts/Inter.ttf',
  variable: '--font-primary',
  display: 'swap'
})

import {defineRouting} from 'next-intl/routing';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  // locales: ['en', 'id'],
  locales: ['en'],
 
  // Used when no locale matches
  defaultLocale: 'en',

  // Won't display `defaultLocale` in routes
  localePrefix: 'as-needed'
});
 
export type Locale = (typeof routing.locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation(routing);
import { getPosts } from '@/app/utils/utils'
import { baseURL, routes as routesConfig } from '@/app/resources'
import { routing } from '@/i18n/routing'

export default async function sitemap() {
    const locales = routing.locales;
    const includeLocalePrefix = locales.length > 1;

    let blogs = locales.flatMap((locale) => 
        getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]).map((post) => ({
            url: `${baseURL}${includeLocalePrefix ? `/${locale}` : ''}/blog/${post.slug}`,
            lastModified: post.metadata.publishedAt,
        }))
    );

    let works = locales.flatMap((locale) => 
        getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]).map((post) => ({
            url: `${baseURL}${includeLocalePrefix ? `/${locale}` : ''}/work/${post.slug}`,
            lastModified: post.metadata.publishedAt,
        }))
    );

    const activeRoutes = Object.keys(routesConfig).filter((route) => routesConfig[route]);

    let routes = locales.flatMap((locale)=> 
        activeRoutes.map((route) => ({
            url: `${baseURL}${includeLocalePrefix ? `/${locale}` : ''}${route !== '/' ? route : ''}`,
            lastModified: new Date().toISOString().split('T')[0],
        }))
    );

    return [...routes, ...blogs, ...works]
}
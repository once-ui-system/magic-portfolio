import { getPosts } from '@/app/utils'
import { baseURL } from '@/app/resources'

export default async function sitemap() {
    let blogs = getPosts(['src', 'app', 'blog', 'posts']).map((post) => ({
        url: `${baseURL}/blog/${post.slug}`,
        lastModified: post.metadata.publishedAt,
    }))

    let works = getPosts(['src', 'app', 'work', 'projects']).map((post) => ({
        url: `${baseURL}/work/${post.slug}`,
        lastModified: post.metadata.publishedAt,
    }))

    let routes = ['', '/blog', '/work'].map((route) => ({
        url: `${baseURL}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }))

    return [...routes, ...blogs, ...works]
}
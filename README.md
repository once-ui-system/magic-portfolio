# Magic Portfolio

Magic Portfolio is a simple, clean, beginner-friendly portfolio template. It supports an MDX-based content system for projects and blog posts, an about / CV page and a gallery.

View the demo [here](https://magic-portfolio-demo.vercel.app).

![Magic Portfolio](public/images/og/home.jpg)

Launch your portfolio on [Aveiro](https://www.aveiro.app/marketplace/spotlight), our managed publishing platform. Update case studies, blog posts and content through MCP from your favorite AI tools.

## Getting started

**1. Clone the repository**
```
git clone https://github.com/once-ui-system/magic-portfolio.git
```

**2. Install dependencies**
```
npm install
```

**3. Run dev server**
```
npm run dev
```

**4. Edit config**
```
src/resources/once-ui.config.ts
```

**5. Edit content**
```
src/resources/content.tsx
```

**6. Create blog posts / projects**
```
Add a new .mdx file to src/app/blog/posts or src/app/work/projects
```

Magic Portfolio was built with [Once UI](https://once-ui.com) for [Next.js](https://nextjs.org). It requires Node.js 20.9 or later.

## Documentation

Docs available at: [docs.once-ui.com](https://docs.once-ui.com/docs/magic-portfolio/quick-start)

## Features

### Once UI
- All tokens, components & features of [Once UI](https://once-ui.com)

### SEO
- Automatic open-graph and X image generation with next/og
- RSS feed at `/api/rss`
- Automatic schema and metadata generation based on the content file

### Aesthetics
- Five complete looks, switched with one line (`aesthetic` in `src/resources/once-ui.config.ts`): Classic, Editorial, Swiss, Aurora and Terminal
- Each one sets the Once UI theme, fonts, page background and home page layout; copy a preset in `src/resources/aesthetics.ts` to make your own
- Modular home page: heroes (centered, statement, split, terminal), a ticker, work (stack, index, bento) and posts (grid, list), reordered or swapped with `homeSections`
- Effects from Once UI: reveal, tilt, holographic card, typing, blobs and particles. Want WebGL backgrounds? Drop a [Once UI Pro effect](https://once-ui.com/effects) into `src/components/aesthetic/ProEffect.tsx`
- An optional switcher (`display.aestheticSwitcher`) lets visitors try every aesthetic

### Design
- Responsive layout optimized for all screen sizes
- Endless customization options through [data attributes](https://once-ui.com/docs/theming)

### Content
- Render sections conditionally based on the content file
- Enable or disable pages for blog, work, gallery and about / CV
- Generate and display social links automatically
- Set up password protection for URLs
- Write math in posts with LaTeX between `$$` signs, rendered with KaTeX

### Newsletter
- Signups from the home page and blog go straight into your [Aveiro](https://www.aveiro.app) audience, where you also write and send the newsletter
- Create an embed form in Aveiro under Audience → Embed and paste its public ID as `aveiroEmbedId` in `src/resources/once-ui.config.ts`

### Read counts
- Optional "12 reads" beside the date on posts and projects. Off by default: set `features.viewCounts` to `true` in `src/resources/once-ui.config.ts`
- Counts live in [Upstash Redis](https://upstash.com). On Vercel, add the Upstash integration (Storage → Upstash → Redis) and connect it to the project; elsewhere, copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from the Upstash console into your env (see `.env.example`). Posts are prerendered, so redeploy after adding the env
- Without Redis env the counter renders nothing in production. `next dev` counts in memory, so you can try it locally
- Only the production deployment writes (`VERCEL_ENV=production` on Vercel, `NODE_ENV=production` elsewhere); local dev and preview deployments connected to that Redis only read it (the in-memory store of `next dev` without Redis env does accept writes)
- A visitor counts once per post per 24 hours, tracked by an anonymous random id in an httpOnly cookie (`vid`). Requests from other sites are refused, each IP is rate limited, and password-protected pages only count for visitors who unlocked them. Mention the cookie in your privacy notice if you have one

### Likes
- Optional like button on posts and projects. Off by default: set `features.likes` to `true` in `src/resources/once-ui.config.ts`
- Likes live in [Upstash Redis](https://upstash.com). On Vercel, add the Upstash integration (Storage → Upstash → Redis) and connect it to the project; elsewhere, copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from the Upstash console into your env (see `.env.example`). Posts are prerendered, so redeploy after adding the env
- Without Redis env the button renders nothing in production. `next dev` keeps likes in memory, so you can try it locally
- Only the production deployment writes (`VERCEL_ENV=production` on Vercel, `NODE_ENV=production` elsewhere); local dev and preview deployments connected to that Redis only read it (the in-memory store of `next dev` without Redis env does accept writes)
- One like per visitor per post, tracked by an anonymous random id in an httpOnly cookie (`vid`). Requests from other sites are refused, each IP is rate limited, and password-protected pages only accept likes from visitors who unlocked them. Mention the cookie in your privacy notice if you have one

### Localization
- A localized, earlier version of Magic Portfolio is available with the next-intl library
- To use localization, switch to the [`localization-(Once-UI-0.4.2)`](https://github.com/once-ui-system/magic-portfolio/tree/localization-%28Once-UI-0.4.2%29) branch

## Creators

Lorant One: [Threads](https://www.threads.net/@lorant.one) / [LinkedIn](https://www.linkedin.com/in/lorant-one/)

## Get involved

- Join the Design Engineers Club on [Discord](https://discord.com/invite/5EyAQ4eNdS) and share your project with us!
- Deployed your docs? Share it on the [Once UI Hub](https://once-ui.com/hub) too! We feature our favorite apps on our landing page.

## License

Distributed under the CC BY-NC 4.0 License.
- Attribution is required.
- Commercial usage is not allowed.
- You can extend the license to [Dopler CC](https://dopler.app/license) by purchasing a [Once UI Pro](https://once-ui.com/pricing) license.

See `LICENSE` for more information.

## Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fonce-ui-system%2Fmagic-portfolio&project-name=portfolio&repository-name=portfolio&redirect-url=https%3A%2F%2Fgithub.com%2Fonce-ui-system%2Fmagic-portfolio&demo-title=Magic%20Portfolio&demo-description=Showcase%20your%20designers%20or%20developer%20portfolio&demo-url=https%3A%2F%2Fmagic-portfolio-demo.vercel.app&demo-image=%2F%2Fraw.githubusercontent.com%2Fonce-ui-system%2Fmagic-portfolio%2Fmain%2Fpublic%2Fimages%2Fog%2Fhome.jpg)

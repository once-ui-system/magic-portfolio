const routes = {
    '/': true,
    '/about': true,
    '/work': true,
    '/blog': true,
    '/gallery': true,
}

// Enable password protection on selected routes
const protectedRoutes = {
    '/about': true
}

const effects = {
    gradient: true,
    dots: true,
    lines: false,
}

const display = {
    location: true,
    time: true
}

const mailchimp = {
    action: 'https://once-ui.us21.list-manage.com/subscribe/post?u=c1a5a210340eb6c7bff33b2ba&amp;id=0462d244aa&amp;f_id=00cd5fe1f0',
}

const baseURL = 'nextjs-portfolio.up.railway.app'

export { routes, protectedRoutes, effects, display, mailchimp, baseURL };
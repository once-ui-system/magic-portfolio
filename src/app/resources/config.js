const baseURL = "demo.magic-portfolio.com";

const routes = {
  "/": true,
  "/about": true,
  "/work": true,
  "/experience": true,
  "/contact": true,
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
const protectedRoutes = {
 
};

const style = {
  theme: "dark", // dark | light (default; visitors can switch with the toggle in the header)
  neutral: "gray", // sand | gray | slate
  brand: "moss", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "orange", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "contrast", // color | contrast
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "translucent", // filled | translucent
  transition: "all", // all | micro | macro
};

const effects = {
  mask: {
    cursor: true,
    x: 0,
    y: 0,
    radius: 75,
  },
  gradient: {
    display: true,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: true,
    size: 2,
    color: "brand-on-background-weak",
    opacity: 20,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
};

const display = {
  location: false,
  time: false,
};

const mailchimp = {
  title: "Get in Touch",
  description: "Have a project in mind or want to collaborate? Send me a message and I'll get back to you as soon as possible.",
  action: "",
  effects: {
    mask: {
      cursor: false,
      x: 100,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      x: 100,
      y: 50,
      width: 100,
      height: 100,
      tilt: -45,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
      opacity: 100,
    },
    dots: {
      display: false,
      size: 24,
      color: "brand-on-background-weak",
      opacity: 100,
    },
    lines: {
      display: false,
      color: "neutral-alpha-weak",
      opacity: 100,
    },
    grid: {
      display: true,
      color: "neutral-alpha-weak",
      opacity: 100,
    },
  },
};

const contact = {
  display: true,
  title: "Get in Touch",
  description: "Have a project in mind or want to collaborate? Send me a message and I'll get back to you as soon as possible.",
  
  // Form action URL (if submitting to a server)
  action: "",
  
  // Background effects configuration
  effects: {
    mask: {
      cursor: "default",
      x: "50%",
      y: "50%",
      radius: "100%"
    },
    gradient: {
      display: true,
      x: "50%",
      y: "50%",
      width: "100%",
      height: "100%",
      tilt: 0,
      colorStart: "var(--color-primary)",
      colorEnd: "var(--color-secondary)",
      opacity: 20
    },
    dots: {
      display: true,
      color: "var(--color-neutral-light)",
      size: 1,
      opacity: 30
    },
    grid: {
      display: false,
      color: "var(--color-neutral-medium)",
      width: 20,
      height: 20,
      opacity: 10
    },
    lines: {
      display: true,
      opacity: 15
    }
  },
  
  // Form fields configuration (optional)
  fields: {
    name: {
      placeholder: "Your Name",
      required: true
    },
    email: {
      placeholder: "Your Email",
      required: true
    },
    message: {
      placeholder: "Your Message",
      required: true,
      rows: 4
    }
  },
  
  // Success/error messages (optional)
  messages: {
    success: "Thank you for your message! I'll get back to you soon.",
    error: "There was an error sending your message. Please try again later."
  },
  
  // Submit button configuration (optional)
  submit: {
    text: "Send Message",
    loadingText: "Sending..."
  }
};

export { routes, protectedRoutes, effects, style, display, mailchimp, baseURL, contact };

# BytesNest Website

A responsive, dark-first portfolio site built with semantic HTML, custom CSS, vanilla JavaScript, and Tailwind CSS via CDN. There is no backend or build step. It can be deployed as a static site to Vercel, Netlify, or Cloudflare Pages.

## Folder structure

```text
bytesnest-website/
├── index.html
├── 404.html
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── favicon.svg
    └── og-cover.svg
```

## 1. Preview locally

You can open `index.html` directly, but a local static server gives a more realistic preview. From this folder run:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`. Alternatively, use the Live Server extension in VS Code.

## 2. Edit the brand, contact details, and links

Open `index.html` in VS Code or another editor.

- **Domain:** Replace `yourdomain.com` in the canonical/social metadata, sitemap, and relevant links with your real domain.
- **Brand name:** The visible wordmark uses `BytesNest` (with a capital B and N). Change it in the header and footer if desired.
- **Email:** Set to `waqarii456@gmail.com` (contact section, floating button, form). Search that address to change it.
- **WhatsApp:** Set to +92 328 7797360 (`https://wa.me/923287797360`) in the contact section, floating button, and the form's `data-whatsapp` attribute.
- **Subdomains:** Update the Free Online Tools and Developer Blog URLs to your real `tools.yourdomain.com` and `blog.yourdomain.com` addresses.
- **Social links:** Replace the sample GitHub, LinkedIn, and YouTube profile URLs with your own profiles.
- **Project buttons:** The two project cards currently point to generic GitHub URLs. Replace each Live demo and View code link with the actual project URLs. Project previews are CSS illustrations; they are not screenshots of live projects.
- **Text and skills:** Edit the relevant text in `index.html`. Keep one main `<h1>` and maintain a sensible heading order.

## 3. Replace project previews with screenshots

The project preview areas are CSS mockups, so there are no large screenshot files to optimize. To use real screenshots:

1. Put optimized `.webp` or `.avif` files in `assets/` (for example, `country-explorer.webp`).
2. Replace the relevant mockup markup inside each `.project-art` container with an image, e.g. `<img src="/assets/country-explorer.webp" alt="Country Explorer application screenshot" loading="lazy" width="1200" height="800">`.
3. Keep descriptive alt text and use appropriately sized images. The first hero illustration is CSS, so it does not need an image download.

## 4. Contact form

The form works with no backend. After validation, **Send via WhatsApp** opens WhatsApp and **Send via Email** opens the visitor's email app, each with the details pre-filled. A floating WhatsApp button and email button appear on every screen.

Optional direct delivery: create a form at [Formspree](https://formspree.io/) and paste its endpoint (`https://formspree.io/f/xxxxxxxx`) into the `data-endpoint=""` attribute of `<form id="contactForm">` in `index.html`. The form will then POST to Formspree instead of opening WhatsApp/email.

## 5. Add Google Analytics (optional)

In `index.html`, search for `G-XXXXXXXXXX` and replace both occurrences with your Google Analytics 4 Measurement ID. If you do not want analytics, remove the Google Analytics script and inline configuration block. Add a privacy/cookie notice if required for your audience or jurisdiction.

## 6. Deploy to Vercel

1. Upload this folder to a Git repository, or import the repository into [Vercel](https://vercel.com/).
2. Choose **Other** as the framework preset if prompted.
3. Leave Build Command and Output Directory empty/default for a static HTML site (the root folder is the output).
4. If the site is in a subfolder in your repository, set the Root Directory to that folder.
5. Deploy. Vercel provides a temporary `*.vercel.app` URL for testing.
6. In Vercel project settings, open **Domains**, add your custom domain, and follow the exact DNS instructions Vercel displays.

## 7. Deploy to Netlify

1. Sign in to [Netlify](https://app.netlify.com/).
2. Either drag-and-drop this folder into Netlify's manual deploy area, or push it to Git and choose **Add new site → Import an existing project**.
3. For a plain static site, set the publish directory to the project root (`.`); no build command is needed.
4. After deployment, open **Domain management** and add your custom domain. Follow the DNS values shown in Netlify.

The included `404.html` is the custom not-found page. Static hosting providers generally serve it automatically for missing pages.

## 8. Connect your domain and subdomains (DNS)

DNS values vary by host and account. Do not copy generic IP addresses from a tutorial; use the values displayed by your chosen host.

1. Buy or access your domain at your registrar (for example, Cloudflare, Namecheap, or your existing provider).
2. Add the apex domain (`yourdomain.com`) in your host's domain settings. Copy the required DNS records exactly.
3. At your DNS provider, create the apex/root records required by your host. Depending on the host, this may be an `A`, `AAAA`, or flattened `CNAME` record.
4. For `www`, create the record your host recommends (commonly a `CNAME`) or configure a redirect to the apex domain.
5. For `tools.yourdomain.com`, create a `CNAME` (or host-specific record) pointing to the deployment target for your tools site.
6. For `blog.yourdomain.com`, create a separate `CNAME` (or host-specific record) pointing to the deployment target for your blog.
7. Add each subdomain inside the appropriate hosting project/provider as well as in DNS. A DNS record alone does not deploy a website.
8. If the domain uses Cloudflare proxying, follow the host's guidance on whether records should initially be DNS-only. Allow time for DNS propagation and verify HTTPS certificates.

You can host the main website, tools, and blog on different projects/providers. Each subdomain needs its own deployment configured to serve that site.

## Features included

- Responsive layout and mobile navigation
- Dark/light theme toggle (preference saved in browser storage)
- Lightweight scroll-reveal effects, with reduced-motion support
- Back-to-top button
- Project cards and subdomain links
- Floating WhatsApp + email buttons, improved validated contact form (WhatsApp/email send, optional Formspree)
- Navy, electric blue and purple gradient theme with scroll progress bar and card spotlight effects
- SEO title, meta description, Open Graph metadata, favicon, sitemap, and robots file
- Google Analytics placeholder
- Custom 404 page

## Before launch checklist

- [ ] Replace all `yourdomain.com` references with the real domain.
- [ ] Add your social profiles (email and WhatsApp are set).
- [ ] Update project demo/repository links.
- [ ] Test the WhatsApp/email form buttons (and Formspree if you add it).
- [ ] Replace `G-XXXXXXXXXX` or remove the analytics block.
- [ ] Confirm tools/blog subdomains point to deployed sites.
- [ ] Test keyboard navigation, mobile layouts, form submission, and links.
- [ ] Validate metadata and run Lighthouse after deployment.

## Performance notes

The site uses CSS illustrations rather than heavy stock imagery and only a small Intersection Observer animation. Tailwind is loaded from its CDN for convenient editing; for the smallest production payload and best long-term performance, consider compiling Tailwind locally and removing unused styles. Google Fonts and analytics are third-party requests and can be removed if you prefer fewer external requests.

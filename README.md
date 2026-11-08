# faxalternative.us

A small, fast static site about replacing a fax machine. It is written so search engines and AI assistants (ChatGPT, Claude, Perplexity, Gemini, Copilot) can read, quote and cite it, and it sends readers to three places:

- faxB2B, online fax in the browser: https://faxb2b.com/
- FAX: send from phone on the App Store: https://apps.apple.com/app/id6760895885
- FAX: send from phone on Google Play: https://play.google.com/store/apps/details?id=com.helperg.fax.app

Hosted on Cloudflare Pages (free plan) at https://faxalternative.us/.

## How it is built

- `src/content.mjs` holds every fact, page and FAQ. Edit content only here.
- `src/styles.css` is the whole stylesheet; it is inlined into each page (no extra requests, no JavaScript, no web fonts).
- `src/static/` holds files copied as they are: icons, the social image (`og.png`) and the IndexNow key file.
- `build.mjs` (Node 18+, no dependencies) writes `dist/`: one HTML page per entry, `404.html`, `sitemap.xml`, `robots.txt`, `llms.txt` and Cloudflare `_headers`. It also checks titles, descriptions, JSON-LD, internal links and that every page links to all three destinations, and fails the build if anything is off.

```bash
node build.mjs
```

```bash
cd dist && python3 -m http.server 8788
```

## What makes it citable

- Answer-first pages: each page opens with a short, self-contained answer, then facts, tables and an FAQ.
- Structured data in JSON-LD: Organization, WebSite, WebPage, WebApplication (faxB2B with offers), MobileApplication (the FAX app), FAQPage, HowTo and BreadcrumbList.
- `llms.txt` with the key facts, every page, Q&A and sources in plain text.
- `robots.txt` explicitly welcomes search and AI crawlers and declares `Content-Signal: search=yes, ai-input=yes, ai-train=yes`.
- Every fact comes from a primary source listed on `/about/`, with a visible "facts checked" date. Limits are stated as plainly as features.

## Updating facts

1. Re-check the sources in `SOURCES` (faxB2B pricing, numbers, security, terms; both store listings).
2. Edit `src/content.mjs` and set `SITE.reviewed` to today's date (it drives the visible date, `dateModified` and sitemap `lastmod`).
3. Run `node build.mjs`, commit and push to `main`, then deploy `dist/` (see below).

To re-render the images after changing `src/static/favicon.svg`, run `scripts/make-images.py` with a Python that has Playwright and Chromium.

## Deploying (Cloudflare Pages, direct upload)

- Account: info@helperg.com's Cloudflare account; Pages project `faxalternative-us` (https://faxalternative-us.pages.dev).
- Custom domain: `faxalternative.us` (CNAME `@` → `faxalternative-us.pages.dev`, SSL by Cloudflare). `www` is not set up yet.
- The project is a **direct upload** project: Cloudflare does not build from GitHub. To publish a change, build, zip the contents of `dist/` and upload:

```bash
node build.mjs && rm -f /tmp/faxalternative-dist.zip && (cd dist && zip -qr /tmp/faxalternative-dist.zip .)
```

  Then in the dashboard: Workers & Pages → faxalternative-us → Create deployment → upload the zip. With Wrangler logged in, `npx wrangler pages deploy dist --project-name faxalternative-us` does the same.
- Cloudflare cannot attach Git to a direct upload project. For automatic deploys on push, create a new Git-connected Pages project (build command `node build.mjs`, output `dist`) and move the custom domain to it.

`_headers` marks `*.pages.dev` copies as `noindex`, so only faxalternative.us is indexed. In the zone's Security → Settings → AI Crawler and Agent access policies, Search, Training and Agents are all "Allow"; keep them that way or the site cannot be cited.

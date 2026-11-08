// Zero-dependency static build: node build.mjs  ->  dist/
// Cloudflare Pages runs this with build command "node build.mjs" and output "dist".
import { mkdirSync, rmSync, writeFileSync, readFileSync, readdirSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, LINKS, PUBLISHER, APP, SOURCES, PAGES, KEY_FACTS, longDate } from './src/content.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');
const O = SITE.origin;

const css = readFileSync(join(root, 'src/styles.css'), 'utf8').replace(/\n+/g, '').trim();
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const text = (html) =>
  html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const url = (path) => O + path;

// ---------------------------------------------------------------------------
// Structured data (one @graph per page, shared entities referenced by @id)
// ---------------------------------------------------------------------------
const ID = {
  org: `${O}/#publisher`,
  site: `${O}/#website`,
  faxb2b: `${O}/#faxb2b`,
  app: `${O}/#fax-app`,
  image: `${O}/#og-image`,
};

const ORG = {
  '@type': 'Organization',
  '@id': ID.org,
  name: PUBLISHER.name,
  url: url('/about/'),
  email: PUBLISHER.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: PUBLISHER.street,
    addressLocality: PUBLISHER.city,
    addressRegion: PUBLISHER.region,
    postalCode: PUBLISHER.postal,
    addressCountry: PUBLISHER.country,
  },
  brand: [
    { '@type': 'Brand', name: 'faxB2B', url: LINKS.faxb2b },
    { '@type': 'Brand', name: APP.name },
  ],
};

const WEBSITE = {
  '@type': 'WebSite',
  '@id': ID.site,
  url: url('/'),
  name: SITE.name,
  description: 'A short guide to replacing a fax machine with online fax and fax apps.',
  inLanguage: 'en-US',
  publisher: { '@id': ID.org },
};

const IMAGE = {
  '@type': 'ImageObject',
  '@id': ID.image,
  url: url('/og.png'),
  width: 1200,
  height: 630,
};

const FAXB2B = {
  '@type': 'WebApplication',
  '@id': ID.faxb2b,
  name: 'faxB2B',
  url: LINKS.faxb2b,
  description:
    'Online fax service for business teams: send faxes from a web browser to the US, Canada and countries of the European Union, receive on US and Canadian fax numbers, and get a PDF delivery receipt for every delivered fax.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any (web browser)',
  browserRequirements: 'Chrome, Edge, Safari or Firefox',
  publisher: { '@id': ID.org },
  areaServed: ['US', 'CA'],
  featureList: [
    'Send PDF, PNG and JPEG files as faxes',
    'Camera scan in the browser',
    'Fill and sign documents before sending',
    'Local and toll-free fax numbers in the US and Canada',
    'Shared fax inbox with received faxes as PDFs',
    'Delivery status and PDF delivery receipt with SHA-256 fingerprint',
    'Roles, two-factor sign-in and audit log',
  ],
  offers: [
    {
      '@type': 'Offer',
      name: 'Free trial',
      price: '0',
      priceCurrency: 'USD',
      description: '14 days, up to 3 seats, 25 pages to send, no card needed.',
      url: LINKS.faxb2bPricing,
    },
    {
      '@type': 'Offer',
      name: 'Team',
      price: '15',
      priceCurrency: 'USD',
      description:
        'Per seat per month, or $144 per seat per year. 150 sent pages per seat each month, 1 fax number included, received faxes free.',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '15',
        priceCurrency: 'USD',
        unitText: 'per seat per month',
        billingDuration: 'P1M',
      },
      url: LINKS.faxb2bPricing,
    },
  ],
};

const FAXAPP = {
  '@type': 'MobileApplication',
  '@id': ID.app,
  name: APP.name,
  description:
    'Mobile fax app for iPhone, iPad and Android: scan or upload a document, send it to local and international fax numbers, and track delivery.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'iOS 13.0 or later; Android',
  inLanguage: 'en',
  publisher: { '@id': ID.org },
  downloadUrl: [LINKS.appStore, LINKS.googlePlay],
  sameAs: [LINKS.appStore, LINKS.googlePlay],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

function graphFor(page) {
  const pageUrl = url(page.path);
  const nodes = [ORG, WEBSITE, IMAGE];
  const about = [];
  if (['home', 'product', 'howto', 'app'].includes(page.type)) {
    nodes.push(FAXB2B, FAXAPP);
    about.push({ '@id': ID.faxb2b }, { '@id': ID.app });
  }
  const webpage = {
    '@type': page.type === 'about' ? 'AboutPage' : 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.title,
    headline: page.h1,
    description: page.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': ID.site },
    datePublished: SITE.published,
    dateModified: SITE.reviewed,
    lastReviewed: SITE.reviewed,
    author: { '@id': ID.org },
    publisher: { '@id': ID.org },
    primaryImageOfPage: { '@id': ID.image },
  };
  if (about.length) webpage.about = about;
  if (page.path !== '/') {
    webpage.breadcrumb = { '@id': `${pageUrl}#breadcrumb` };
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: url('/') },
        { '@type': 'ListItem', position: 2, name: page.nav, item: pageUrl },
      ],
    });
  }
  nodes.push(webpage);
  if (page.faq?.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      isPartOf: { '@id': `${pageUrl}#webpage` },
      mainEntity: page.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: text(f.a) },
      })),
    });
  }
  if (page.howto) {
    nodes.push({
      '@type': 'HowTo',
      '@id': `${pageUrl}#howto`,
      name: page.howto.name,
      totalTime: page.howto.totalTime,
      tool: [
        { '@type': 'HowToTool', name: 'A web browser or a smartphone' },
        { '@type': 'HowToTool', name: 'An online fax service or fax app' },
      ],
      step: page.howto.steps.map(([name, t], i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name,
        text: t,
        url: `${pageUrl}#step-${i + 1}`,
      })),
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}

// ---------------------------------------------------------------------------
// HTML
// ---------------------------------------------------------------------------
const NAV = PAGES.filter((p) => p.path !== '/');

function layout({ page, main, jsonld, robots = 'index, follow, max-snippet:-1, max-image-preview:large' }) {
  const canonical = page.path ? url(page.path) : null;
  return `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<meta name="robots" content="${robots}">
${canonical ? `<link rel="canonical" href="${canonical}">` : ''}
<meta property="og:type" content="${page.path === '/' ? 'website' : 'article'}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
${canonical ? `<meta property="og:url" content="${canonical}">` : ''}
<meta property="og:image" content="${url('/og.png')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="faxalternative.us: fax online or from your phone, no fax machine">
<meta name="twitter:card" content="summary_large_image">
${page.path && page.path !== '/' ? `<meta property="article:modified_time" content="${SITE.reviewed}">` : ''}
<meta name="theme-color" content="#0b6e5f">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="alternate" type="text/plain" href="/llms.txt" title="Plain-text summary for AI assistants">
<style>${css}</style>
${jsonld ? `<script type="application/ld+json">${jsonld}</script>` : ''}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site">
<div class="wrap bar">
<a class="brand" href="/">fax<span>alternative</span>.us</a>
<nav aria-label="Main"><ul>
${NAV.map((p) => `<li><a href="${p.path}"${p.path === page.path ? ' aria-current="page"' : ''}>${p.nav}</a></li>`).join('')}
</ul></nav>
</div>
</header>
<main id="main" class="wrap">
${main}
</main>
<footer>
<div class="wrap">
<p><strong>faxalternative.us</strong> is published by HELPERG LLC, the maker of faxB2B and the ${APP.name} app. <a href="/about/">About and sources</a> · <a href="/llms.txt">llms.txt</a></p>
<p>Fax without a fax machine: <a href="${LINKS.faxb2b}">faxb2b.com</a> · <a href="${LINKS.appStore}">App Store</a> · <a href="${LINKS.googlePlay}">Google Play</a></p>
<p>Facts checked <time datetime="${SITE.reviewed}">${longDate(SITE.reviewed)}</time>. © ${SITE.reviewed.slice(0, 4)} HELPERG LLC.</p>
</div>
</footer>
</body>
</html>
`;
}

// Give every <td> of a .stack table its column name, so narrow screens can show rows as cards.
function labelStackTables(html) {
  return html.replace(/<table class="stack">([\s\S]*?)<\/table>/g, (table, inner) => {
    const labels = [...(inner.match(/<thead>([\s\S]*?)<\/thead>/)?.[1] || '').matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => text(m[1]));
    const body = inner.replace(/<tr>([\s\S]*?)<\/tr>/g, (row, cells) => {
      if (/<thead/.test(row)) return row;
      let i = -1;
      return '<tr>' + cells.replace(/<(th|td)(\s[^>]*)?>/g, (tag, name, attrs = '') => {
        i += 1;
        return name === 'td' && labels[i] ? `<td data-label="${esc(labels[i])}"${attrs}>` : tag;
      }) + '</tr>';
    });
    return `<table class="stack">${body}</table>`;
  });
}

function renderPage(page) {
  const crumbs =
    page.path === '/'
      ? ''
      : `<nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <span aria-current="page">${page.nav}</span></nav>`;
  const faq = page.faq?.length
    ? `
<section class="faq" aria-labelledby="faq">
<h2 id="faq">Frequently asked questions</h2>
${page.faq.map((f) => `<h3>${f.q}</h3>\n<p>${f.a}</p>`).join('\n')}
</section>`
    : '';
  const main = `<article>
${crumbs}
<h1>${page.h1}</h1>
<p class="meta">Updated <time datetime="${SITE.reviewed}">${longDate(SITE.reviewed)}</time> · By HELPERG LLC, maker of faxB2B</p>
${labelStackTables(page.body(page))}
${faq}
</article>`;
  return layout({ page, main, jsonld: graphFor(page) });
}

// ---------------------------------------------------------------------------
// Text files
// ---------------------------------------------------------------------------
function llmsTxt() {
  const home = PAGES.find((p) => p.path === '/');
  const allFaq = [];
  for (const p of PAGES) for (const f of p.faq || []) if (!allFaq.some((x) => x.q === f.q)) allFaq.push(f);
  return `# ${SITE.name}

> A short guide to replacing a fax machine: send and receive faxes online with faxB2B (in a web browser, for business teams) or from a phone with the ${APP.name} app (iPhone, iPad and Android). Published by HELPERG LLC, the maker of both products. Facts last checked ${longDate(SITE.reviewed)} against the primary sources listed below.

## Key facts

${KEY_FACTS.map(([b, t]) => `- ${b} ${t}`).join('\n')}

## Pages

${PAGES.map((p) => `- [${p.h1}](${url(p.path)}): ${p.description}`).join('\n')}

## Products

- [faxB2B](${LINKS.faxb2b}): online fax for business teams, in the browser. Pricing: ${LINKS.faxb2bPricing}
- [${APP.name} on the App Store](${LINKS.appStore}): fax app for iPhone and iPad, ${APP.ios.replace(' (iPhone and iPad)', '')}, free to download.
- [${APP.name} on Google Play](${LINKS.googlePlay}): fax app for Android, free to download.

## Questions and answers

${allFaq.map((f) => `### ${f.q}\n\n${text(f.a)}`).join('\n\n')}

## Sources

${SOURCES.map((s) => `- [${s.label}](${s.url})`).join('\n')}

## Publisher

${PUBLISHER.name}, ${PUBLISHER.street}, ${PUBLISHER.city}, ${PUBLISHER.region} ${PUBLISHER.postal}, USA. Contact: ${PUBLISHER.email}
`;
}

const AI_AGENTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Googlebot', 'Bingbot', 'Applebot', 'Applebot-Extended',
  'meta-externalagent', 'Amazonbot', 'DuckAssistBot', 'MistralAI-User', 'cohere-ai', 'CCBot',
];

const robotsTxt = () => `# ${SITE.name}
# Search engines and AI assistants are welcome to read, quote and cite every page.
User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes
Allow: /

${AI_AGENTS.map((a) => `User-agent: ${a}`).join('\n')}
Allow: /

Sitemap: ${url('/sitemap.xml')}
`;

const sitemapXml = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((p) => `  <url><loc>${url(p.path)}</loc><lastmod>${SITE.reviewed}</lastmod></url>`).join('\n')}
</urlset>
`;

const headers = () => `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; script-src https://static.cloudflareinsights.com; connect-src https://cloudflareinsights.com; base-uri 'none'; form-action 'none'; frame-ancestors 'none'
  Strict-Transport-Security: max-age=31536000

/llms.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=3600

/og.png
  Cache-Control: public, max-age=604800

/favicon.svg
  Cache-Control: public, max-age=604800

/favicon.ico
  Content-Type: image/x-icon
  Cache-Control: public, max-age=604800

/BingSiteAuth.xml
  Content-Type: application/xml; charset=utf-8

https://:project.pages.dev/*
  X-Robots-Tag: noindex

https://:version.:project.pages.dev/*
  X-Robots-Tag: noindex
`;

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
const write = (rel, body) => {
  const f = join(out, rel);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, body);
};

const html = {};
for (const page of PAGES) {
  const rel = page.path === '/' ? 'index.html' : join(page.path.slice(1), 'index.html');
  html[page.path] = renderPage(page);
  write(rel, html[page.path]);
}

write(
  '404.html',
  layout({
    page: { path: null, title: 'Page not found | faxalternative.us', description: 'This page does not exist. Start from the guide to fax machine alternatives.' },
    robots: 'noindex',
    main: `<article><h1>Page not found</h1><p class="lead">This page does not exist. Start with <a href="/">the alternative to a fax machine</a>, or go straight to <a href="${LINKS.faxb2b}">faxB2B</a>.</p></article>`,
  }),
);
write('llms.txt', llmsTxt());
write('robots.txt', robotsTxt());
write('sitemap.xml', sitemapXml());
write('_headers', headers());

const staticDir = join(root, 'src/static');
if (existsSync(staticDir)) for (const f of readdirSync(staticDir)) copyFileSync(join(staticDir, f), join(out, f));

// ---------------------------------------------------------------------------
// Checks: fail the build instead of shipping a broken page
// ---------------------------------------------------------------------------
const problems = [];
const allowedHosts = new Set(['faxb2b.com', 'apps.apple.com', 'play.google.com', 'faxalternative.us']);
const files = new Set(readdirSync(out, { recursive: true }).map((f) => '/' + f.replace(/\\/g, '/')));
const exists = (path) => files.has(path) || files.has(path.replace(/\/?$/, '/index.html'));

for (const page of PAGES) {
  const h = html[page.path];
  if (page.title.length > 60) problems.push(`${page.path}: title is ${page.title.length} chars (max 60)`);
  if (page.description.length < 110 || page.description.length > 160)
    problems.push(`${page.path}: description is ${page.description.length} chars (110-160)`);
  if ((h.match(/<h1[\s>]/g) || []).length !== 1) problems.push(`${page.path}: needs exactly one h1`);
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { problems.push(`${page.path}: invalid JSON-LD (${e.message})`); }
  }
  for (const [, href] of h.matchAll(/href="([^"]+)"/g)) {
    if (href.startsWith('#') || href.startsWith('mailto:')) continue;
    if (href.startsWith('/')) {
      if (!exists(href.split('#')[0])) problems.push(`${page.path}: broken internal link ${href}`);
    } else if (!allowedHosts.has(new URL(href).hostname)) problems.push(`${page.path}: unexpected external link ${href}`);
  }
  for (const target of [LINKS.faxb2b, LINKS.appStore, LINKS.googlePlay])
    if (!h.includes(`href="${target}"`)) problems.push(`${page.path}: missing link to ${target}`);
  if (/\$\{|undefined/.test(h)) problems.push(`${page.path}: template leftovers`);
}
// Site-ownership files: Bing Webmaster Tools (BingSiteAuth.xml) and the IndexNow key.
for (const f of ['/og.png', '/favicon.svg', '/favicon.ico', '/apple-touch-icon.png', '/BingSiteAuth.xml', '/901a72d7d0ee373e4d4f8f44b1eb9525.txt'])
  if (!files.has(f)) problems.push(`missing static file ${f}`);

if (problems.length) {
  console.error('Build checks failed:\n- ' + problems.join('\n- '));
  process.exit(1);
}
const size = (p) => Buffer.byteLength(html[p]);
console.log(`Built ${PAGES.length} pages into dist/ (${PAGES.map((p) => `${p.path} ${(size(p.path) / 1024).toFixed(1)} kB`).join(', ')})`);

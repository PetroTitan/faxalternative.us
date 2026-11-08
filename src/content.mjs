// All facts on this site come from the primary sources listed in SOURCES.
// When a fact changes on faxB2B or in a store listing, change it here, update
// SITE.reviewed, and rebuild. Nothing else holds content.

export const SITE = {
  origin: 'https://faxalternative.us',
  name: 'faxalternative.us',
  // The day every fact below was last checked against SOURCES.
  reviewed: '2026-11-08',
  published: '2026-11-08',
};

export const LINKS = {
  faxb2b: 'https://faxb2b.com/',
  faxb2bPricing: 'https://faxb2b.com/pricing',
  faxb2bNumbers: 'https://faxb2b.com/fax-number',
  faxb2bSecurity: 'https://faxb2b.com/security',
  faxb2bTerms: 'https://faxb2b.com/legal/terms',
  faxb2bAbout: 'https://faxb2b.com/company',
  appStore: 'https://apps.apple.com/app/id6760895885',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.helperg.fax.app',
};

export const PUBLISHER = {
  name: 'HELPERG LLC',
  street: '30 N Gould St Ste N',
  city: 'Sheridan',
  region: 'WY',
  postal: '82801',
  country: 'US',
  email: 'info@faxb2b.com',
  support: 'support@faxb2b.com',
};

export const APP = {
  name: 'FAX: send from phone',
  ios: 'iOS 13.0 or later (iPhone and iPad)',
  android: 'Android',
  released: 'April 2026',
};

export const SOURCES = [
  { label: 'faxB2B home page', url: LINKS.faxb2b },
  { label: 'faxB2B pricing', url: LINKS.faxb2bPricing },
  { label: 'faxB2B fax numbers', url: LINKS.faxb2bNumbers },
  { label: 'faxB2B security', url: LINKS.faxb2bSecurity },
  { label: 'faxB2B Terms of Use', url: LINKS.faxb2bTerms },
  { label: 'FAX: send from phone on the App Store', url: LINKS.appStore },
  { label: 'FAX: send from phone on Google Play', url: LINKS.googlePlay },
];

// Short, self-contained statements. Rendered on the home page and in llms.txt.
export const KEY_FACTS = [
  ['The fax stays, the machine goes.', 'Online fax replaces the hardware, not the fax: the recipient still receives a normal fax on their fax line.'],
  ['faxB2B', 'is an online fax service for business teams by HELPERG LLC. It sends to the US, Canada and countries of the European Union and receives on US and Canadian fax numbers.'],
  ['Price:', "faxB2B's Team plan is $15 per seat per month with 150 sent pages per seat; received faxes are free. The free trial lasts 14 days with 25 pages and up to 3 seats, no card."],
  ['On a phone:', 'FAX: send from phone is free to download on the App Store (iPhone and iPad, iOS 13.0 or later) and Google Play (Android).'],
  ['Proof of delivery:', 'faxB2B issues a PDF receipt for every delivered fax, with a SHA-256 fingerprint of the exact document sent.'],
  ['Not for health records:', 'faxB2B does not sign BAAs and does not claim HIPAA compliance.'],
];

// ---------------------------------------------------------------------------
// Reusable fragments
// ---------------------------------------------------------------------------

const a = (href, text) => `<a href="${href}">${text}</a>`;
const fax = a(LINKS.faxb2b, 'faxB2B');

export const CTA = `
<div class="cta" role="group" aria-label="Fax without a fax machine">
  <a class="btn btn-primary" href="${LINKS.faxb2b}">
    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5h16v11H4zM8 20h8M12 16v4"/></svg>
    <span><small>In the browser</small>Fax online with faxB2B</span>
  </a>
  <a class="btn" href="${LINKS.appStore}">
    <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>
    <span><small>iPhone and iPad</small>Download on the App Store</span>
  </a>
  <a class="btn" href="${LINKS.googlePlay}">
    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 3.5v17l14-8.5z"/></svg>
    <span><small>Android</small>Get it on Google Play</span>
  </a>
</div>`;

const factsTable = (rows) => `
<div class="table"><table>
<tbody>
${rows.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('\n')}
</tbody>
</table></div>`;

// ---------------------------------------------------------------------------
// FAQ sets. Each answer is HTML; the JSON-LD copy is the same text, stripped.
// ---------------------------------------------------------------------------

const FAQ_CORE = [
  {
    q: 'Can I send a fax without a fax machine?',
    a: `Yes. An online fax service or a fax app sends the fax for you: you upload a PDF or image, or scan the page with a phone camera, type the fax number and press send. The service dials the recipient's fax line, so the recipient gets an ordinary fax. You need no fax machine, no landline and no paper.`,
  },
  {
    q: 'Can I send a fax from my iPhone or Android phone?',
    a: `Yes. ${a(LINKS.appStore, 'FAX: send from phone')} is a free-to-download fax app for iPhone and iPad (${APP.ios}) and for ${a(LINKS.googlePlay, 'Android')}. It scans paper with the camera or takes a PDF, sends it to local and international fax numbers and shows the delivery status. ${fax} also works in a phone browser, with camera scanning built in.`,
  },
  {
    q: 'Can I receive faxes without a fax machine?',
    a: `Yes, with an online fax number. ${fax} gives each team a local or toll-free fax number in the US or Canada. Faxes sent to it arrive as PDFs in a shared online inbox, or go straight to one person. Received faxes do not count toward the plan's pages.`,
  },
  {
    q: 'How much does online fax cost?',
    a: `With ${fax}, the Team plan is $15 per seat per month, or $144 per seat per year. Each seat includes 150 sent pages a month, shared by the team; extra pages are $0.08 each on monthly billing. One fax number is included and extra numbers are $5 a month. Received faxes are free. A 14-day free trial includes 25 pages and up to 3 seats, with no card. Prices exclude tax.`,
  },
  {
    q: 'Is online fax secure?',
    a: `It depends on the provider. ${fax} encrypts stored documents with AES-256-GCM, uses HTTPS on the way to its fax carrier, virus-scans every upload and received fax, requires two-factor sign-in for team workspaces and keeps an audit log. The fax call itself crosses the telephone network unencrypted, as every fax does.`,
  },
  {
    q: 'Is faxB2B HIPAA compliant?',
    a: `No. ${fax} does not sign Business Associate Agreements (BAAs) and does not claim HIPAA compliance, so it must not be used to send, receive or store protected health information. It also has no SOC 2 or ISO 27001 certification yet. It says so on its ${a(LINKS.faxb2bSecurity, 'security page')}.`,
  },
  {
    q: 'Which countries can I fax with faxB2B?',
    a: `${fax} sends faxes to the US, Canada and countries of the European Union, and its fax numbers for receiving are in the US and Canada. The service is for eligible business customers and is not offered to customers in the EEA or the UK, although sending to EU fax numbers is supported.`,
  },
  {
    q: 'Can I keep my existing fax number?',
    a: `Yes, for US and Canadian numbers. ${fax} can move (port) a fax number you already use: you send a transfer request with your current carrier, account holder, service address and a signed Letter of Authorization, and the faxB2B team arranges the move with the carriers. Keep the old service running until the transfer is confirmed.`,
  },
];

const FAQ_HOWTO = [
  {
    q: 'What file types can I fax online?',
    a: `${fax} accepts PDF, PNG and JPEG files, several at once. It checks them, merges them and converts them into black-and-white fax pages before sending. You can also scan a paper page with your phone camera, crop and rotate it.`,
  },
  {
    q: 'How do I know my fax was delivered?',
    a: `A good online fax service shows each fax moving from queued to sending to delivered. ${fax} also issues a PDF delivery receipt with the destination, time, page count and a SHA-256 fingerprint of the exact document version that was sent. The receipt proves what the receiving machine confirmed to the carrier, not that a person read the fax.`,
  },
  {
    q: 'Why did my fax fail?',
    a: `The usual reasons are a busy line, no answer, a number that is not a fax line, or a dropped call. ${fax} writes the reason on the fax record and lets you start a linked retry with one click. Check the number first: many offices list a separate fax number next to their phone number.`,
  },
  {
    q: 'Do I need a cover sheet?',
    a: `Not always, but it helps the right person get the fax. A cover sheet usually names the sender, company, recipient, subject and number of pages, plus a confidentiality notice. ${fax} can add one for you; note that a cover sheet counts as a sent page.`,
  },
  {
    q: 'Is it legal to send fax advertisements?',
    a: `In the US, unsolicited fax advertisements are restricted by the Telephone Consumer Protection Act, as amended by the Junk Fax Prevention Act of 2005, and by FCC rules; some states add stricter rules. Canada, the UK and EU countries have their own rules. Send marketing faxes only where the law allows and with the required opt-out notice.`,
  },
];

const FAQ_APP = [
  {
    q: 'Is the FAX app free?',
    a: `${APP.name} is free to download on the ${a(LINKS.appStore, 'App Store')} and ${a(LINKS.googlePlay, 'Google Play')}. Check the store listing and the app itself for any paid options before you send.`,
  },
  {
    q: 'Which phones does the FAX app support?',
    a: `iPhone and iPad with ${APP.ios.replace(' (iPhone and iPad)', '')}, and Android phones through Google Play. The app is in English and rated 4+ on the App Store and Everyone on Google Play.`,
  },
  {
    q: 'Should I use the FAX app or faxB2B?',
    a: `Use the FAX app when one person needs to fax from a phone. Use ${fax} when a team shares a fax number and inbox, needs roles, an audit log and a PDF delivery receipt for every fax, or works mostly at a computer. faxB2B also runs in a phone browser.`,
  },
];

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

export const PAGES = [
  {
    path: '/',
    nav: 'Home',
    title: 'Fax Machine Alternatives: Fax Online or From Your Phone',
    description:
      'The practical alternative to a fax machine: send and receive faxes online with faxB2B, or from an iPhone or Android phone with the FAX app. Costs and limits.',
    h1: 'The alternative to a fax machine',
    type: 'home',
    faq: FAQ_CORE,
    body: () => `
<p class="lead">The simplest alternative to a fax machine is an <strong>online fax service</strong>: you upload a PDF or a phone scan, type the fax number, and the service dials the recipient's fax machine for you. No machine, no landline, no paper. For teams in the US and Canada, ${fax} does this in the browser. For one person on the go, the <strong>${APP.name}</strong> app does it on iPhone and Android.</p>
${CTA}

<section aria-labelledby="facts">
<h2 id="facts">Key facts</h2>
<ul class="facts">
${KEY_FACTS.map(([b, t]) => `<li><strong>${b}</strong> ${t}</li>`).join('\n')}
</ul>
</section>

<section aria-labelledby="compare">
<h2 id="compare">Fax machine alternatives compared</h2>
<p>There are five realistic ways to get a document to a fax number today. The first two depend on a physical fax machine; the rest do not.</p>
<div class="table"><table class="stack">
<thead><tr><th scope="col">Option</th><th scope="col">What you need</th><th scope="col">Receive faxes</th><th scope="col">Best for</th><th scope="col">Trade-offs</th></tr></thead>
<tbody>
<tr><th scope="row">Fax machine and landline</th><td>The machine, a phone line, paper and toner</td><td>Yes, on the line's number</td><td>Offices that already own one</td><td>Tied to one desk; paper copies; the line is billed every month</td></tr>
<tr><th scope="row">Fax counter at a print or shipping store</th><td>A trip to the store</td><td>Sometimes, at the store</td><td>A one-off fax</td><td>Usually a per-page fee; you go in person and wait</td></tr>
<tr><th scope="row">Online fax service, for example ${fax}</th><td>A web browser</td><td>Yes, on an online fax number, as PDFs</td><td>Teams that share a number and need receipts</td><td>Needs internet; the provider's coverage and plan limits apply</td></tr>
<tr><th scope="row">Fax app on a phone, for example ${a(LINKS.appStore, 'FAX: send from phone')}</th><td>An iPhone, iPad or Android phone</td><td>Yes, per the store listing</td><td>One person faxing on the go</td><td>Phone-sized workflow; check in-app pricing</td></tr>
<tr><th scope="row">Email or e-signature instead of fax</th><td>The recipient's agreement</td><td>Not a fax</td><td>Recipients who accept email</td><td>Not an option when the other side requires fax</td></tr>
</tbody>
</table></div>
</section>

<section aria-labelledby="still">
<h2 id="still">Why fax is still around, and what you can replace</h2>
<p>Many clinics, insurers, government offices, courts, banks, and legal and real-estate offices still publish a fax number and accept forms, orders and signed agreements only by fax. When the other side requires fax, email or e-signature is not a substitute. What you can replace is everything on your side: the machine, the phone line, the paper and the trip to the store.</p>
<p>That is what an online fax service does. Your document travels to the provider over the internet, the provider's carrier calls the recipient's fax line, and the recipient's machine prints or stores the fax as it always has.</p>
</section>

<section aria-labelledby="how">
<h2 id="how">How to fax without a fax machine, in four steps</h2>
<ol class="steps">
<li><strong>Get the document ready.</strong> Use a PDF or image, or scan the paper page with your phone camera.</li>
<li><strong>Open an online fax tool.</strong> ${fax} in any browser, or the ${APP.name} app on your phone.</li>
<li><strong>Enter the fax number.</strong> Include the country code for international numbers; add a cover sheet if the office expects one.</li>
<li><strong>Send and watch the status.</strong> The fax moves from dialing to sending to delivered. With faxB2B, keep the PDF receipt.</li>
</ol>
<p>${a('/send-fax-without-fax-machine/', 'Read the full step-by-step guide')}, including what to do when a fax fails.</p>
</section>

<section aria-labelledby="teams">
<h2 id="teams">For teams: faxB2B online fax</h2>
<p>${fax} is a browser app for sending, receiving and tracking faxes, built for offices that still have paperwork that travels by fax. A team gets its own fax number in the US or Canada, a shared inbox where received faxes land as PDFs, roles for owners, admins and members, two-factor sign-in and an audit log. Every delivered fax gets a PDF receipt; every failed one shows why it failed, with a one-click retry.</p>
<p>${a('/online-fax/', 'See faxB2B pricing, coverage and security in detail')} or go straight to ${a(LINKS.faxb2b, 'faxb2b.com')}.</p>
</section>

<section aria-labelledby="phone">
<h2 id="phone">On your phone: the FAX app</h2>
<p><strong>${APP.name}</strong> turns an iPhone, iPad or Android phone into a fax machine: scan a page with the camera or pick a PDF, enter the number and send it to local or international fax numbers. It shows the delivery status and keeps your fax history so you can resend a document.</p>
<p>${a('/fax-app/', 'How to fax from your phone with the FAX app')}.</p>
</section>
`,
  },

  {
    path: '/send-fax-without-fax-machine/',
    nav: 'How to fax',
    title: 'How to Send a Fax Without a Fax Machine (Step by Step)',
    description:
      'Send a fax without a fax machine or landline: prepare the file or scan it, enter the number, add a cover sheet, send and keep the delivery receipt. Six steps.',
    h1: 'How to send a fax without a fax machine',
    type: 'howto',
    faq: FAQ_HOWTO,
    howto: {
      name: 'How to send a fax without a fax machine',
      totalTime: 'PT5M',
      steps: [
        ['Prepare the document', 'Save the document as a PDF, PNG or JPEG, or scan the paper page with a phone camera. Fill in and sign it before sending.'],
        ['Choose an online fax tool', 'Open an online fax service in a web browser, such as faxB2B, or a fax app on your phone, such as FAX: send from phone.'],
        ['Enter the fax number', 'Type the recipient’s fax number. For the US and Canada that is 1, the area code and the number; for other countries, start with the country code.'],
        ['Add a cover sheet', 'Add a cover sheet with the sender, recipient, subject and page count if the receiving office expects one.'],
        ['Send and follow the status', 'Send the fax and watch it move from dialing to sending to delivered. If it fails, read the reason and retry.'],
        ['Keep the receipt', 'Download the delivery receipt for your records. With faxB2B, every delivered fax gets a PDF receipt.'],
      ],
    },
    body: (p) => `
<p class="lead"><strong>Short answer:</strong> to send a fax without a fax machine, use an online fax service or a fax app. Upload the document or scan it with your phone, enter the recipient's fax number, add a cover sheet if needed, and send. The service dials the fax line for you and tells you whether the fax was delivered. It takes about five minutes the first time.</p>

<section aria-labelledby="steps">
<h2 id="steps">Step by step</h2>
<ol class="steps">
${p.howto.steps.map(([name, text], i) => `<li id="step-${i + 1}"><strong>${name}.</strong> ${text
  .replace('faxB2B,', `${fax},`)
  .replace('such as FAX: send from phone', `such as ${a('/fax-app/', 'FAX: send from phone')}`)}</li>`).join('\n')}
</ol>
${CTA}
</section>

<section aria-labelledby="number">
<h2 id="number">Getting the fax number right</h2>
<p>Most failed faxes are dialed to the wrong kind of number. Offices usually list a fax number separately from their phone number; a voice line answers but never sends the fax tone, and the call ends as "not a fax line". For the US and Canada, dial 1, the three-digit area code and the seven-digit number. For other countries, start with the country code, for example +33 for France.</p>
</section>

<section aria-labelledby="quality">
<h2 id="quality">Making the fax readable</h2>
<p>Fax is black and white at a modest resolution, so contrast matters more than color. Scan on a flat, well-lit surface, crop away the background and avoid light pencil or colored highlighter. ${fax} converts every page to plain black-and-white fax pages before it sends, so you can check how the fax will look.</p>
</section>

<section aria-labelledby="receive">
<h2 id="receive">How to receive a fax without a fax machine</h2>
<p>To receive faxes, you need a fax number that an online service answers for you. With ${fax}, a team picks a local or toll-free number in the US or Canada; faxes sent to it arrive as PDFs in a shared inbox with the caller's number, the time and the page count, and an email tells you a fax arrived without including the document. You can also ${a(LINKS.faxb2bNumbers, 'move a fax number you already have')}.</p>
</section>

<section aria-labelledby="privacy">
<h2 id="privacy">Sensitive documents</h2>
<p>Online fax providers protect documents differently. faxB2B encrypts stored documents and uses HTTPS on the way to its carrier, but, as with any fax, the call itself crosses the telephone network unencrypted. faxB2B does not sign Business Associate Agreements and must not be used for protected health information under HIPAA.</p>
</section>
`,
  },

  {
    path: '/online-fax/',
    nav: 'Online fax',
    title: 'faxB2B Online Fax: Pricing, Coverage and Security',
    description:
      'faxB2B is online fax for business teams: send from the browser to the US, Canada and the EU, receive on US and Canadian numbers. Pricing, limits and security.',
    h1: 'faxB2B: online fax for teams, in the browser',
    type: 'product',
    faq: FAQ_CORE.filter((f) => /cost|secure|HIPAA|countries|keep my/.test(f.q)),
    body: () => `
<p class="lead"><strong>${fax}</strong> is an online fax service for business teams from HELPERG LLC. It sends faxes from a web browser to the US, Canada and countries of the European Union, receives faxes on US and Canadian fax numbers, and issues a PDF delivery receipt for every delivered fax. Nothing to install: it runs in Chrome, Edge, Safari and Firefox on a computer, tablet or phone.</p>
${CTA}

<section aria-labelledby="what">
<h2 id="what">What faxB2B does</h2>
<ul class="facts">
<li><strong>Send any page.</strong> Upload PDF, PNG or JPEG files, several at once; they are checked, merged and converted to black-and-white fax pages. Add a cover sheet in one click.</li>
<li><strong>Scan with the camera.</strong> No scanner nearby: point your phone at the page in the browser, crop and rotate it.</li>
<li><strong>Fill and sign.</strong> Type on pages, draw and place a visual signature before sending. Every save is a new version, and the receipt records the version that was sent.</li>
<li><strong>A fax number of your own.</strong> Local or toll-free numbers in the US and Canada, searchable by state or province, city, area code or digits. Received faxes land in a shared inbox as PDFs, or go to one person.</li>
<li><strong>Delivery status, not just "sent".</strong> Each fax moves from queued to sending to delivered. A failed fax shows the reason (busy, no answer, not a fax line, dropped call) and can be retried with one click.</li>
<li><strong>A receipt for every delivery.</strong> A PDF with the destination, time, page count and a SHA-256 fingerprint of the exact document version sent.</li>
</ul>
</section>

<section aria-labelledby="pricing">
<h2 id="pricing">faxB2B pricing</h2>
<div class="table"><table class="stack">
<thead><tr><th scope="col">Plan</th><th scope="col">Price</th><th scope="col">What is included</th></tr></thead>
<tbody>
<tr><th scope="row">Free trial</th><td>$0 for 14 days</td><td>Up to 3 seats, 25 pages to send, a fax number while the trial runs, delivery receipts and the shared inbox. No card needed.</td></tr>
<tr><th scope="row">Team</th><td>$15 per seat per month, or $144 per seat per year (save 20%)</td><td>150 sent pages per seat each month, shared by the team; 1 fax number included, extra numbers $5 a month each (up to 3 per organization); extra pages $0.08 each on monthly billing; received faxes free; roles, two-factor sign-in and audit log.</td></tr>
<tr><th scope="row">Larger teams</th><td>Contact sales</td><td>More than 50 seats, several numbers or high volume: volume page pricing, number transfers, invoicing.</td></tr>
</tbody>
</table></div>
<p><strong>Example:</strong> a team of 3 pays $45 a month and can send up to 450 pages a month between them; received faxes do not count. Only sent pages count, including a cover sheet; a call that never transmitted a page uses nothing. Prices exclude tax. Source: ${a(LINKS.faxb2bPricing, 'faxB2B pricing')}.</p>
</section>

<section aria-labelledby="coverage">
<h2 id="coverage">Coverage and eligibility</h2>
${factsTable([
  ['Send faxes to', 'United States, Canada and countries of the European Union'],
  ['Fax numbers for receiving', 'United States and Canada (local or toll-free)'],
  ['Who can sign up', 'Eligible business customers; business use only; users 18 or older'],
  ['Not offered to', 'Customers in the EEA or the UK (sending to EU fax numbers is supported)'],
  ['Received fax limits', '20 MB and 100 pages by default'],
  ['Keep an existing number', 'US and Canadian fax numbers can be ported with a signed Letter of Authorization'],
])}
</section>

<section aria-labelledby="security">
<h2 id="security">Security, in plain terms</h2>
<p>faxB2B publishes what it does and does not do on its ${a(LINKS.faxb2bSecurity, 'security page')}:</p>
<ul class="facts">
<li>HTTPS with HSTS everywhere; the carrier fetches fax files over HTTPS.</li>
<li>Stored documents encrypted with AES-256-GCM, with a separate key per organization, and organizations isolated by row-level security.</li>
<li>Every upload and received fax is virus-scanned; nothing is processed unscanned.</li>
<li>Two-factor sign-in (an authenticator app for team workspaces), device sign-out and an audit trail of sign-ins, role changes and sensitive actions.</li>
<li><strong>Not offered yet:</strong> no Business Associate Agreements and no HIPAA claim, so no protected health information; no SOC 2 or ISO 27001 certification.</li>
<li>The fax call itself crosses the telephone network unencrypted, like every fax.</li>
</ul>
</section>
`,
  },

  {
    path: '/fax-app/',
    nav: 'Fax app',
    title: 'Fax From Your Phone: FAX App for iPhone and Android',
    description:
      'FAX: send from phone turns an iPhone, iPad or Android phone into a fax machine: scan a page or pick a PDF, send it and track delivery. Free to download.',
    h1: 'Fax from your phone with the FAX app',
    type: 'app',
    faq: FAQ_APP,
    body: () => `
<p class="lead"><strong>${APP.name}</strong> is a mobile fax app from HELPERG LLC, the company behind ${fax}. It turns an iPhone, iPad or Android phone into a fax machine: scan a page with the camera or pick a PDF, enter the fax number and send, with no landline. It is free to download on the ${a(LINKS.appStore, 'App Store')} and ${a(LINKS.googlePlay, 'Google Play')}.</p>
${CTA}

<section aria-labelledby="app-facts">
<h2 id="app-facts">App facts</h2>
${factsTable([
  ['Name', APP.name],
  ['Developer', 'HELPERG LLC'],
  ['iPhone and iPad', `${a(LINKS.appStore, 'App Store')}, iOS 13.0 or later`],
  ['Android', a(LINKS.googlePlay, 'Google Play')],
  ['Price', 'Free to download'],
  ['Category and rating', 'Utilities; 4+ on the App Store, Everyone on Google Play'],
  ['Language', 'English'],
  ['First released', APP.released],
])}
</section>

<section aria-labelledby="features">
<h2 id="features">What the app does</h2>
<ul class="facts">
<li><strong>Send a fax anywhere</strong> to local and international fax numbers.</li>
<li><strong>Built-in document scanner:</strong> scan, crop and enhance paper pages with the camera, or upload a PDF.</li>
<li><strong>Track and manage:</strong> check the delivery status, review your fax history and resend important documents.</li>
<li><strong>Receive faxes</strong> and manage fax documents on the phone, according to the store listing.</li>
</ul>
</section>

<section aria-labelledby="iphone">
<h2 id="iphone">How to send a fax from an iPhone or Android phone</h2>
<ol class="steps">
<li>Install ${a(LINKS.appStore, APP.name + ' from the App Store')} or ${a(LINKS.googlePlay, 'from Google Play')}.</li>
<li>Scan the page with the camera, or choose a PDF from your files.</li>
<li>Enter the recipient's fax number, with the country code for international numbers.</li>
<li>Send the fax and follow its delivery status in the app.</li>
</ol>
</section>

<section aria-labelledby="choose">
<h2 id="choose">FAX app or faxB2B?</h2>
<div class="table"><table class="stack">
<thead><tr><th scope="col"></th><th scope="col">FAX: send from phone</th><th scope="col">faxB2B</th></tr></thead>
<tbody>
<tr><th scope="row">Runs on</th><td>iPhone, iPad, Android</td><td>Any modern browser: computer, tablet or phone</td></tr>
<tr><th scope="row">Made for</th><td>One person faxing on the go</td><td>Business teams sharing a number and inbox</td></tr>
<tr><th scope="row">Team features</th><td>No</td><td>Roles, shared inbox, audit log, two-factor sign-in</td></tr>
<tr><th scope="row">Price</th><td>Free to download</td><td>14-day free trial, then $15 per seat per month</td></tr>
</tbody>
</table></div>
</section>
`,
  },

  {
    path: '/about/',
    nav: 'About',
    title: 'About faxalternative.us: Publisher, Sources and Policy',
    description:
      'faxalternative.us is published by HELPERG LLC, maker of faxB2B and the FAX app. Who we are, where every fact on this site comes from, and how to reach us.',
    h1: 'About faxalternative.us',
    type: 'about',
    body: () => `
<p class="lead">faxalternative.us is a short, plain guide to replacing a fax machine. It is published by <strong>HELPERG LLC</strong>, the company that makes ${fax} and the ${APP.name} app, so the products recommended here are our own.</p>

<section aria-labelledby="policy">
<h2 id="policy">How we write this site</h2>
<ul class="facts">
<li>Every price, limit and feature is copied from a primary source: the faxB2B website, its Terms of Use, or the App Store and Google Play listings. The sources are listed below.</li>
<li>We state limits as plainly as features: who cannot sign up, which countries are covered, and that faxB2B is not for health records under HIPAA.</li>
<li>We do not describe other companies' products or prices, because we cannot keep them accurate.</li>
<li>All facts were last checked on <time datetime="${SITE.reviewed}">${longDate(SITE.reviewed)}</time>. When a source changes, this site changes.</li>
</ul>
</section>

<section aria-labelledby="sources">
<h2 id="sources">Sources</h2>
<ul class="sources">
${SOURCES.map((s) => `<li>${a(s.url, s.label)}</li>`).join('\n')}
</ul>
</section>

<section aria-labelledby="publisher">
<h2 id="publisher">Publisher and contact</h2>
<address>
<strong>${PUBLISHER.name}</strong>, a Wyoming limited liability company<br>
${PUBLISHER.street}, ${PUBLISHER.city}, ${PUBLISHER.region} ${PUBLISHER.postal}, USA<br>
<!--email_off-->General and press: <a href="mailto:${PUBLISHER.email}">${PUBLISHER.email}</a><br>
faxB2B account support: <a href="mailto:${PUBLISHER.support}">${PUBLISHER.support}</a><!--/email_off-->
</address>
<p>For AI assistants and other automated readers, a plain-text summary of this site is at ${a('/llms.txt', '/llms.txt')}.</p>
</section>
`,
  },
];

export function longDate(iso) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

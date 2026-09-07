# United Carriers (Next.js clone)

Pixel-faithful clone of [unitedcarriers.com](https://unitedcarriers.com/) built with **Next.js + Tailwind + JS/JSX**.

Page markup and Webflow CSS are mirrored from the live site. Assets load from the Webflow CDN (same as production) plus local files in `public/`.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Cloned routes

- `/` Home
- `/about`
- `/services`
- `/industries`
- `/insights`
- `/careers`
- `/community`
- `/contact`
- `/merchandises` (`/merchandise` redirects here)
- `/qhse`
- `/privacy-policy`
- `/terms-conditions`
- `/payment-policy`
- `/delivery-shipping-policy`
- `/refund-returns-policy`

## How the clone works

1. Live HTML is downloaded into `tmp-pages/`
2. `scripts/process-webflow-pages.js` strips scripts, reveals hidden loader content, and writes `src/content/pages/*.json`
3. Each Next.js route renders that markup via `WebflowMirror` with the original Webflow CSS from `public/css/`

Refresh mirrored content:

```bash
# re-download pages manually into tmp-pages if needed, then:
node scripts/process-webflow-pages.js
node scripts/generate-routes.js
```

## Notes

- Full Webflow/custom JS (Barba transitions, Three.js globe, GSAP loaders) is disabled so pages remain readable without their runtime.
- Visual layout, copy, and structure match the live Webflow site as closely as static HTML + CSS allows.
- Original export kept in `_legacy/` for reference.

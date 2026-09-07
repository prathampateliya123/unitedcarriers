const https = require("https");
const fs = require("fs");
const path = require("path");

const slugs = [
  "uc-courtside-is-here",
  "united-carriers-achieves-australian-trusted-trader-accreditation",
  "uc-market-update-china---september",
  "bmsb-season-2026-2027",
  "typhoon-saudel-ongoing-port-congestion",
  "phoenix-and-united-carriers-continue-partnership-into-nbl27",
  "typhoon-signal-unlikely-in-hong-kong-this-weekend-as-flights-to-japan-cancelled",
  "major-fleet-wide-fuel-efficiency-agreement-signals-ongoing-focus-on-shipping-performance-and-decarbonisation",
  "reduced-import-delays-storage-costs-across-700-containers",
];

const outDir = "tmp-pages/insights";
fs.mkdirSync(outDir, { recursive: true });

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchPage(res.headers.location).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error(`${url} -> ${res.statusCode}`));
          res.resume();
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

(async () => {
  for (const slug of slugs) {
    const url = `https://unitedcarriers.com/insights/${encodeURI(slug)}`;
    try {
      const html = await fetchPage(url);
      const safe = slug.replace(/[^a-z0-9-]+/gi, "-");
      fs.writeFileSync(path.join(outDir, `${safe}.html`), html);
      console.log("OK", slug, html.length);
    } catch (e) {
      console.log("FAIL", slug, e.message);
    }
  }
})();

const fs = require("fs");
const path = require("path");

const dir = "tmp-pages";
const outDir = "src/content/pages";
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.join(outDir, "insights"), { recursive: true });

const SITE_CDN = "https://cdn.prod.website-files.com/6a44eec1ed1af2c4c403df6b/";
const CDN_CSS =
  "https://cdn.prod.website-files.com/6a44eec1ed1af2c4c403df6b/css/united-carriers.webflow.shared.fc188c3b2.min.css";

function rewrite(html) {
  let h = html.split(CDN_CSS).join("/css/united-carriers.webflow.shared.fc188c3b2.min.css");

  // Prefer local images when referenced relatively as images/...
  h = h.replace(/(src|srcset)=["']images\//g, '$1="/images/');
  h = h.replace(/url\(images\//g, "url(/images/");

  // Keep CDN asset URLs intact for pixel-faithful media (matches live site).
  // Only rewrite CSS to local copy above.

  return h;
}

function extract(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : html;
  body = body.replace(/<script[\s\S]*?<\/script>/gi, "");

  // Without Webflow/custom JS, reveal content that starts hidden
  body = body.replace(/\sdata-init-hidden(="[^"]*")?/g, "");
  body = body.replace(/\sdata-init-loader(="[^"]*")?/g, "");
  body = body.replace(
    /<div class="loader"[\s\S]*?<\/div>\s*(?=<div class="trans"|<div class="body-inner"|<div data-barba)/i,
    ""
  );
  // Fallback: hide any remaining loader
  body = body.replace(
    /class="loader"/g,
    'class="loader" style="display:none!important;pointer-events:none!important;opacity:0!important"'
  );
  body = body.replace(
    /class="trans"/g,
    'class="trans" style="display:none!important;pointer-events:none!important"'
  );

  const styles = [];
  const styleRe = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let sm;
  while ((sm = styleRe.exec(html))) {
    let css = sm[1];
    css = css.replace(
      /\[data-init-hidden\][\s\S]*?\{[\s\S]*?\}/g,
      ""
    );
    css = css.replace(
      /\[data-init-loader\][\s\S]*?\{[\s\S]*?\}/g,
      ""
    );
    styles.push(css);
  }

  // Clone overrides appended to every page
  styles.push(`
    .loader, .trans { display: none !important; }
    [data-init-hidden], [data-init-loader] { opacity: 1 !important; visibility: visible !important; }
    .article-layout[data-init-hidden] { display: block !important; }
    html { opacity: 1 !important; }
  `);

  return {
    body: rewrite(body),
    styles: styles.map(rewrite),
  };
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
const manifest = {};

for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const titleMatch = raw.match(/<title>([^<]*)<\/title>/i);
  const descMatch = raw.match(/name="description" content="([^"]*)"/i);
  const { body, styles } = extract(raw);
  const key = file.replace(/\.html$/, "");
  const payload = {
    key,
    title: titleMatch ? titleMatch[1] : key,
    description: descMatch ? descMatch[1] : "",
    styles,
    body,
  };
  fs.writeFileSync(path.join(outDir, `${key}.json`), JSON.stringify(payload));
  manifest[key] = {
    title: payload.title,
    description: payload.description,
    bytes: Buffer.byteLength(body),
    styleBlocks: styles.length,
  };
  console.log("wrote", key, manifest[key].bytes);
}

fs.writeFileSync(
  path.join(outDir, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);
console.log("done", Object.keys(manifest).length);

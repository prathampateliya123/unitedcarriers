const fs = require("fs");
const path = require("path");

const dir = "tmp-pages";
const outDir = "src/content/pages";
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.join(outDir, "insights"), { recursive: true });

const CDN_CSS =
  "https://cdn.prod.website-files.com/6a44eec1ed1af2c4c403df6b/css/united-carriers.webflow.shared.fc188c3b2.min.css";

function rewrite(html) {
  let h = html
    .split(CDN_CSS)
    .join("/css/united-carriers.webflow.shared.fc188c3b2.min.css");

  h = h.replace(/(src|srcset)=["']images\//g, '$1="/images/');
  h = h.replace(/url\(images\//g, "url(/images/");
  return h;
}

function extract(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : html;

  // Remove original scripts — Next loads patched local animation runtime
  body = body.replace(/<script[\s\S]*?<\/script>/gi, "");

  const styles = [];
  const styleRe = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let sm;
  while ((sm = styleRe.exec(html))) {
    styles.push(sm[1]);
  }

  // Keep data-init-hidden / loader so GSAP can animate them.
  // Failsafe only: if runtime fails, unhide after 8s via CloneEnhancer.

  return {
    body: rewrite(body),
    styles: styles.map(rewrite),
  };
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
const manifest = {};

function writePage(key, raw, targetFile) {
  const titleMatch = raw.match(/<title>([^<]*)<\/title>/i);
  const descMatch = raw.match(/name="description" content="([^"]*)"/i);
  const { body, styles } = extract(raw);
  const payload = {
    key,
    title: titleMatch ? titleMatch[1] : key,
    description: descMatch ? descMatch[1] : "",
    styles,
    body,
  };
  fs.writeFileSync(targetFile, JSON.stringify(payload));
  manifest[key] = {
    title: payload.title,
    description: payload.description,
    bytes: Buffer.byteLength(body),
    styleBlocks: styles.length,
  };
  console.log("wrote", key, manifest[key].bytes);
}

for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const key = file.replace(/\.html$/, "");
  writePage(key, raw, path.join(outDir, `${key}.json`));
}

const insightsDir = path.join(dir, "insights");
if (fs.existsSync(insightsDir)) {
  const insightFiles = fs
    .readdirSync(insightsDir)
    .filter((f) => f.endsWith(".html"));
  for (const file of insightFiles) {
    const raw = fs.readFileSync(path.join(insightsDir, file), "utf8");
    const key = file.replace(/\.html$/, "");
    writePage(
      `insights/${key}`,
      raw,
      path.join(outDir, "insights", `${key}.json`)
    );
  }
}

fs.writeFileSync(
  path.join(outDir, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);
console.log("done", Object.keys(manifest).length);

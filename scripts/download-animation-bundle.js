const https = require("https");
const fs = require("fs");
const path = require("path");

const BASE = "https://united-carriers.netlify.app";
const outDir = path.join("public", "js");
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.join(outDir, "chunks"), { recursive: true });
fs.mkdirSync(path.join(outDir, "assets"), { recursive: true });

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const next = res.headers.location.startsWith("http")
            ? res.headers.location
            : new URL(res.headers.location, url).href;
          return fetchText(next).then(resolve, reject);
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

function collectImports(code) {
  const found = new Set();
  const patterns = [
    /from\s*["'](\.\/[^"']+)["']/g,
    /import\(["'](\.\/[^"']+)["']\)/g,
    /import\(["'](\.\.\/[^"']+)["']\)/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(code))) found.add(m[1]);
  }
  // Also mapDeps array strings like "./chunks/Home-xxx.js"
  const map = code.match(/\.\/chunks\/[^"']+\.js|\.\/assets\/[^"']+\.css/g);
  if (map) map.forEach((p) => found.add(p));
  return [...found];
}

(async () => {
  const mainUrl = `${BASE}/main.js`;
  let main = await fetchText(mainUrl);

  // Allow localhost / 127.0.0.1 for local Next.js clone
  main = main.replace(
    /\["united-carriers\.webflow\.io","united-carriers-bp\.webflow\.io","united-carriers\.netlify\.app","unitedcarriers\.com"\]/,
    '["united-carriers.webflow.io","united-carriers-bp.webflow.io","united-carriers.netlify.app","unitedcarriers.com","localhost","127.0.0.1"]'
  );

  fs.writeFileSync(path.join(outDir, "main.js"), main);
  console.log("saved main.js", main.length);

  const queue = collectImports(main).map((p) => p.replace(/^\.\//, ""));
  const seen = new Set(["main.js"]);

  while (queue.length) {
    const rel = queue.shift();
    if (!rel || seen.has(rel)) continue;
    seen.add(rel);

    const url = `${BASE}/${rel}`;
    const dest = path.join(outDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    try {
      const code = await fetchText(url);
      fs.writeFileSync(dest, code);
      console.log("OK", rel, code.length);
      if (rel.endsWith(".js")) {
        for (const imp of collectImports(code)) {
          // normalize relative to /js root
          let next = imp;
          if (next.startsWith("./")) {
            const baseDir = path.posix.dirname(rel);
            next = path.posix.normalize(baseDir + "/" + next.slice(2));
          } else if (next.startsWith("../")) {
            const baseDir = path.posix.dirname(rel);
            next = path.posix.normalize(baseDir + "/" + next);
          }
          if (!seen.has(next) && (next.endsWith(".js") || next.endsWith(".css"))) {
            queue.push(next.replace(/^\/+/, ""));
          }
        }
      }
    } catch (e) {
      console.log("FAIL", rel, e.message);
    }
  }

  console.log("done files", seen.size);
})();

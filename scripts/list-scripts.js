const fs = require("fs");
const h = fs.readFileSync("tmp-pages/home.html", "utf8");
const scripts = [...h.matchAll(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi)].map(
  (m) => m[1]
);
console.log(scripts.join("\n"));
console.log("---module---");
const modules = [...h.matchAll(/<script[^>]*type=["']module["'][^>]*src=["']([^"']+)["']/gi)].map(
  (m) => m[1]
);
console.log(modules.join("\n") || "none");
// Also check for inline type=module without src at end
const end = h.slice(-2500);
console.log("---tail---");
console.log(end);

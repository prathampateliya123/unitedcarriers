const fs = require("fs");
const path = require("path");

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith(".js")) out.push(p);
  }
  return out;
}

const root = path.join("public", "js");
const files = walk(root);
const missing = new Set();

for (const file of files) {
  const code = fs.readFileSync(file, "utf8");
  const relDir = path.posix.dirname(
    path.relative(root, file).split(path.sep).join("/")
  );
  const imports = [
    ...code.matchAll(/from\s*["'](\.[^"']+)["']/g),
    ...code.matchAll(/import\(["'](\.[^"']+)["']\)/g),
  ].map((m) => m[1]);

  for (const imp of imports) {
    const resolved = path.posix.normalize(
      (relDir === "." ? "" : relDir + "/") + imp.replace(/^\.\//, "")
    );
    const abs = path.join(root, resolved);
    if (!fs.existsSync(abs) && !fs.existsSync(abs + ".js")) {
      missing.add(resolved + " (from " + path.relative(root, file) + ")");
    }
  }
}

console.log([...missing].join("\n") || "no missing imports");

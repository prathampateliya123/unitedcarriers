import fs from "fs";
import path from "path";

const pagesDir = path.join(process.cwd(), "src/content/pages");

export function getPage(key) {
  const filePath = path.join(pagesDir, `${key}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function getPageKeys() {
  return fs
    .readdirSync(pagesDir)
    .filter((f) => f.endsWith(".json") && f !== "manifest.json")
    .map((f) => f.replace(/\.json$/, ""));
}

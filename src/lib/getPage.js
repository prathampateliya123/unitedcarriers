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

export function getInsightPage(slug) {
  if (!slug) return null;

  // Live URLs may include --- ; downloaded files sanitize inconsistently
  const candidates = [
    slug,
    slug.replace(/---+/g, "-"),
    slug.replace(/[^a-z0-9-]+/gi, "-"),
  ];

  for (const candidate of candidates) {
    const filePath = path.join(pagesDir, "insights", `${candidate}.json`);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  }
  return null;
}

export function getInsightSlugs() {
  const dir = path.join(pagesDir, "insights");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export function getPageKeys() {
  return fs
    .readdirSync(pagesDir)
    .filter((f) => f.endsWith(".json") && f !== "manifest.json")
    .map((f) => f.replace(/\.json$/, ""));
}

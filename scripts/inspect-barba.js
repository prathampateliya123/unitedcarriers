const fs = require("fs");
const home = JSON.parse(fs.readFileSync("src/content/pages/home.json", "utf8"));
const about = JSON.parse(fs.readFileSync("src/content/pages/about.json", "utf8"));

function find(label, body, re) {
  const m = body.match(re);
  console.log(label, m ? m[0].slice(0, 180) : "NOT FOUND");
}

find("home wrapper", home.body, /data-barba=["']wrapper["'][^>]{0,80}/);
find("home container", home.body, /data-barba=["']container["'][^>]{0,120}/);
find("home namespace", home.body, /data-barba-namespace=["'][^"']+["']/);
find("about namespace", about.body, /data-barba-namespace=["'][^"']+["']/);
find("home loader fixed?", home.body, /class=["']loader["'][^>]*/);

// Check embedded css for loader position
const css = home.styles.join("\n");
console.log("styles mention .loader", (css.match(/\.loader[\s{]/g) || []).length);

const fs = require("fs");
const path = "public/js/main.js";
let main = fs.readFileSync(path, "utf8");

const needle =
  '["united-carriers.webflow.io","united-carriers-bp.webflow.io","united-carriers.netlify.app","unitedcarriers.com","localhost","127.0.0.1"]';
const next =
  '["united-carriers.webflow.io","united-carriers-bp.webflow.io","united-carriers.netlify.app","unitedcarriers.com","localhost","127.0.0.1","[::1]"]';

if (main.includes(needle)) {
  main = main.replace(needle, next);
  fs.writeFileSync(path, main);
  console.log("patched domains with [::1]");
} else if (main.includes('"[::1]"')) {
  console.log("already patched");
} else {
  // Fallback: insert after unitedcarriers.com if only original list
  const original =
    '["united-carriers.webflow.io","united-carriers-bp.webflow.io","united-carriers.netlify.app","unitedcarriers.com"]';
  const expanded =
    '["united-carriers.webflow.io","united-carriers-bp.webflow.io","united-carriers.netlify.app","unitedcarriers.com","localhost","127.0.0.1","[::1]"]';
  if (main.includes(original)) {
    main = main.replace(original, expanded);
    fs.writeFileSync(path, main);
    console.log("patched from original domain list");
  } else {
    console.log("domain list pattern not found — check manually");
  }
}

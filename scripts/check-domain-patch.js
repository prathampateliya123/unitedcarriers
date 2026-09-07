const fs = require("fs");
const main = fs.readFileSync("public/js/main.js", "utf8");
const idx = main.indexOf("unitedcarriers.com");
console.log(main.slice(idx - 80, idx + 120));
console.log("has localhost", main.includes('"localhost"'));

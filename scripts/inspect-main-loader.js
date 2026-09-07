const fs = require("fs");
const main = fs.readFileSync("public/js/main.js", "utf8");

// Find how barba wrapper is selected
const markers = [
  "data-barba",
  "loader",
  "isLoaded",
  "Unauthorized",
  "onceSetup",
  "tlLoadMaster",
];
for (const m of markers) {
  const i = main.indexOf(m);
  console.log("\n===", m, "at", i, "===");
  if (i >= 0) console.log(main.slice(Math.max(0, i - 60), i + 180));
}

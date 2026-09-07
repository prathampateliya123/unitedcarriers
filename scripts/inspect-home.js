const j = require("../src/content/pages/home.json");
console.log("styles", j.styles.length);
console.log("has loader", j.body.includes('class="loader"'));
console.log("init-hidden", (j.body.match(/data-init-hidden/g) || []).length);
console.log("title", j.title);
console.log("body start", j.body.slice(0, 300));

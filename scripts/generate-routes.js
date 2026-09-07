const fs = require("fs");
const path = require("path");

const routes = [
  ["about", "about"],
  ["services", "services"],
  ["industries", "industries"],
  ["insights", "insights"],
  ["careers", "careers"],
  ["community", "community"],
  ["contact", "contact"],
  ["merchandises", "merchandises"],
  ["qhse", "qhse"],
  ["privacy-policy", "privacy-policy"],
  ["terms-conditions", "terms-conditions"],
  ["payment-policy", "payment-policy"],
  ["delivery-shipping-policy", "delivery-shipping-policy"],
  ["refund-returns-policy", "refund-returns-policy"],
];

const template = (key) => `import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

const page = getPage("${key}");

export const metadata = {
  title: page?.title || "${key}",
  description: page?.description || undefined,
};

export default function Page() {
  return <WebflowMirror page={page} />;
}
`;

for (const [route, key] of routes) {
  const dir = path.join("src/app", route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "page.js"), template(key));
  console.log("route", route);
}

// Redirect merchandise -> merchandises
const merchDir = path.join("src/app", "merchandise");
fs.mkdirSync(merchDir, { recursive: true });
fs.writeFileSync(
  path.join(merchDir, "page.js"),
  `import { redirect } from "next/navigation";

export default function MerchandiseRedirect() {
  redirect("/merchandises");
}
`
);

console.log("done");

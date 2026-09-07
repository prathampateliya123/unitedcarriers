import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

const page = getPage("delivery-shipping-policy");

export const metadata = {
  title: page?.title || "delivery-shipping-policy",
  description: page?.description || undefined,
};

export default function Page() {
  return <WebflowMirror page={page} />;
}

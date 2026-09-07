import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

const page = getPage("payment-policy");

export const metadata = {
  title: page?.title || "payment-policy",
  description: page?.description || undefined,
};

export default function Page() {
  return <WebflowMirror page={page} />;
}

import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

const page = getPage("refund-returns-policy");

export const metadata = {
  title: page?.title || "refund-returns-policy",
  description: page?.description || undefined,
};

export default function Page() {
  return <WebflowMirror page={page} />;
}

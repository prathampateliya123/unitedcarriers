import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

const page = getPage("privacy-policy");

export const metadata = {
  title: page?.title || "privacy-policy",
  description: page?.description || undefined,
};

export default function Page() {
  return <WebflowMirror page={page} />;
}

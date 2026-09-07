import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

const page = getPage("terms-conditions");

export const metadata = {
  title: page?.title || "terms-conditions",
  description: page?.description || undefined,
};

export default function Page() {
  return <WebflowMirror page={page} />;
}

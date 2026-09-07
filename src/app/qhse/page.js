import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

const page = getPage("qhse");

export const metadata = {
  title: page?.title || "qhse",
  description: page?.description || undefined,
};

export default function Page() {
  return <WebflowMirror page={page} />;
}

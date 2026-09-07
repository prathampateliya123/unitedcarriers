import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

const page = getPage("merchandises");

export const metadata = {
  title: page?.title || "merchandises",
  description: page?.description || undefined,
};

export default function Page() {
  return <WebflowMirror page={page} />;
}

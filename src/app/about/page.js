import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

const page = getPage("about");

export const metadata = {
  title: page?.title || "about",
  description: page?.description || undefined,
};

export default function Page() {
  return <WebflowMirror page={page} />;
}

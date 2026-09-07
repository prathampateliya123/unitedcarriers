import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

const page = getPage("insights");

export const metadata = {
  title: page?.title || "insights",
  description: page?.description || undefined,
};

export default function Page() {
  return <WebflowMirror page={page} />;
}

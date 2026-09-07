import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

const page = getPage("community");

export const metadata = {
  title: page?.title || "community",
  description: page?.description || undefined,
};

export default function Page() {
  return <WebflowMirror page={page} />;
}

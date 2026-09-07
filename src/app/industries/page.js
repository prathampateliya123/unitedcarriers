import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

const page = getPage("industries");

export const metadata = {
  title: page?.title || "industries",
  description: page?.description || undefined,
};

export default function Page() {
  return <WebflowMirror page={page} />;
}

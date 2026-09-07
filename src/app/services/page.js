import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

const page = getPage("services");

export const metadata = {
  title: page?.title || "services",
  description: page?.description || undefined,
};

export default function Page() {
  return <WebflowMirror page={page} />;
}

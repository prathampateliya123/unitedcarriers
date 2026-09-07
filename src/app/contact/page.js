import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

const page = getPage("contact");

export const metadata = {
  title: page?.title || "contact",
  description: page?.description || undefined,
};

export default function Page() {
  return <WebflowMirror page={page} />;
}

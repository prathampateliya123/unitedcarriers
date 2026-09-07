import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

export function createWebflowPage(key, fallbackTitle) {
  const page = getPage(key);

  function Page() {
    return <WebflowMirror page={page} />;
  }

  return {
    metadata: {
      title: page?.title || fallbackTitle || key,
      description: page?.description || undefined,
    },
    Page,
  };
}

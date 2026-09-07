import { notFound } from "next/navigation";
import WebflowMirror from "@/components/WebflowMirror";
import { getInsightPage, getInsightSlugs } from "@/lib/getPage";

export function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getInsightPage(slug);
  return {
    title: page?.title || slug,
    description: page?.description || undefined,
  };
}

export default async function InsightArticlePage({ params }) {
  const { slug } = await params;
  const page = getInsightPage(slug);
  if (!page) notFound();
  return <WebflowMirror page={page} />;
}

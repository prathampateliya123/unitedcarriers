import WebflowMirror from "@/components/WebflowMirror";
import { getPage } from "@/lib/getPage";

export const metadata = {
  title: "United Carriers | Global Freight Forwarding and Logistics",
  description:
    "Freight forwarding, land transport, and customs brokerage, unified across APAC under one accountable team.",
};

export default function HomePage() {
  const page = getPage("home");
  return <WebflowMirror page={page} />;
}

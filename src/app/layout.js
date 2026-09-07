import BackToTop from "@/components/BackToTop";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const metadata = {
  title: {
    default: "United Carriers | Global Freight Forwarding and Logistics",
    template: "%s | United Carriers",
  },
  description:
    "Freight forwarding, land transport, and customs brokerage, unified across APAC under one accountable team.",
  metadataBase: new URL("https://unitedcarriers.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-mod-js">
      <head>
        <link
          rel="stylesheet"
          href="/css/united-carriers.webflow.shared.fc188c3b2.min.css"
        />
        <link
          rel="icon"
          href="/images/6a631242ed3423f9f458466a_Favicon (1).png"
        />
      </head>
      <body>
        <SmoothScroll />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}

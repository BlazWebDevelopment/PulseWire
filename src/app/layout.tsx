import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "PulseWire // Breaking News, Latest Stories & In-Depth Analysis",
  description:
    "PulseWire delivers breaking news, investigative journalism, and in-depth analysis across world affairs, technology, politics, science, and more.",
  applicationName: "PulseWire",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", sizes: "any" },
    ],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "PulseWire // Breaking News, Latest Stories & In-Depth Analysis",
    description:
      "PulseWire delivers breaking news, investigative journalism, and in-depth analysis across world affairs, technology, politics, science, and more.",
    siteName: "PulseWire",
    type: "website",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "PulseWire",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "PulseWire // Breaking News, Latest Stories & In-Depth Analysis",
    description:
      "PulseWire delivers breaking news, investigative journalism, and in-depth analysis across world affairs, technology, politics, science, and more.",
    site: "@pulsewire",
    images: ["/icon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-slate-200 font-sans antialiased min-h-screen">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

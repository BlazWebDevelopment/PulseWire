import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SITE_NAME = "News NFTs";
const SITE_TAGLINE = "The On-Chain Newsroom";
const SITE_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;
const SITE_DESCRIPTION =
  "News NFTs is the on-chain newsroom — daily reporting on Bitcoin, Ethereum, DeFi, NFTs, mining, markets and crypto regulation. Built for builders, traders and collectors.";
const SITE_URL = "https://newsnfts.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "News NFTs",
    "crypto news",
    "NFT news",
    "Bitcoin news",
    "Ethereum news",
    "Solana",
    "DeFi",
    "on-chain analysis",
    "crypto markets",
    "mining",
    "regulation",
    "blockchain",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", sizes: "any" },
    ],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    url: SITE_URL,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: "@newsnfts",
    creator: "@newsnfts",
    images: ["/icon.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#03060d",
  colorScheme: "dark",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink-950 text-parchment font-sans antialiased min-h-screen">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

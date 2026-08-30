import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";
import { basePath } from "@/lib/basePath";

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const description =
  "Portfolio of Michael Zhu, an Electrical & Computer Engineering student at the University of Waterloo focused on firmware, embedded systems, and real time software.";

const deployedUrl = "https://rossmarywine.github.io/profolio-website";

export const metadata: Metadata = {
  metadataBase: new URL(deployedUrl),
  title: {
    default: `${site.name} · ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description,
  keywords: [
    "Michael Zhu",
    "Firmware Engineer",
    "Embedded Systems",
    "RTOS",
    "ARM Cortex-M4",
    "STM32",
    "University of Waterloo",
    "Electrical and Computer Engineering",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} · ${site.title}`,
    description,
    type: "website",
    url: deployedUrl,
    siteName: `${site.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.title}`,
    description,
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { siteUrl } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Omoregie Motors — Accredited Toyota Dealer in Nigeria",
    template: "%s — Omoregie Motors",
  },
  description:
    "Omoregie Motors Nigeria Limited, an accredited Toyota dealer since 1978. Brand-new Toyota vehicles, genuine spare parts, repairs and maintenance across Lagos and Abuja.",
  applicationName: "Omoregie Motors",
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "light" as const,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" id="top" className={inter.variable}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}

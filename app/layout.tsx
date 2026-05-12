import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import EmbedBridge from "@/components/EmbedBridge";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cigar City Sports — Premium Sportsbook | Bet Big. Win Fast.",
  description:
    "Cigar City Sports is the premier destination for live sports betting. Fast payouts, live odds, and 24/7 action. Join thousands of players betting live every day.",
  keywords: "sportsbook, live betting, sports wagering, online betting, Cigar City Sports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="bg-navy text-white antialiased overflow-x-hidden">
        {children}
        <EmbedBridge />
      </body>
    </html>
  );
}

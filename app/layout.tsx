import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const bodyFont = Inter({
  weight: ["400"],
  variable: "--font-bodyFont",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeetXSheet - Curated Coding Interview Sheets",
  description:
    "LeetXSheet provides curated coding interview problem sheets for top companies. Track your progress, filter by company, difficulty, and more.",
  keywords: [
    "leetcode",
    "coding interview",
    "interview sheet",
    "blind 75",
    "tcs sheet",
    "problem tracker",
    "dsa",
    "data structures",
    "algorithms",
    "practice",
    "company questions",
    "dashboard",
    "progress tracker",
  ],
  openGraph: {
    title: "LeetXSheet - Curated Coding Interview Sheets",
    description:
      "Curated coding interview problem sheets for top companies. Track your progress and ace your next interview!",
    url: "https://LeetXSheet.vercel.app/",
    siteName: "LeetXSheet",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "LeetXSheet Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeetXSheet - Curated Coding Interview Sheets",
    description:
      "Curated coding interview problem sheets for top companies. Track your progress and ace your next interview!",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.className}`}>{children}</body>
    </html>
  );
}

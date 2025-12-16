import { siteConfig } from "@/lib/site";
import { Metadata } from "next";

export const metadataKeywords = [
  "Blog",
  "Squareblog",
  "Technology",
  "Philosophy",
  "Design",
  "Structured Chaos",
  "Personal Archive",
  "Next.js Blog",
  "React Blog",
  "Web Development",
  "Tutorials",
  "MDX Blog",
  "Modern Blog Template",
];

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: metadataKeywords,
  authors: [
    {
      name: "Squareblog Team",
      url: "https://squareblog.com",
    },
  ],
  creator: "Squareblog",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@squareblog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

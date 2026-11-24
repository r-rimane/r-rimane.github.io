import type { Metadata, Viewport } from "next";
import { Host_Grotesk, Newsreader } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const hostGrotesk = Host_Grotesk({ subsets: ["latin"], variable: "--font-host" });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-newsreader",
});

const title = `${profile.name}, ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title,
  description: profile.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.description,
    images: [{ url: "/partage.png", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f7f9f8" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${hostGrotesk.variable} ${newsreader.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}

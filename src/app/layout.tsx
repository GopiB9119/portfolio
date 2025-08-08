import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import data from "@/content/site-data";
import { SITE_URL } from "@/lib/site";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${data.name} — ${data.title}`,
  description:
    "Professional portfolio showcasing projects, experience, and skills.",
  keywords: [
    data.name,
    "Portfolio",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
  ],
  openGraph: {
    title: `${data.name} — ${data.title}`,
    description:
      "Professional portfolio showcasing projects, experience, and skills.",
    url: "/",
    siteName: `${data.name} Portfolio`,
    locale: "en_US",
    type: "website",
    images: [
      { url: "/og", width: 1200, height: 630, alt: `${data.name} — ${data.title}` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${data.name} — ${data.title}`,
    description:
      "Professional portfolio showcasing projects, experience, and skills.",
    images: ["/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        {/* Cloudflare Turnstile */}
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
          />
        ) : null}
      </body>
    </html>
  );
}

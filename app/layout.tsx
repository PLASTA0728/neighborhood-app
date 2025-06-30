import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/ui/styles/globals.css";
import Head from "next/head";
import { themeInitScript } from "@/utils/themeInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | PathTogether",
    default: "PathTogether",
  },
  description:
    "One map, every destination — PathTogether lets you generate map sessions, share them with friends, and pin everyone on the map for easy meetups.",
  openGraph: {
    title: "PathTogether",
    description:
      "One map, every destination — PathTogether lets you generate map sessions, share them with friends, and pin everyone on the map for easy meetups.",
    url: "https://pathtogether.vercel.app", // <-- update to your real domain
    type: "website",
    images: [
      {
        url: "@/public/ptg_assets/logo.svg", // or full URL if hosted externally
        width: 1200,
        height: 630,
        alt: "PathTogether social preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}  
      </body>
    </html>
  );
}

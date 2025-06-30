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
  title: "PathTogether",
  description: "one map, every destination",
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

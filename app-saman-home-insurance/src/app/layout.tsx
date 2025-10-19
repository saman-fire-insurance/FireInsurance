import type { Metadata } from "next";
import "./globals.css";
import "../styles/datepicker.css";
import { Providers } from "@/components/session-provider";
import localFont from "next/font/local";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const iranSans = localFont({
  src: [
    {
      path: "../assets/font/IRANSans/fonts/woff2/IRANSansWeb(FaNum)_Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../assets/font/IRANSans/fonts/woff2/IRANSansWeb(FaNum)_Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/font/IRANSans/fonts/woff2/IRANSansWeb(FaNum)_Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/font/IRANSans/fonts/woff2/IRANSansWeb(FaNum)_Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/font/IRANSans/fonts/woff2/IRANSansWeb(FaNum)_UltraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/font/IRANSans/fonts/woff2/IRANSansWeb(FaNum).woff2",
      weight: "400",
      style: "normal",
    },
  ],
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  title: "بیمه سامان",
  description: "بیمه منازل مسکونی",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    // Handle error gracefully - possibly a logout or auth error
    console.log("Session error:", error);
    session = null;
  }
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={iranSans.className}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WixClientContextProvider } from "@/context/wixContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "7-Fashion",
  description: "A complete fashion e-commerce application with Next.js and Wix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WixClientContextProvider>
        {children}
        </WixClientContextProvider>
      </body>
    </html>
  );
}

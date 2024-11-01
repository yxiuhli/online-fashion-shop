import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WixClientContextProvider } from "@/context/wixContext";
import { LiveChatLoaderProvider } from "react-live-chat-loader";
import LiveChatProvider from "@/context/LiveChatProvider";
import Script from "next/script";

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
          {/* <LiveChatProvider> */}
          
            <Navbar />
            {children}
            <Footer />
          {/* </LiveChatProvider> */}
        </WixClientContextProvider>
      </body>
    </html>
  );
}

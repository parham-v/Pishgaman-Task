import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HotToast from "@/components/modules/HotToast/HotToast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pishgaman Asia | Test Task",
  description: "This is a test project for 'Pishgaman-Asia' Co.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        {children}
        <HotToast />
      </body>
    </html>
  );
}

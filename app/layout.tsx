import StoreProvider from "@/stores/StoreProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hogwarts Academy",
  description: "Hogwarts Academy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={lexend.className}>{children}</body>
      </html>
    </StoreProvider>
  );
}

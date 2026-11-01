import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Chat App",
  description: "Real-time chat",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-app text-fg antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
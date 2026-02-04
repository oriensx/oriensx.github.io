import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { DottedMap } from "@/components/ui/dotted-map";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fengoa's Blog",
  description: "Fengoa's Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        <AnimatedThemeToggler className="fixed top-4 right-4 z-150 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors" />
        <div className="fixed inset-0 pointer-events-none">
          {/* <DotPattern
            className={cn(
              "[mask-image:radial-gradient(60vw_60vh_at_center,white,transparent)]"
            )}
          /> */}
          <DottedMap dotRadius={0.07} />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { DottedMap } from "@/components/ui/dotted-map";
import { BorderBeam } from "@/components/ui/border-beam";

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
        {/* 导航栏 */}
        <nav className="fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <h1 className="text-lg font-semibold tracking-tight">
                Fengoa&apos;s Blog
              </h1>
              <AnimatedThemeToggler className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors" />
            </div>
          </div>
        </nav>
        <div className="fixed inset-px pointer-events-none">
          <div className="absolute left-0 right-0 top-14">
            <DottedMap dotRadius={0.06} />
          </div>
          <BorderBeam duration={8} size={100} />
        </div>
        <div className="relative z-10 pt-14">{children}</div>
      </body>
    </html>
  );
}

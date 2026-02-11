import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { BorderBeam } from "@/components/ui/border-beam";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "向东Oriens's Blog",
  description: "向东Oriens's Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 导航栏 */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-linear-to-b from-background to-transparent backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14">
                <Link
                  href="/"
                  className="hover:opacity-80 transition-opacity flex items-center gap-1.5"
                >
                  <Image
                    src="/avatar.png"
                    alt="Oriens"
                    className="rounded-full"
                    width={24}
                    height={24}
                  />
                  <span className="text-base font-medium">向东Oriens</span>
                </Link>
                <AnimatedThemeToggler />
              </div>
            </div>
          </nav>
          <div className="fixed inset-0"></div>
          <div className="fixed inset-px -top-px pointer-events-none z-50">
            <BorderBeam duration={80} size={100} />
          </div>
          <div className="relative pt-14">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

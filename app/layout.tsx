import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { BorderBeam } from "@/components/ui/border-beam";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import Image from "next/image";
import { ALargeSmall, Apple, Square } from "lucide-react";
import {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
} from "@/components/motion-primitives/dock";

const data = [
  {
    title: "博客",
    icon: (
      <ALargeSmall className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "/",
  },
  {
    title: "产品",
    icon: (
      <Apple className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "我",
    icon: (
      <Square className="h-full w-full text-neutral-600 dark:text-neutral-300" />
    ),
    href: "#",
  },
];

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
          <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="absolute inset-0 -bottom-4 backdrop-blur-md bg-linear-to-b from-background to-transparent pointer-events-none mask-[linear-gradient(black_50%,rgba(0,0,0,0.8)_70%,transparent_100%)]" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14">
                <Link href="/" className="group flex items-center gap-2">
                  <Image
                    src="/avatar.png"
                    alt="Oriens"
                    className="rounded-full opacity-80 group-hover:opacity-100 transition-all duration-300"
                    width={28}
                    height={28}
                  />
                  <span className="text-muted-foreground group-hover:text-primary font-medium transition-all duration-300">
                    向东Oriens
                  </span>
                </Link>
                <AnimatedThemeToggler />
              </div>
            </div>
          </nav>
          <div className="fixed inset-0"></div>
          <div className="fixed inset-px -top-px pointer-events-none z-50">
            <BorderBeam duration={80} size={100} />
          </div>
          <div className="fixed bottom-4 z-50 left-1/2 max-w-full -translate-x-1/2">
            <Dock className="items-end pb-3" magnification={80}>
              {data.map((item, idx) => (
                <DockItem
                  key={idx}
                  className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800"
                >
                  <DockLabel>{item.title}</DockLabel>
                  <DockIcon>{item.icon}</DockIcon>
                </DockItem>
              ))}
            </Dock>
          </div>
          <div className="relative pt-14">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { ResponsiveDottedMap } from "@/components/ui/responsive-dotted-map";
import { BorderBeam } from "@/components/ui/border-beam";
import { ThemeProvider } from "@/components/theme-provider";
import { Highlighter } from "@/components/ui/highlighter";

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
    <html lang="en" suppressHydrationWarning>
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
          <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background to-transparent backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14">
                <Highlighter action="highlight" color="var(--color-green-400)">
                  <span className="text-base font-medium">
                    Fengoa&apos; Plot
                  </span>
                </Highlighter>
                <AnimatedThemeToggler className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors" />
              </div>
            </div>
          </nav>
          <div className="fixed left-0 right-0 top-14">
            <ResponsiveDottedMap />
          </div>
          <div className="fixed inset-px pointer-events-none z-50">
            <BorderBeam duration={8} size={100} />
          </div>
          <div className="relative pt-14">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

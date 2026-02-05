import React from "react";
import Link from "next/link";
import { Pyramid } from "lucide-react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent relative">
      {/* 左侧导航栏 - 对标 abc 项目样式 */}
      <nav className="fixed hidden lg:flex flex-col justify-end top-24 bottom-24 left-[max(2rem,calc(50%-45rem))] w-32 z-50">
        {/* 底部保留位置，可用于后续扩展目录 */}
        <div className="flex flex-col gap-4 text-[10px] font-bold text-neutral-400">
          <div className="h-px w-8 bg-neutral-200 dark:bg-neutral-800" />
          <p className="vertical-text tracking-[0.3em] uppercase opacity-80">
            Fengoa&apos; Plot
          </p>
        </div>
      </nav>

      {/* 主阅读区域 */}
      <main className="max-w-2xl mx-auto py-16 px-6 md:px-8 lg:py-24">
        {children}
      </main>
    </div>
  );
}


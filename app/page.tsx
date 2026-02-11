"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";

const posts = [
  {
    slug: "hello-world",
    title: "Hello World: 我的第一篇数字花园日志",
    date: "2026-02-05",
    summary:
      "探索 UX Engineer 的像素与代码之路，记录在用户体验、视觉设计与前端工程化之间的探索。",
  },
  {
    slug: "magic-ui-animation",
    title: "Magic UI 动画的丝滑之道",
    date: "2026-02-08",
    summary:
      "深入剖析 Framer Motion 与 CSS 动画在组件库中的最佳实践，让每一帧都恰到好处。",
  },
  {
    slug: "bento-grid-layout",
    title: "Bento Grid：从布局到叙事",
    date: "2026-02-10",
    summary:
      "好的布局不只是排列，而是讲故事。聊聊 Bento Grid 背后的设计哲学与响应式实现。",
  },
  {
    slug: "dark-mode-engineering",
    title: "暗黑模式的工程美学",
    date: "2026-02-11",
    summary:
      "不只是黑白反转。从色彩系统、对比度到 View Transition，构建真正优雅的暗黑体验。",
  },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <AnimatedBackground
        className="rounded-lg bg-muted/50 dark:bg-muted/30"
        transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
        enableHover
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            data-id={post.slug}
            className="block -mx-3 px-3 py-5 group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-medium text-foreground group-hover:text-foreground/90 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-2 pt-0.5">
                <time className="text-xs font-mono text-muted-foreground/70 tabular-nums">
                  {formatDate(post.date)}
                </time>
                <ArrowUpRight className="size-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-all duration-200 -translate-x-1 group-hover:translate-x-0" />
              </div>
            </div>
          </Link>
        ))}
      </AnimatedBackground>
    </main>
  );
}

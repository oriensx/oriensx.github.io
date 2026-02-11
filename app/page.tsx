import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import AnimatedBeamMultipleOutputDemo from "@/components/demo/animated-beam-demo";
import AnimatedListDemo from "@/components/demo/animated-list-demo";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";

const projects = [
  {
    name: "Magic UI",
    body: "一个基于 React + Tailwind CSS 的现代 UI 组件库，专注于动画和交互体验。",
  },
  {
    name: "向东Oriens",
    body: "我的个人数字花园，分享技术心得、生活思考和有趣的项目实验。",
  },
  {
    name: "VOC 分析看板",
    body: "利用 AI 技术对用户反馈进行情感分析和关键词提取的智能化看板系统。",
  },
  {
    name: "Dotted Map JS",
    body: "一个轻量级的 JavaScript 库，用于在网页上生成美观的点阵地图布局。",
  },
  {
    name: "Node.js 后端脚手架",
    body: "集成了常用中间件和标准工程化配置的 Node.js 项目启动模板。",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "实验室 & 玩具",
    description:
      "在这个数字地块里，存放着我对交互探索的各种实验性小工具与 UI 构思。",
    href: "#",
    cta: "推开门看看",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
      >
        {projects.map((p, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-48 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/10 bg-gray-950/1 hover:bg-gray-950/5",
              "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">
                  {p.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs leading-relaxed">
              {p.body}
            </blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "动态日志",
    description:
      "保持好奇，保持产出。这里记录了我作为 UX Engineer 的成长轨迹与思考碎片。",
    href: "/blog/hello-world",
    cta: "浏览日志",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute top-4 right-2 h-[300px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "核心天职",
    description:
      "用户体验工程师。对视觉高度敏感，精通 React/Next.js/Vue3 及 Figma。致力于在像素与代码间寻找平衡。",
    href: "#",
    cta: "查看能力清单",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute top-4 right-2 h-[300px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "时间坐标",
    description:
      "数字花园的索引。回溯那些关于代码、设计与生活的每一个关键时刻。",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "回溯时光",
    background: (
      <Calendar
        mode="single"
        selected={new Date()}
        className="absolute top-10 right-0 origin-top scale-75 rounded-md border [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
      />
    ),
  },
];

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="flex flex-col items-center mb-12 text-center">
        <p className="text-xl text-muted-foreground hover:text-secondary-foreground transition-colors max-w-2xl">
          让<span className="font-medium mx-1">优雅的视觉</span>与
          <span className="font-medium mx-1">极致的交互</span>
          触手可及。
        </p>
      </div>

      <div className="flex justify-center">
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </main>
  );
}

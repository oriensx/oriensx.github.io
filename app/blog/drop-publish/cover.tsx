import { cn } from "@/lib/utils";

/**
 * Drop 式发布封面：把发布链路的几段职责排在深色卡片上。
 */
export function DropCover({ className }: { className?: string }) {
  const modules = [
    { name: "inspect", desc: "解析上传物，识别框架与入口" },
    { name: "check", desc: "校验路径规范、占用与归属" },
    { name: "deploy", desc: "产物立即就绪；源码异步构建" },
    { name: "fallback", desc: "静态未命中再交给发布服务" },
    { name: "route", desc: "最长前缀匹配文件或进程" },
    { name: "cli", desc: "同一组接口的命令行封装" },
  ];

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-2xl",
        "bg-[#0a0e1a]",
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <defs>
          <linearGradient id="td-card" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#10141c" />
            <stop offset="100%" stopColor="#1a2230" />
          </linearGradient>
        </defs>

        <rect width="100" height="100" fill="url(#td-card)" />

        <text
          x="8"
          y="13"
          className="font-mono text-[3.6px] font-bold"
          fill="#86efac"
          letterSpacing="0.3"
        >
          DROP · /{"{owner}"}/{"{project}"}
        </text>
        <line x1="8" y1="17" x2="92" y2="17" stroke="#2d3a4a" strokeWidth="0.4" />

        {modules.map((m, i) => {
          const y = 28 + i * 10.4;
          return (
            <g key={m.name}>
              <rect x="8" y={y - 2.4} width="1.8" height="1.8" rx="0.4" fill="#86efac" />
              <text
                x="12.5"
                y={y - 0.4}
                className="font-mono text-[3.6px] font-semibold"
                fill="#e6eefc"
              >
                {m.name}
              </text>
              <text
                x="12.5"
                y={y + 3.4}
                className="font-mono text-[3px]"
                fill="#9fb4d8"
              >
                {m.desc}
              </text>
            </g>
          );
        })}

        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="2"
          fill="none"
          stroke="#2d3a4a"
          strokeWidth="0.6"
        />
      </svg>
    </div>
  );
}

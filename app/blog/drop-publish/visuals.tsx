import { Fragment } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function Frame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-8 not-prose">
      <div
        data-no-zoom
        className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950 sm:p-5"
      >
        {children}
      </div>
      <figcaption className="mt-2 text-center font-mono text-xs text-muted-foreground">
        {title}
      </figcaption>
    </figure>
  );
}

function Box({ label, sub }: { label: string; sub: string }) {
  return (
    <div
      className={cn(
        "flex min-h-[4.5rem] w-full flex-col items-center justify-center rounded-lg border px-2 py-3 text-center sm:min-h-[5rem] sm:flex-1",
        "border-neutral-200 bg-neutral-50/80 dark:border-neutral-800 dark:bg-neutral-900/50"
      )}
    >
      <span className="text-sm font-medium leading-tight">{label}</span>
      <span className="mt-1 font-mono text-xs text-muted-foreground">{sub}</span>
    </div>
  );
}

function Flow({ steps }: { steps: { label: string; sub: string }[] }) {
  return (
    <>
      <div className="hidden sm:flex sm:items-center sm:gap-1">
        {steps.map((step, i) => (
          <Fragment key={step.label}>
            <Box {...step} />
            {i < steps.length - 1 && (
              <div className="flex shrink-0 text-muted-foreground/45" aria-hidden>
                <ChevronRight className="size-4 sm:size-5" strokeWidth={2} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className="flex flex-col sm:hidden">
        {steps.map((step, i) => (
          <Fragment key={step.label}>
            <Box {...step} />
            {i < steps.length - 1 && (
              <div className="flex justify-center py-0.5 text-muted-foreground/45" aria-hidden>
                <ChevronDown className="size-4" strokeWidth={2} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
}

export function DeployPipeline() {
  return (
    <Frame title="发布协议：解析、校验、部署，就绪或轮询">
      <Flow
        steps={[
          { label: "inspect", sub: "框架 / 入口 / 告警" },
          { label: "check", sub: "路径 × 归属" },
          { label: "deploy", sub: "200 或 202" },
          { label: "poll", sub: "building → ready" },
        ]}
      />
    </Frame>
  );
}

const RULES: {
  cond: string;
  build: string;
  out: string;
  runtime: "static" | "node";
}[] = [
  { cond: "已有 index.html", build: "无需构建", out: "直接托管", runtime: "static" },
  { cond: "next + output: 'export'", build: "npm run build", out: "out/", runtime: "static" },
  { cond: "next（未声明 export）", build: "npm run build", out: ".next/standalone", runtime: "node" },
  { cond: "vite", build: "npm run build", out: "dist/", runtime: "static" },
  { cond: "react-scripts", build: "npm run build", out: "build/", runtime: "static" },
  { cond: "仅 package.json", build: "npm run build", out: "dist/（推测）", runtime: "static" },
];

export function FrameworkDecision() {
  return (
    <Frame title="识别规则自上而下匹配，命中首条即停止">
      <div className="space-y-1.5">
        {RULES.map((r, i) => (
          <div
            key={r.cond}
            className="flex flex-col gap-1.5 rounded-lg border border-neutral-200 px-3 py-2.5 dark:border-neutral-800 sm:flex-row sm:items-center sm:gap-3"
          >
            <span className="w-5 shrink-0 font-mono text-xs text-muted-foreground/70">
              {i + 1}
            </span>
            <code className="min-w-0 flex-1 font-mono text-xs">{r.cond}</code>
            <span className="font-mono text-xs text-muted-foreground">{r.build}</span>
            <code className="font-mono text-xs text-muted-foreground">{r.out}</code>
            <span
              className={cn(
                "shrink-0 self-start rounded border px-1.5 py-0.5 font-mono text-xs sm:self-auto",
                r.runtime === "node"
                  ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400"
                  : "border-neutral-300 text-muted-foreground dark:border-neutral-700"
              )}
            >
              {r.runtime}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function DeployStateMachine() {
  return (
    <Frame title="产物在一次请求内就绪；源码进入 building，由轮询取回终态">
      <div className="space-y-3">
        <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800 sm:flex-row sm:items-center sm:gap-3">
          <span className="w-24 shrink-0 font-mono text-xs text-muted-foreground">
            构建产物
          </span>
          <code className="rounded bg-neutral-100 px-2 py-1 font-mono text-xs dark:bg-neutral-900">
            写盘
          </code>
          <ChevronRight className="hidden size-4 shrink-0 text-muted-foreground/45 sm:block" aria-hidden />
          <code className="rounded border border-emerald-300 px-2 py-1 font-mono text-xs text-emerald-700 dark:border-emerald-800 dark:text-emerald-400">
            ready · 200
          </code>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800 sm:flex-row sm:items-center sm:gap-3">
          <span className="w-24 shrink-0 font-mono text-xs text-muted-foreground">
            源码
          </span>
          <code className="rounded border border-amber-300 px-2 py-1 font-mono text-xs text-amber-700 dark:border-amber-800 dark:text-amber-400">
            building · 202
          </code>
          <ChevronRight className="hidden size-4 shrink-0 text-muted-foreground/45 sm:block" aria-hidden />
          <span className="font-mono text-xs text-muted-foreground">
            install → build → 校验产物
          </span>
          <ChevronRight className="hidden size-4 shrink-0 text-muted-foreground/45 sm:block" aria-hidden />
          <span className="flex flex-wrap items-center gap-2">
            <code className="rounded border border-emerald-300 px-2 py-1 font-mono text-xs text-emerald-700 dark:border-emerald-800 dark:text-emerald-400">
              ready
            </code>
            <code className="rounded border border-red-300 px-2 py-1 font-mono text-xs text-red-700 dark:border-red-900 dark:text-red-400">
              failed
            </code>
          </span>
        </div>

        <p className="font-mono text-xs leading-relaxed text-muted-foreground">
          building 期间访问站点返回 503；failed 保留 error_message 与日志尾部
        </p>
      </div>
    </Frame>
  );
}

export function RequestRouting() {
  return (
    <Frame title="磁盘优先，未命中才进入发布服务，最终都有兜底响应">
      <div className="space-y-2">
        <div className="rounded-lg border border-neutral-200 px-3 py-2 text-center text-sm dark:border-neutral-800">
          浏览器请求 <code className="font-mono text-xs">/alice/demo/assets/app.js</code>
        </div>

        <div className="flex justify-center text-muted-foreground/45" aria-hidden>
          <ChevronDown className="size-4" />
        </div>

        <div className="rounded-lg border border-neutral-200 px-3 py-2 text-center dark:border-neutral-800">
          <div className="text-sm">nginx</div>
          <code className="font-mono text-xs text-muted-foreground">
            try_files $uri $uri/ @drop_fallback
          </code>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-3 dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className="font-mono text-xs text-muted-foreground">命中磁盘</div>
            <div className="mt-1 text-sm">主域原有文件，按原有行为返回</div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-3 dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className="font-mono text-xs text-muted-foreground">未命中</div>
            <div className="mt-1 text-sm">反向代理到发布服务，最长前缀匹配</div>
          </div>
        </div>

        <div className="flex justify-center text-muted-foreground/45" aria-hidden>
          <ChevronDown className="size-4" />
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
            <code className="font-mono text-xs text-muted-foreground">static</code>
            <div className="mt-1 text-sm">读磁盘文件，校验未越出站点根</div>
          </div>
          <div className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
            <code className="font-mono text-xs text-muted-foreground">node</code>
            <div className="mt-1 text-sm">反代 127.0.0.1:port，保持原路径</div>
          </div>
          <div className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
            <code className="font-mono text-xs text-muted-foreground">未登记 · 404</code>
            <div className="mt-1 text-sm">error_page 交回主域单页应用</div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

const CANDIDATES = [
  { path: "/alice/demo/assets/app.js", hit: false },
  { path: "/alice/demo/assets", hit: false },
  { path: "/alice/demo", hit: true },
  { path: "/alice", hit: false },
];

export function PrefixMatch() {
  return (
    <Frame title="候选前缀由长到短依次查表，首个命中的站点即为归属">
      <div className="space-y-1.5">
        {CANDIDATES.map((c) => (
          <div
            key={c.path}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-2",
              c.hit
                ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/25"
                : "border-neutral-200 dark:border-neutral-800"
            )}
          >
            <span className="w-4 shrink-0 font-mono text-xs text-muted-foreground">
              {c.hit ? "✓" : "✕"}
            </span>
            <code className="min-w-0 flex-1 font-mono text-xs">{c.path}</code>
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              {c.hit ? "已登记站点" : "索引中不存在"}
            </span>
          </div>
        ))}

        <div className="mt-3 rounded-lg border border-neutral-200 bg-neutral-50/80 px-3 py-2.5 dark:border-neutral-800 dark:bg-neutral-900/50">
          <div className="font-mono text-xs text-muted-foreground">匹配结果</div>
          <div className="mt-1 font-mono text-xs leading-relaxed">
            站点根 <code>/alice/demo</code>，站内相对路径{" "}
            <code>assets/app.js</code>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function NodePipeline() {
  return (
    <Frame title="常驻进程站点：注入配置、构建、启动、反向代理">
      <Flow
        steps={[
          { label: "注入配置", sub: "standalone + basePath" },
          { label: "构建", sub: "并发受信号量限制" },
          { label: "进程管理", sub: "分配空闲端口" },
          { label: "反向代理", sub: "127.0.0.1:port" },
        ]}
      />
    </Frame>
  );
}

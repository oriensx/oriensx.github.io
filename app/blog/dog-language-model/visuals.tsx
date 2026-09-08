"use client";

import { Fragment } from "react";
import { ArrowDown, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

function Node({
  label,
  sub,
  accent,
}: {
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[3.75rem] w-full flex-col items-center justify-center rounded-lg border px-3 py-3 text-center",
        accent
          ? "border-amber-300/70 bg-amber-50/90 dark:border-amber-700/50 dark:bg-amber-950/40"
          : "border-neutral-200 bg-neutral-50/80 dark:border-neutral-800 dark:bg-neutral-900/50"
      )}
    >
      <span className="text-sm font-medium leading-tight">{label}</span>
      {sub ? (
        <span className="mt-1 font-mono text-xs text-muted-foreground">{sub}</span>
      ) : null}
    </div>
  );
}

export function BidirectionalPipeline() {
  return (
    <figure className="my-8 not-prose">
      <div
        data-no-zoom
        className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950 sm:p-5"
      >
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="flex flex-col gap-2">
            <Node label="狗叫声" sub="Dog Audio" />
            <div className="flex justify-center text-muted-foreground/45" aria-hidden>
              <ArrowDown className="size-4" strokeWidth={2} />
            </div>
            <Node label="Dog Audio Encoder" sub="Dog2vec / HuBERT" />
          </div>

          <div className="flex flex-col items-center gap-2 py-2 sm:px-2">
            <ArrowLeftRight
              className="size-5 text-amber-600/80 dark:text-amber-400/80"
              strokeWidth={2}
              aria-hidden
            />
            <Node label="Dog Semantic Space" sub="intent · emotion · arousal" accent />
          </div>

          <div className="flex flex-col gap-2">
            <Node label="人类语言" sub="Human Language" />
            <div className="flex justify-center text-muted-foreground/45" aria-hidden>
              <ArrowDown className="size-4" strokeWidth={2} />
            </div>
            <Node label="Audio Generator" sub="AudioLDM / Vocoder" />
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center font-mono text-xs text-muted-foreground">
        双向产品共用中间语义空间：理解走 Encoder，生成走 Generator
      </figcaption>
    </figure>
  );
}

const STAGES = [
  { label: "阶段 1", sub: "声学预训练" },
  { label: "阶段 2", sub: "结构化语义" },
  { label: "阶段 3", sub: "音文对齐" },
  { label: "阶段 4", sub: "条件生成" },
];

export function FourStageRoadmap() {
  return (
    <figure className="my-8 not-prose">
      <div
        data-no-zoom
        className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950 sm:p-5"
      >
        <div className="hidden gap-2 sm:flex sm:items-stretch">
          {STAGES.map((stage, i) => (
            <Fragment key={stage.label}>
              <Node label={stage.label} sub={stage.sub} accent={i === 1} />
              {i < STAGES.length - 1 ? (
                <div
                  className="flex shrink-0 items-center text-muted-foreground/45"
                  aria-hidden
                >
                  <span className="font-mono text-xs">→</span>
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:hidden">
          {STAGES.map((stage, i) => (
            <Fragment key={stage.label}>
              <Node label={stage.label} sub={stage.sub} accent={i === 1} />
              {i < STAGES.length - 1 ? (
                <div className="flex justify-center text-muted-foreground/45" aria-hidden>
                  <ArrowDown className="size-4" strokeWidth={2} />
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center font-mono text-xs text-muted-foreground">
        阶段 2 的 Dog Semantic Dataset 是整条链路最需要自建的资产
      </figcaption>
    </figure>
  );
}

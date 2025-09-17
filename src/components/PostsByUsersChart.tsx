"use client";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

export type ChartRow = {
  userId: number;
  name: string;
  posts: number;
  comments: number;
};

export default function PostsByUsersChart({
  chart,
  isLoading,
  refreshKey,
}: {
  chart: ChartRow[];
  isLoading: boolean;
  refreshKey: number;
}) {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<"posts" | "comments">("posts");

  const rows = useMemo(() => {
    const withVal = chart.map((r) => ({
      ...r,
      value: mode === "posts" ? r.posts : r.comments,
    }));
    return withVal.sort((a, b) => b.value - a.value).slice(0, 10);
  }, [chart, mode]);

  const max = rows[0]?.value || 1;
  const avg = useMemo(
    () => rows.reduce((s, r) => s + r.value, 0) / (rows.length || 1),
    [rows]
  );
  const avgPct = Math.round((avg / max) * 100);

  return (
    <div className="rounded-2xl border border-neutral-800 p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="text-base font-semibold">Top users by {mode}</div>
        <div className="rounded-md bg-neutral-900 p-1">
          <button
            onClick={() => setMode("posts")}
            className={`px-3 py-1 text-sm ${
              mode === "posts"
                ? "rounded bg-neutral-100 text-neutral-900"
                : "text-neutral-300"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setMode("comments")}
            className={`px-3 py-1 text-sm ${
              mode === "comments"
                ? "rounded bg-neutral-100 text-neutral-900"
                : "text-neutral-300"
            }`}
          >
            Comments
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="h-40">
          <div className="flex h-full items-end gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="skel h-8 w-6 rounded" />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative h-48">
          <div
            className="absolute left-0 right-0 h-px bg-neutral-700/80"
            style={{ bottom: `${avgPct}%` }}
          />
          <div className="absolute right-2 top-2 rounded bg-neutral-900/80 px-2 py-1 text-xs text-neutral-300">
            Avg {mode}: {Math.round(avg)}
          </div>

          <div
            key={`${refreshKey}-${mode}`}
            className="relative flex h-full items-end gap-3"
          >
            {rows.map((row, i) => {
              const h = Math.round((row.value / max) * 100);
              return (
                <div
                  key={row.userId}
                  className="group relative flex h-full w-10 flex-col items-center justify-end gap-2"
                >
                  <Link
                    href={`/posts?userId=${row.userId}`}
                    className="block w-full focus:outline-none"
                  >
                    <motion.div
                      initial={
                        reduce ? { opacity: 0 } : { height: 0, opacity: 0 }
                      }
                      animate={
                        reduce
                          ? { opacity: 1 }
                          : { height: `${h}%`, opacity: 1 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 240,
                        damping: 20,
                        delay: i * 0.04,
                      }}
                      className="w-full rounded bg-neutral-300/25 group-hover:bg-neutral-100"
                      whileHover={reduce ? undefined : { scaleY: 1.06 }}
                    />
                  </Link>
                  <div className="w-14 truncate text-center text-[10px] text-neutral-400">
                    {row.name.split(" ")[0]}
                  </div>
                  <div
                    className="pointer-events-none absolute -translate-y-2 rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-[11px] text-neutral-200 opacity-0 group-hover:opacity-100"
                    style={{ bottom: `${h}%` }}
                  >
                    {row.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

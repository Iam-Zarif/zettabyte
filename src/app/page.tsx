"use client";
import { motion, useReducedMotion } from "framer-motion";
import useDashboard from "@/hooks/useDashboard";
import Button from "@/components/Button";
import { ErrorState } from "@/components/States";
import Link from "next/link";
import useTitle from "@/hooks/useTitle";

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 animate-spin"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        opacity=".25"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
}

export default function Page() {
  useTitle("zettabyte | Home");
  const reduce = useReducedMotion();
  const { loading, refreshing, error, metrics, chart, refetch, refreshKey } =
    useDashboard();
  if (error)
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <ErrorState message={error} onRetry={refetch} />
      </div>
    );
  const isLoading = loading || refreshing;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button
          variant="subtle"
          onClick={refetch}
          disabled={refreshing}
          aria-busy={refreshing}
          className={
            refreshing ? "cursor-not-allowed opacity-60" : "cursor-pointer"
          }
        >
          {refreshing ? (
            <span className="flex items-center gap-2">
              <Spinner /> Refreshing
            </span>
          ) : (
            "Refresh"
          )}
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-neutral-800 p-5">
              <div className="skel h-4 w-24 rounded" />
              <div className="mt-3 skel h-7 w-28 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="/users"
            prefetch
            aria-label="Go to Users"
            className="rounded-2xl border border-neutral-800 p-5 outline-none transition hover:border-neutral-700 hover:bg-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-300/30"
          >
            <div className="text-sm text-neutral-400">Users</div>
            <div className="mt-2 text-2xl font-semibold">
              {metrics.totalUsers}
            </div>
          </Link>
          <Link
            href="/posts"
            prefetch
            aria-label="Go to Posts"
            className="rounded-2xl border border-neutral-800 p-5 outline-none transition hover:border-neutral-700 hover:bg-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-300/30"
          >
            <div className="text-sm text-neutral-400">Posts</div>
            <div className="mt-2 text-2xl font-semibold">
              {metrics.totalPosts}
            </div>
          </Link>
          <div className="rounded-2xl border border-neutral-800 p-5">
            <div className="text-sm text-neutral-400">Avg comments/post</div>
            <div className="mt-2 text-2xl font-semibold">
              {metrics.avgCommentsPerPost}
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-neutral-800 p-5 max-w-md mx-auto">
        <div className="mb-3 flex items-end justify-between">
          <div className="text-base font-semibold">Posts by top users</div>
          {!isLoading && (
            <div className="text-xs text-neutral-400">Top {chart.length}</div>
          )}
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
          <div className="space-y-4">
            {chart.map((row, i) => (
              <div
                key={row.userId}
                className="flex items-center justify-between gap-3"
              >
                <div className="text-xl font-semibold">{i + 1}.</div>
                <div className="flex-1 text-sm text-neutral-400">
                  {row.name}
                </div>
                <div className="text-sm font-semibold">{row.count} Posts</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

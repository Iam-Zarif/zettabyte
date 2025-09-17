"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import useFetch from "@/hooks/useFetch";
import { staggerParent, riseIn } from "@/lib/motion";
import { CardSkeletonGrid } from "@/components/Skeleton";
import { ErrorState } from "@/components/States";
import Button from "@/components/Button";
import PostCard, { Post } from "@/components/PostCard";
import useTitle from "@/hooks/useTitle";

export const dynamic = "force-dynamic"; 

const LIMIT = 12;

export default function PostsPage() {
  useTitle("zettabyte | Posts");
  return (
    <Suspense fallback={<CardSkeletonGrid count={LIMIT} />}>
      <PostsPageInner />
    </Suspense>
  );
}

function PostsPageInner() {
  const search = useSearchParams();
  const router = useRouter();

  const startPage = Math.max(1, Number(search.get("page") || 1));
  const [page, setPage] = useState(startPage);

  const url = `https://jsonplaceholder.typicode.com/posts?_sort=id&_order=asc&_page=${page}&_limit=${LIMIT}`;
  const { data, loading, error, refetch } = useFetch<Post[]>(url, {
    retry: 1,
    init: { cache: "no-store" },
  });

  useEffect(() => {
    router.replace(`?page=${page}`, { scroll: false });
  }, [page, router]);

  const [totalCount, setTotalCount] = useState<number | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=1",
          { cache: "no-store" }
        );
        const header = r.headers.get("x-total-count");
        if (!cancelled && header && !Number.isNaN(Number(header))) {
          setTotalCount(Number(header));
          return;
        }
        const all = await fetch("https://jsonplaceholder.typicode.com/posts", {
          cache: "no-store",
        }).then((x) => x.json());
        if (!cancelled) setTotalCount(Array.isArray(all) ? all.length : 0);
      } catch {
        if (!cancelled) setTotalCount(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = totalCount
    ? Math.max(1, Math.ceil(totalCount / LIMIT))
    : null;
  const hasPrev = page > 1;
  const items = useMemo(() => data || [], [data]);
  const hasNext = totalPages ? page < totalPages : items.length === LIMIT;

  if (loading && !data) return <CardSkeletonGrid count={LIMIT} />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <div className="text-sm text-neutral-400">
          Page {page}
          {totalPages ? ` / ${totalPages}` : ""}
        </div>
        <Button variant="subtle" onClick={refetch}>
          Refresh
        </Button>
      </div>

      {!items.length ? (
        <ErrorState
          message="No posts found"
          onRetry={() => {
            setPage(1);
            refetch();
          }}
        />
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="show"
            variants={staggerParent}
          >
            {items.map((p) => (
              <motion.div key={p.id} variants={riseIn}>
                <PostCard post={p} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!hasPrev}
              className={!hasPrev ? "opacity-50" : ""}
            >
              Previous
            </Button>
            <div className="text-sm text-neutral-400">
              {totalPages ? `Page ${page} of ${totalPages}` : `Page ${page}`}
            </div>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNext}
              className={!hasNext ? "opacity-50" : ""}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

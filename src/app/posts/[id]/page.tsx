"use client";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { CardSkeleton } from "@/components/Skeleton";
import { ErrorState } from "@/components/States";
import useTitle from "@/hooks/useTitle";

type Post = { id: number; title: string; body: string };

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const postId = Array.isArray(id) ? id[0] : id;
  const { data, loading, error, refetch } = useFetch<Post>(
    postId ? `https://jsonplaceholder.typicode.com/posts/${postId}` : null,
    { retry: 1, init: { cache: "no-store" } }
  );

  useTitle(`Post | ${data?.title || postId || ""}`);

  if (loading) return <CardSkeleton />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!data) return <ErrorState message="Not found" onRetry={refetch} />;

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <p className="text-neutral-300">{data.body}</p>
    </div>
  );
}

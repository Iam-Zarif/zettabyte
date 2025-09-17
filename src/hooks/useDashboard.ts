"use client";
import { useMemo, useState } from "react";
import useFetch from "./useFetch";

type Post = { id: number; userId: number };
type User = { id: number; name: string };
type Comment = { id: number; postId: number };

export default function useDashboard() {
  const posts = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts", {
    retry: 1,
    init: { cache: "no-store" },
  });
  const users = useFetch<User[]>("https://jsonplaceholder.typicode.com/users", {
    retry: 1,
    init: { cache: "no-store" },
  });
  const comments = useFetch<Comment[]>(
    "https://jsonplaceholder.typicode.com/comments",
    { retry: 1, init: { cache: "no-store" } }
  );

  const loading = posts.loading || users.loading || comments.loading;
  const refreshing =
    posts.refreshing || users.refreshing || comments.refreshing;
  const error = posts.error || users.error || comments.error;

  const [refreshKey, setRefreshKey] = useState(0);
  const refetch = () => {
    setRefreshKey((k) => k + 1);
    posts.refetch();
    users.refetch();
    comments.refetch();
  };

  const metrics = useMemo(() => {
    const totalUsers = users.data?.length || 0;
    const totalPosts = posts.data?.length || 0;
    const totalComments = comments.data?.length || 0;
    const avgCommentsPerPost = totalPosts
      ? +(totalComments / totalPosts).toFixed(1)
      : 0;
    return { totalUsers, totalPosts, avgCommentsPerPost };
  }, [users.data, posts.data, comments.data]);

  const chart = useMemo(() => {
    if (!posts.data || !users.data) return [];
    const perUser = new Map<number, number>();
    for (const p of posts.data)
      perUser.set(p.userId, (perUser.get(p.userId) || 0) + 1);
    return Array.from(perUser.entries())
      .map(([userId, count]) => ({
        userId,
        name:
          users.data!.find((u) => u.id === userId)?.name || `User ${userId}`,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [posts.data, users.data]);

  return { loading, refreshing, error, metrics, chart, refetch, refreshKey };
}

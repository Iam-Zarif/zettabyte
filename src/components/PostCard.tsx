import BaseCard from "./BaseCard";

export type Post = { id: number; userId: number; title: string; body: string };

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-100"
    >
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <BaseCard
      title={`#${post.id} — ${post.title}`}
      body={post.body}
      href={`/posts/${post.id}`}
      trailing={<Arrow />}
      aria-label={`Open post ${post.id}`}
    />
  );
}

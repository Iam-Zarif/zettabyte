"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Nav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const is = (p: string) =>
    pathname === p ? "text-white" : "text-neutral-300 hover:text-white";

  return (
    <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
      <Link href="/" className="font-semibold">
        Zettabyte
      </Link>
      <div className="flex gap-4 text-sm">
        <Link href="/posts" className={`transition ${is("/posts")}`}>
          Posts
        </Link>
        <Link href="/users" className={`transition ${is("/users")}`}>
          Users
        </Link>
        {session ? (
          <Link href="/profile" className={`transition ${is("/profile")}`}>
            Profile
          </Link>
        ) : null}
      </div>

      <div className="ml-auto flex items-center gap-3">
        {status === "loading" ? (
          <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-800" />
        ) : session ? (
          <>
            <span className="hidden text-sm text-neutral-300 sm:inline">
              Hi, {session.user?.name?.split(" ")[0] ?? "You"}
            </span>
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full border border-neutral-800"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 text-xs">
                {session.user?.name?.[0] ?? "U"}
              </div>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("google", { callbackUrl: "/profile" })}
            className="rounded-md border border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-900"
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}

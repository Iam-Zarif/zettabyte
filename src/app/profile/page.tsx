"use client";
import { useSession, signIn } from "next-auth/react";
import useTitle from "@/hooks/useTitle";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  useTitle("zettabyte | Profile");
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (status !== "loading" && !session) {
      signIn("google", { callbackUrl: "/profile" });
    }
  }, [status, session, router]);

  if (status === "loading" || !isMounted) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Your Profile</h1>
        <div className="rounded-2xl border border-neutral-800 p-5">
          <div className="skel h-8 w-40 rounded" />
          <div className="mt-2 skel h-5 w-64 rounded" />
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Your Profile</h1>
        <div className="rounded-2xl border border-neutral-800 p-5">
          <div className="flex items-center gap-4">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full border border-neutral-800"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-neutral-800 text-xl">
                {session?.user?.name?.[0] ?? "U"}
              </div>
            )}
            <div>
              <div className="text-lg font-medium">{session?.user?.name}</div>
              <div className="text-sm text-neutral-400">
                {session?.user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Your Profile</h1>
      <div className="rounded-2xl border border-neutral-800 p-5">
        <div className="text-lg font-medium">
          Please log in to view your profile
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/profile" })}
          className="mt-4 rounded-md border border-neutral-800 px-4 py-2 text-sm hover:bg-neutral-900"
        >
          Log in with Google
        </button>
      </div>
    </div>
  );
}

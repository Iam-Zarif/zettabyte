import "./globals.css";
import Link from "next/link";
import Providers from "@/components/Providers";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-neutral-950 text-neutral-100">
        <header className="border-b border-neutral-800">
          <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
            <Link href="/" className="font-semibold">
              Zettabyte
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/posts">Posts</Link>
              <Link href="/users">Users</Link>
              <Link href="/profile">Profile</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}

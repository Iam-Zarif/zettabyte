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
      <head>
        <link
          rel="icon"
          href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ7P-iNiO6vphZygOeeAzqsXiqz4H3VrJfAw&s"
          type="image/png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zettabyte-dusky.vercel.app/" />
        <meta property="og:title" content="Zettabyte - Dashboard" />
        <meta
          property="og:description"
          content="Zettabyte is a dashboard that allows you to manage posts, users, and profile data."
        />
        <meta
          property="og:image"
          content="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ7P-iNiO6vphZygOeeAzqsXiqz4H3VrJfAw&s"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zettabyte - Dashboard" />
        <meta
          name="twitter:description"
          content="Zettabyte is a dashboard that allows you to manage posts, users, and profile data."
        />
        <meta
          name="twitter:image"
          content="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ7P-iNiO6vphZygOeeAzqsXiqz4H3VrJfAw&s"
        />
      </head>
      <body
        className="min-h-dvh bg-neutral-950 text-neutral-100"
        cz-shortcut-listen="true"
      >
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

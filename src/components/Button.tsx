import { cn } from "@/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "subtle";
};
export default function Button({ variant = "solid", className, ...p }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/30";
  const v =
    variant === "outline"
      ? "border border-neutral-700 bg-neutral-900 hover:bg-neutral-800"
      : variant === "subtle"
      ? "bg-neutral-900 hover:bg-neutral-800"
      : "bg-neutral-100 text-neutral-900 hover:bg-white";
  return <button className={cn(base, v, className)} {...p} />;
}

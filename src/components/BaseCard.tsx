"use client";
import { forwardRef } from "react";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  body?: React.ReactNode;
  meta?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
} & MotionProps;

function Impl(props: Props, ref: React.Ref<HTMLDivElement>) {
  const {
    title,
    subtitle,
    body,
    meta,
    href,
    onClick,
    leading,
    trailing,
    className,
    ...m
  } = props;
  const reduce = useReducedMotion();
  const content = (
    <motion.div
      ref={ref}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      {...m}
      className={cn(
        "group rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 outline-none transition hover:border-neutral-700 hover:bg-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-300/30",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {leading ? <div className="shrink-0">{leading}</div> : null}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-base font-semibold">{title}</div>
              {subtitle ? (
                <div className="truncate text-sm text-neutral-300">
                  {subtitle}
                </div>
              ) : null}
            </div>
            {trailing ? <div className="shrink-0">{trailing}</div> : null}
          </div>
          {body ? (
            <div className="mt-3 line-clamp-2 text-sm text-neutral-300">
              {body}
            </div>
          ) : null}
          {meta ? (
            <div className="mt-3 text-xs text-neutral-400">{meta}</div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
  if (href)
    return (
      <Link href={href} prefetch className="block">
        {content}
      </Link>
    );
  if (onClick)
    return (
      <button
        type="button"
        onClick={onClick}
        className="block w-full text-left focus:outline-none"
      >
        {content}
      </button>
    );
  return content;
}

const BaseCard = forwardRef<HTMLDivElement, Props>(Impl);
export default BaseCard;

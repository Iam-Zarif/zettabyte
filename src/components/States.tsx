import Button from "./Button";

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-red-900/50 bg-red-950/30 p-5 text-sm text-red-300">
      <div className="font-medium text-red-200">Something went wrong</div>
      <div className="text-red-300">{message}</div>
      {onRetry ? (
        <Button variant="outline" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 text-center">
      <div className="text-base font-semibold">{title}</div>
      {hint ? (
        <div className="mt-1 text-sm text-neutral-400">{hint}</div>
      ) : null}
    </div>
  );
}

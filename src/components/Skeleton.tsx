export function CardSkeleton() {
  return (
    <div className="skel rounded-2xl border border-neutral-800 p-5">
      <div className="flex items-start gap-4">
        <div className="skel h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skel h-4 w-2/3 rounded" />
          <div className="skel h-3 w-3/4 rounded" />
          <div className="skel h-3 w-full rounded" />
        </div>
      </div>
    </div>
  );
}

export function CardSkeletonGrid({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TableSkeletonRows({
  rows = 8,
  cols = 3,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} className="border-t border-neutral-800">
          {Array.from({ length: cols }).map((_, c) => (
            <td key={c} className="px-4 py-3">
              <div className="skel h-4 w-40 rounded" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

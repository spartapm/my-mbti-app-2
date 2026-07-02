export default function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percentage = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-300">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-wide text-cyan-300">
          {current} / {total}
        </span>
        <span className="text-xs text-slate-400">{percentage}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

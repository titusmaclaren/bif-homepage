type Props = {
  step: number;
  total: number;
};

export function ProgressBar({ step, total }: Props) {
  const pct = Math.min(Math.max((step / Math.max(total - 1, 1)) * 100, 0), 100);
  return (
    <div className="sticky top-[72px] z-10 h-[2px] bg-border-light">
      <div
        className="h-full bg-navy transition-[width] duration-400 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

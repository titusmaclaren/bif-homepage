type Props = {
  phase: string;
  priceLow: number;
  priceHigh: number;
  description: string;
  showAsterisk?: boolean;
};

function formatRange(low: number, high: number): string {
  const fmt = (n: number) =>
    n >= 1000 ? `A$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `A$${n}`;
  return `${fmt(low)} to ${fmt(high)}`;
}

export function PhaseCard({
  phase,
  priceLow,
  priceHigh,
  description,
  showAsterisk,
}: Props) {
  return (
    <div className="rounded-lg border border-border-light bg-white p-6">
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <div className="text-[11px] tracking-[0.2em] uppercase font-medium text-blue-slate">
          {phase}
        </div>
        <div className="text-[15px] font-medium text-navy whitespace-nowrap">
          {formatRange(priceLow, priceHigh)}
          {showAsterisk && <span className="text-blue-slate">*</span>}
        </div>
      </div>
      <p className="text-[14px] leading-[1.65] text-text-primary">{description}</p>
    </div>
  );
}

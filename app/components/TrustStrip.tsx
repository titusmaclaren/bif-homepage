const stats = [
  { value: "30+", label: "industries served" },
  { value: "15+", label: "years in the craft" },
  { value: "10-day", label: "turnaround, every time" },
  { value: "Fixed", label: "price, no surprises" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-white/10 bg-[#050505]">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col">
            <span className="text-3xl md:text-4xl font-light text-white tracking-tight">
              {s.value}
            </span>
            <span className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/50 font-medium">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

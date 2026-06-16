"use client";

import { useMemo, useState } from "react";
import { VideoTrigger } from "../components/VideoLightbox";
import type { PortfolioItem } from "../data/portfolio";

type FilterValue = "All" | string;

type PortfolioExplorerProps = {
  items: PortfolioItem[];
};

const featuredIds = new Set(["742487127", "776884299", "1109359009"]);

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export function PortfolioExplorer({ items }: PortfolioExplorerProps) {
  const [typeFilter, setTypeFilter] = useState<FilterValue>("All");
  const [industryFilter, setIndustryFilter] = useState<FilterValue>("All");
  const [query, setQuery] = useState("");

  const videoTypes = useMemo(
    () => uniqueSorted(items.map((item) => item.category)),
    [items],
  );
  const industries = useMemo(
    () => uniqueSorted(items.map((item) => item.industry)),
    [items],
  );

  const filteredItems = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesType = typeFilter === "All" || item.category === typeFilter;
      const matchesIndustry =
        industryFilter === "All" || item.industry === industryFilter;
      const searchable = [
        item.title,
        item.client,
        item.category,
        item.industry,
        item.description,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesType &&
        matchesIndustry &&
        (!normalisedQuery || searchable.includes(normalisedQuery))
      );
    });
  }, [industryFilter, items, query, typeFilter]);

  const hasActiveFilter =
    typeFilter !== "All" || industryFilter !== "All" || query.trim() !== "";

  return (
    <section className="bg-off-white py-10 md:py-12">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="grid gap-4 border-y border-fog/70 py-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div className="space-y-5">
            <FilterGroup
              label="Video type"
              values={videoTypes}
              selected={typeFilter}
              onSelect={setTypeFilter}
            />
            <FilterGroup
              label="Industry"
              values={industries}
              selected={industryFilter}
              onSelect={setIndustryFilter}
            />
          </div>

          <div className="grid gap-3">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate">
              Search
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Client, title, format..."
                className="mt-2 h-11 w-full rounded-sm border border-fog bg-white px-3 text-sm font-medium normal-case tracking-normal text-navy outline-none transition-colors placeholder:text-slate/60 focus:border-mint"
              />
            </label>
            <div className="flex items-center justify-between gap-3 text-xs text-slate">
              <span>
                {filteredItems.length} of {items.length} projects
              </span>
              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={() => {
                    setTypeFilter("All");
                    setIndustryFilter("All");
                    setQuery("");
                  }}
                  className="font-bold text-mint transition-colors hover:text-bif-green"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <PortfolioCard key={item.vimeoId} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-fog bg-white px-6 py-12 text-center">
            <h2 className="text-2xl font-bold text-navy">No matching projects</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate">
              Try clearing a filter or searching for a client, sector, or video
              format.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function FilterGroup({
  label,
  values,
  selected,
  onSelect,
}: {
  label: string;
  values: string[];
  selected: FilterValue;
  onSelect: (value: FilterValue) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate">
        {label}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["All", ...values].map((value) => {
          const isSelected = selected === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelect(value)}
              className={[
                "min-h-9 shrink-0 rounded-sm border px-3 text-[12px] font-bold transition-colors",
                isSelected
                  ? "border-navy bg-navy text-white"
                  : "border-fog bg-white text-slate hover:border-mint hover:text-navy",
              ].join(" ")}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const isFeatured = featuredIds.has(item.vimeoId);

  return (
    <VideoTrigger
      video={item}
      aria-label={`Play ${item.title}`}
      className="group block h-full overflow-hidden rounded-md border border-fog/80 bg-white text-left shadow-[0_18px_45px_rgba(15,24,38,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,24,38,0.13)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
    >
      <span className="relative block aspect-[16/9] overflow-hidden bg-navy-midnight">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.thumb}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
          loading="lazy"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/12 to-transparent" />
        <span className="absolute left-3 top-3 rounded-sm bg-white/92 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-navy">
          {item.category}
        </span>
        {isFeatured && (
          <span className="absolute right-3 top-3 rounded-sm bg-mint px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
            Reel
          </span>
        )}
        <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-mint text-white shadow-xl">
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </span>
      <span className="block p-4">
        <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-mint">
          {item.industry}
        </span>
        <span className="mt-2 block text-lg font-bold leading-tight text-navy">
          {item.title}
        </span>
        <span className="mt-2 block text-sm leading-relaxed text-slate">
          {item.description}
        </span>
      </span>
    </VideoTrigger>
  );
}

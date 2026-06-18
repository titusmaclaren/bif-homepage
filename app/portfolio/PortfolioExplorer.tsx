"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { VideoTrigger } from "../components/VideoLightbox";
import {
  getIndustryGroups,
  getVideoTypeGroups,
  INDUSTRY_FILTERS,
  VIDEO_TYPE_FILTERS,
} from "../data/portfolio-filters";
import type { PortfolioItem } from "../data/portfolio";

type FilterValue = "All" | string;

type PortfolioExplorerProps = {
  items: PortfolioItem[];
};

const featuredIds = new Set(["742487127", "776884299", "1109359009"]);

export function PortfolioExplorer({ items }: PortfolioExplorerProps) {
  const [typeFilter, setTypeFilter] = useState<FilterValue>("All");
  const [industryFilter, setIndustryFilter] = useState<FilterValue>("All");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesType =
        typeFilter === "All" || getVideoTypeGroups(item).includes(typeFilter);
      const matchesIndustry =
        industryFilter === "All" || getIndustryGroups(item).includes(industryFilter);

      return matchesType && matchesIndustry;
    });
  }, [industryFilter, items, typeFilter]);

  const hasActiveFilter = typeFilter !== "All" || industryFilter !== "All";

  return (
    <section className="bg-off-white py-10 md:py-12">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="rounded-md border border-fog bg-white p-5 shadow-[0_10px_30px_rgba(15,24,38,0.08)] md:p-6">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
            <FilterSelect
              label="Choose an industry"
              value={industryFilter}
              onChange={setIndustryFilter}
              options={INDUSTRY_FILTERS.map((filter) => filter.label)}
            />
            <FilterSelect
              label="Choose a type of video"
              value={typeFilter}
              onChange={setTypeFilter}
              options={VIDEO_TYPE_FILTERS.map((filter) => filter.label)}
            />
          </div>
          {hasActiveFilter && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setTypeFilter("All");
                  setIndustryFilter("All");
                }}
                className="min-h-11 rounded-sm bg-bif-green px-5 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-bif-green-hover"
              >
                Clear filters
              </button>
            </div>
          )}
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
              Try clearing a filter or choosing a different sector or video
              format.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: FilterValue;
  options: string[];
  onChange: (value: FilterValue) => void;
}) {
  return (
    <label className="block text-sm font-bold text-navy">
      <span className="block">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-sm border border-fog bg-white px-3 text-sm font-bold text-navy outline-none transition-colors focus:border-mint"
      >
        <option value="All">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const isFeatured = featuredIds.has(item.vimeoId);
  const videoTypeLabel = getVideoTypeGroups(item)[0];
  const industryLabel = getIndustryGroups(item)[0];

  return (
    <VideoTrigger
      video={item}
      aria-label={`Play ${item.title}`}
      className="group block h-full overflow-hidden rounded-md border border-fog/80 bg-white text-left shadow-[0_18px_45px_rgba(15,24,38,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,24,38,0.13)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
    >
      <span className="relative block aspect-[16/9] overflow-hidden bg-navy-midnight">
        <Image
          src={item.thumb}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading="lazy"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/12 to-transparent" />
        <span className="absolute left-3 top-3 rounded-sm bg-white/92 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-navy">
          {videoTypeLabel}
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
          {industryLabel}
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

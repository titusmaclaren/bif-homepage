import Image from "next/image";
import { THUMBS, ThumbKey } from "@/lib/thumbnails";

type Props = {
  label: string;
  description?: string;
  thumbnailKey?: ThumbKey;
  selected?: boolean;
  highlighted?: boolean; // adds mint Recommended pill
  onClick: () => void;
};

/**
 * Rich option card used for video-type, scope, and recommendation choices.
 * Thumbnail on the left (120x80), text right. Hover lifts 1px and border
 * darkens to navy. Selected fills navy with white text.
 */
export function OptionCard({
  label,
  description,
  thumbnailKey,
  selected = false,
  highlighted = false,
  onClick,
}: Props) {
  const thumb = thumbnailKey ? THUMBS[thumbnailKey] : null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "group relative w-full text-left rounded-lg border transition-all duration-200",
        "flex items-stretch gap-5 p-4 sm:p-5",
        selected
          ? "bg-navy text-white border-navy"
          : highlighted
            ? "bg-white text-text-primary border-navy hover:-translate-y-[1px]"
            : "bg-white text-text-primary border-border-light hover:border-navy hover:-translate-y-[1px]",
      ].join(" ")}
    >
      {highlighted && !selected && (
        <span className="absolute -top-3 right-4 bg-mint text-white text-[10px] tracking-[0.14em] uppercase font-medium px-2.5 py-1 rounded-full">
          Recommended
        </span>
      )}

      {thumb && (
        <div
          className={[
            "relative shrink-0 w-[120px] h-[72px] sm:h-[80px] rounded-md overflow-hidden",
            selected ? "ring-1 ring-white/20" : "bg-sky-pale/30",
          ].join(" ")}
        >
          <Image
            src={thumb.src}
            alt={thumb.alt}
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-col justify-center min-w-0">
        <div className="font-medium text-[15px] sm:text-[16px] leading-tight">
          {label}
        </div>
        {description && (
          <div
            className={[
              "mt-1.5 text-[13px] leading-[1.5]",
              selected ? "text-white/75" : "text-text-secondary",
            ].join(" ")}
          >
            {description}
          </div>
        )}
      </div>
    </button>
  );
}

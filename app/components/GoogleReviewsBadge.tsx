const googleProfileUrl =
  "https://www.google.com/maps/search/?api=1&query=Black%20Iris%20Films%20Sydney%20Australia";

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 4 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

function Star() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-gold">
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export function GoogleReviewsBadge() {
  return (
    <a
      href={googleProfileUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Read Black Iris Films reviews on Google"
      className="fixed bottom-4 left-4 z-40 inline-flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-lg border border-fog/80 bg-white/95 px-3.5 py-3 text-navy shadow-[0_14px_40px_rgba(15,24,38,0.18)] backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(15,24,38,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 md:bottom-5 md:left-5"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(15,24,38,0.08)]">
        <GoogleMark />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} />
          ))}
        </span>
        <span className="mt-1 block text-[12px] font-bold leading-none">
          Google reviews
        </span>
        <span className="mt-1 block text-[11px] font-medium leading-none text-slate">
          Read what clients say
        </span>
      </span>
    </a>
  );
}

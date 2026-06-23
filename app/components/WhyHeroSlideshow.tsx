"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/assets/why-hero-woman.webp",
    alt: "A campaign content collage featuring a business leader in an office interview.",
  },
  {
    src: "/assets/why-hero-man.webp",
    alt: "A campaign content collage featuring a business leader in a city office.",
  },
];

export function WhyHeroSlideshow() {
  const [activeSlide, setActiveSlide] = useState<0 | 1 | null>(0);

  useEffect(() => {
    const sequence: Array<0 | 1 | null> = [0, null, 1, null];
    let sequenceIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    const advance = () => {
      sequenceIndex = (sequenceIndex + 1) % sequence.length;
      const nextSlide = sequence[sequenceIndex];
      setActiveSlide(nextSlide);
      timer = setTimeout(advance, nextSlide === null ? 700 : 4200);
    };

    timer = setTimeout(advance, 4200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[500px] overflow-hidden rounded-lg bg-white shadow-[0_22px_60px_rgba(15,24,38,0.13)]">
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="(min-width: 1024px) 42vw, (min-width: 640px) 62vw, 88vw"
          className={`object-cover transition-opacity duration-700 motion-reduce:transition-none ${
            activeSlide === index ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0}
        />
      ))}
    </div>
  );
}

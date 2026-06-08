"use client";

import { useId, useMemo, useState } from "react";

type ThemeKey =
  | "all"
  | "creativity"
  | "storytelling"
  | "professionalism"
  | "results"
  | "easy";

type TestimonialTheme = Exclude<ThemeKey, "all">;

type Testimonial = {
  name: string;
  role: string;
  theme: TestimonialTheme;
  size: "s" | "m" | "l";
  quote: string;
  highlight: string;
};

const themes: Array<{ key: ThemeKey; label: string }> = [
  { key: "all", label: "Every angle" },
  { key: "creativity", label: "Creativity & vision" },
  { key: "storytelling", label: "Storytelling & craft" },
  { key: "professionalism", label: "Professional & reliable" },
  { key: "results", label: "Results & ROI" },
  { key: "easy", label: "Easy to work with" },
];

const testimonials: Testimonial[] = [
  {
    name: "Jess Smith",
    role: "IllumiaSkin",
    theme: "creativity",
    size: "l",
    quote:
      "Working with Black Iris Films for our LED face mask video was a game-changer. They expertly brought our vision to life, building and lighting a set inside a studio, which resulted in a visually stunning video and photo portfolio. With just a four-person crew, they combined live action, projection and graphics to perfectly capture our product's essence.",
    highlight: "a visually stunning video and photo portfolio",
  },
  {
    name: "Peter Crundall",
    role: "David Morse & Assoc.",
    theme: "creativity",
    size: "s",
    quote:
      "Fantastic. Beautiful. Innovative. Totally marketable marketing, and looks incredibly fun to do.",
    highlight: "Fantastic. Beautiful. Innovative.",
  },
  {
    name: "Xi Wang",
    role: "Academy of Interactive Entertainment",
    theme: "creativity",
    size: "m",
    quote:
      "They're always keeping up to date with the latest technology, techniques and trends. They take initiative in experimenting with innovative motion graphics, sound, music and editing techniques. I would highly recommend Black Iris Films.",
    highlight: "experimenting with innovative motion graphics",
  },
  {
    name: "Marlon Marescia",
    role: "Sales Driven",
    theme: "creativity",
    size: "m",
    quote:
      "Black Iris Films are very energetic and bring an excitement to the projects we work on. They always have new ideas and are always thinking of new ways of achieving goals. They're dependable to work until the job is done, even when deadlines are unrealistic.",
    highlight: "They always have new ideas",
  },
  {
    name: "Jonathan Doe",
    role: "Client",
    theme: "creativity",
    size: "s",
    quote:
      "I had a great experience working with Black Iris Films. They provided a straightforward service and added really creative angles to my project. I would totally use them again, well worth it.",
    highlight: "added really creative angles",
  },
  {
    name: "Vicky Barker",
    role: "CMO, Dacxi Chain",
    theme: "storytelling",
    size: "l",
    quote:
      "For our corporate videos, Titus is unparalleled in his filmmaking prowess. His meticulous attention to detail, innate storytelling aptitude, and technical brilliance make him a delight to collaborate with. Anyone connecting is in for profound insights from a true master of the craft.",
    highlight: "innate storytelling aptitude",
  },
  {
    name: "Will Aslett",
    role: "Development Executive",
    theme: "storytelling",
    size: "m",
    quote:
      "Black Iris Films have a well-honed professionalism in storytelling through film and video. They have a firm grip on the visual narrative and excel at their ability to tailor content to a target audience. The collective at Black Iris Films are enthusiastic, positive and hard-working.",
    highlight: "a firm grip on the visual narrative",
  },
  {
    name: "Kate Shea",
    role: "Ceramic Artist",
    theme: "storytelling",
    size: "m",
    quote:
      "I was delighted with them, punchy, very visual and yet comprehensive. They give an impression of dynamism and imagination. They have a good grip of getting and holding attention, and a no-fuss, can-do attitude which makes them a pleasure to work with.",
    highlight: "an impression of dynamism and imagination",
  },
  {
    name: "Ishea Bedding",
    role: "Central Coast Council",
    theme: "storytelling",
    size: "s",
    quote:
      "Your months of hard work has created an amazing glimpse of Sydney. Your passion shows throughout the piece, through every little detail you added. Congratulations!",
    highlight: "your passion shows throughout the piece",
  },
  {
    name: "Jessica Coady",
    role: "Client",
    theme: "storytelling",
    size: "s",
    quote:
      "Great company, fantastic service and the best quality content. Highly recommend speaking to Titus to extend your reach on social media and websites today.",
    highlight: "the best quality content",
  },
  {
    name: "Sarah Taylor",
    role: "Client",
    theme: "professionalism",
    size: "m",
    quote:
      "Black Iris Films are professional, friendly and thorough. I needed someone who was able to film and produce an interactive video series, and Titus delivered exceptional content on time and within budget.",
    highlight: "professional, friendly and thorough",
  },
  {
    name: "Ian Lowe",
    role: "CEO, Dacxi Group",
    theme: "professionalism",
    size: "m",
    quote:
      "I would recommend Black Iris Films unambiguously. This is a group of accessible, really polished professionals that have taken all of our video content to the next level, and what we've been able to achieve with that result has been just fantastic.",
    highlight: "accessible, really polished professionals",
  },
  {
    name: "Scott Newton",
    role: "Launch event",
    theme: "professionalism",
    size: "m",
    quote:
      "I worked with Titus on a shoot for a big launch event. He managed the process with professional ease. We met beforehand, discussed the vision for the film and scouted our space, and on the night he captured exciting footage.",
    highlight: "managed the process with professional ease",
  },
  {
    name: "Catherine Alison",
    role: "Client",
    theme: "professionalism",
    size: "s",
    quote:
      "Such a pleasure working with Black Iris Films. Super professional, great attention to detail and extremely creative. Highly recommended and would definitely use them again.",
    highlight: "great attention to detail",
  },
  {
    name: "Simon Freeman",
    role: "Academy of Interactive Entertainment",
    theme: "professionalism",
    size: "s",
    quote:
      "Black Iris Films are an exceptionally effective video content production service who understand, in depth, the whole production cycle. While they have exceptional content creation skills, it is their attitude, willingness to succeed and drive that sets them apart.",
    highlight: "the whole production cycle",
  },
  {
    name: "Daniel Desiderio",
    role: "CEO, fitness company",
    theme: "results",
    size: "m",
    quote:
      "Black Iris Films is the best in the business. As CEO of a fitness company, their video content significantly boosted our ROAS. Their team is professional, reliable and incredibly talented, delivering a perfect blend of engaging and high-quality videos.",
    highlight: "significantly boosted our ROAS",
  },
  {
    name: "Little Red Hood",
    role: "LRH",
    theme: "results",
    size: "l",
    quote:
      "Black Iris Films is nothing short of exceptional. Their ability to achieve a click-through rate much higher than the market average for Facebook and Instagram ads is a true testament to their innovative approach. What truly stands out is their lightning-fast turnaround time, they get the job done so swiftly and efficiently that it's nothing short of impressive.",
    highlight: "a click-through rate much higher than the market average",
  },
  {
    name: "Leon Matti",
    role: "Smart Makeover",
    theme: "results",
    size: "m",
    quote:
      "Their team brilliantly crafted a series of videos and social media ads for us, yielding excellent returns. They blend reliability, professionalism and creativity seamlessly. Highly recommend Black Iris Films for impactful video production.",
    highlight: "yielding excellent returns",
  },
  {
    name: "Darius Rountree-Harrison",
    role: "Client",
    theme: "results",
    size: "s",
    quote:
      "The video is spot on, love your work. Looking forward to working with you again!",
    highlight: "The video is spot on",
  },
  {
    name: "Sara Matthews",
    role: "Academy of Interactive Entertainment",
    theme: "easy",
    size: "m",
    quote:
      "Black Iris Films are a dedicated, creative and organised company who are able to work both independently and within a team. They build excellent relationships with the people they are shooting. They add a little magic to the world around them when looking through the lens of a camera.",
    highlight: "They add a little magic to the world",
  },
  {
    name: "Alan Howle",
    role: "Event organiser",
    theme: "easy",
    size: "m",
    quote:
      "Highly recommend Titus and the work he does. He covered an event I ran, made the process really easy for me and saw opportunities I had not considered. Thanks again legend.",
    highlight: "made the process really easy for me",
  },
  {
    name: "Jason Hayward",
    role: "Senior Web Developer",
    theme: "easy",
    size: "s",
    quote:
      "Black Iris Films are enthusiastic go-getters with a passionate dedication to their craft. A refreshingly honest service that undersell their consistent ability to excel and always striving to improve.",
    highlight: "a passionate dedication to their craft",
  },
  {
    name: "Samantha Georgiou",
    role: "Sofitel Sydney",
    theme: "easy",
    size: "s",
    quote:
      "This is absolutely amazing, Titus! Your time, effort and dedication definitely weren't missed or wasted. Can't wait to see what's next.",
    highlight: "Your time, effort and dedication",
  },
  {
    name: "Daryl Duckmanton",
    role: "Senior Developer, Tabcorp",
    theme: "easy",
    size: "s",
    quote:
      "Amazing. I would say I know who to call if I need a video done, but by the time this gets around you'll be way out of my price range.",
    highlight: "I know who to call if I need a video done",
  },
];

const feature = {
  quote:
    "They consistently pushed the boundaries, introducing creative and cutting-edge solutions to the table.",
  summary:
    "Black Iris Films helped the client improve their website, reviews and social engagement, delivering videos plus a music library, voice-over recordings and stock footage with responsive, timely delivery throughout.",
  scores: [
    ["Quality", "5.0"],
    ["Schedule", "5.0"],
    ["Cost", "5.0"],
    ["Willing to refer", "5.0"],
  ],
};

export function InTheirWords() {
  const [activeTheme, setActiveTheme] = useState<ThemeKey>("all");

  const filteredTestimonials = useMemo(
    () =>
      activeTheme === "all"
        ? testimonials
        : testimonials.filter((item) => item.theme === activeTheme),
    [activeTheme],
  );

  const counts = useMemo(() => {
    const values: Record<ThemeKey, number> = {
      all: testimonials.length,
      creativity: 0,
      storytelling: 0,
      professionalism: 0,
      results: 0,
      easy: 0,
    };

    testimonials.forEach((item) => {
      values[item.theme] += 1;
    });

    return values;
  }, []);

  return (
    <section className="inwords-section" aria-labelledby="inwords-heading">
      <div className="inwords-wrap">
        <header className="inwords-intro">
          <div>
            <p className="inwords-eyebrow">In their words</p>
            <h2 id="inwords-heading" className="inwords-title">
              Every project, <em>brought into focus.</em>
            </h2>
            <div className="inwords-hint">
              <IrisIcon open size={38} />
              Hover a lens to open the aperture and pull the words sharp.
            </div>
          </div>
          <p className="inwords-sub">
            A few hundred edits in, this is what clients and collaborators say
            about working with Black Iris Films. Grouped by what they noticed
            most.
          </p>
        </header>

        <div className="inwords-filters" aria-label="Testimonial themes">
          {themes.map((theme) => (
            <button
              key={theme.key}
              type="button"
              className="inwords-pill"
              aria-pressed={activeTheme === theme.key}
              onClick={() => setActiveTheme(theme.key)}
            >
              {theme.label}
              <span>{counts[theme.key]}</span>
            </button>
          ))}
        </div>

        <article className="inwords-feature">
          <div className="inwords-feature-lens">
            <IrisIcon open size={128} />
            <div className="inwords-score">
              5.0
              <span>Verified review</span>
            </div>
          </div>
          <div>
            <blockquote>&ldquo;{feature.quote}&rdquo;</blockquote>
            <p>{feature.summary}</p>
            <div className="inwords-scores">
              {feature.scores.map(([label, value]) => (
                <div key={label}>
                  {label}
                  <b>{value}</b>
                </div>
              ))}
            </div>
          </div>
        </article>

        <div className="inwords-grid">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard key={`${testimonial.name}-${testimonial.role}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={`inwords-card inwords-${testimonial.size} ${
        open ? "is-open" : ""
      }`}
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((value) => !value)}
    >
      <div className="inwords-card-head">
        <IrisIcon open={open} size={46} />
        <div className="inwords-who">
          <h3>{testimonial.name}</h3>
          <p>{testimonial.role}</p>
        </div>
        <span className="inwords-fstop">{open ? "f/1.4" : "f/16"}</span>
      </div>
      <blockquote>
        &ldquo;
        <HighlightedQuote
          quote={testimonial.quote}
          highlight={testimonial.highlight}
        />
        &rdquo;
      </blockquote>
    </article>
  );
}

function HighlightedQuote({
  quote,
  highlight,
}: {
  quote: string;
  highlight: string;
}) {
  const start = quote.indexOf(highlight);

  if (start === -1) {
    return <>{quote}</>;
  }

  const before = quote.slice(0, start);
  const after = quote.slice(start + highlight.length);

  return (
    <>
      {before}
      <span className="inwords-focus">{highlight}</span>
      {after}
    </>
  );
}

function IrisIcon({ open, size }: { open: boolean; size: number }) {
  const clipId = useId().replace(/:/g, "");
  const blades = 7;
  const angle = open ? 60 : -7;
  const groupSpin = open ? -18 : 0;
  const path =
    "M 50 0 A 50 50 0 0 0 -11.13 -48.75 C -38.97 -31.27, -16.44 -12.41, -0.45 -2.00 Z";

  return (
    <svg
      className={`inwords-iris ${open ? "is-open" : ""}`}
      viewBox="-52 -52 104 104"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <circle r="49.5" />
        </clipPath>
      </defs>
      <circle r="50.5" className="inwords-iris-ring" />
      <circle r="45" className="inwords-iris-light" />
      <g clipPath={`url(#${clipId})`} transform={`rotate(${groupSpin})`}>
        {Array.from({ length: blades }).map((_, index) => (
          <g key={index} transform={`rotate(${(360 / blades) * index})`}>
            <path
              d={path}
              className="inwords-iris-blade"
              transform={`rotate(${angle} 50 0)`}
            />
          </g>
        ))}
      </g>
      <circle r="50.5" className="inwords-iris-edge" />
    </svg>
  );
}

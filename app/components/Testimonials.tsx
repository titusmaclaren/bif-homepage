// Testimonials section: opens with the "Working with Black Iris Films |
// What our Clients had to Say" reel (Vimeo 943964025) embedded inline as the
// hero of the section, followed by the nine quote cards pulled from the
// Inffuse Praise app (Wix project proj_I1bby8XndKYpeafQfJSlm).

type Testimonial = {
  rating: number;
  text: string;
  name: string;
  jobTitle: string;
  company: string;
  image: string;
  link?: string;
};

const testimonials: Testimonial[] = [
  {
    rating: 5,
    text: "Such a pleasure working with Black Iris Films. Super professional, great attention to detail and extremely creative. Highly recommended and would definitely use them again.",
    name: "Catherine Allison",
    jobTitle: "Director of Marketing",
    company: "ACS",
    image: "https://static.wixstatic.com/media/a2a11d_8362c3cc5ff040518ca46f9641f2e702~mv2.jpeg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_8362c3cc5ff040518ca46f9641f2e702~mv2.jpeg",
  },
  {
    rating: 5,
    text: "I would recommend Black Iris Films unambiguously. This is a group of accessible, really polished professionals that have taken all of our video content to the next level and what we’ve been able to achieve with that result has been just fantastic.",
    name: "Ian Lowe",
    jobTitle: "CEO",
    company: "Dacxi Group",
    image: "https://static.wixstatic.com/media/a2a11d_0073e219688f4de3a57a8d4ad04f73e3~mv2.jpg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_0073e219688f4de3a57a8d4ad04f73e3~mv2.jpg",
  },
  {
    rating: 5,
    text: "I worked with Titus on a shoot for a big launch event. He managed the process with professional ease. We met beforehand, discussed the vision for the film and scouted out the space and, on the night, he captured exciting footage and engaging interviews through warm interactions with the guests. The end result was a dynamic video that was so on-message it could have been produced internally.",
    name: "Scott Newton",
    jobTitle: "Marketing Director",
    company: "Game Plus",
    image: "https://static.wixstatic.com/media/a2a11d_4a1ce52240a342c6b163fcba94fd532b~mv2.jpeg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_4a1ce52240a342c6b163fcba94fd532b~mv2.jpeg",
  },
  {
    rating: 5,
    text: "Black Iris Films are very energetic and bring an excitement to the projects we work on. They always have new ideas and are always thinking of new ways and creative of achieving goals. I like working with Black Iris Films because they’re dependable to work until the job is done, even when deadlines are unrealistic.",
    name: "Marlon Marescia",
    jobTitle: "Facebook Ads Strategist",
    company: "Sales Driven",
    image: "https://static.wixstatic.com/media/a2a11d_fc338e0ac17e49af8a93a0c8f1bf7a55~mv2.jpeg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_fc338e0ac17e49af8a93a0c8f1bf7a55~mv2.jpeg",
  },
  {
    rating: 5,
    text: "Working with Black Iris Films for our IllumiaSkin 7+1 LED Face Mask video was a game-changer. They expertly brought our vision to life, building and lighting a set inside a studio, which resulted in a visually stunning video and photo portfolio. With just a four-person crew, they combined live action, projection, and graphics to perfectly capture our product’s essence. Highly recommend for their unmatched creativity and professionalism. Huge thanks to the Black Iris Films team!",
    name: "Jess Smith",
    jobTitle: "Chief Marketing Officer",
    company: "Ergo Health",
    image: "https://static.wixstatic.com/media/a2a11d_6e50de6a55414d09bc5517a836042ff4~mv2.jpeg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_6e50de6a55414d09bc5517a836042ff4~mv2.jpeg",
  },
  {
    rating: 5,
    text: "Discovered Black Iris Films online and downloaded their insightful report, which led us to choose them as our principal video supplier. Their team brilliantly crafted a series of videos and social media ads for us, yielding excellent returns. They blend reliability, professionalism, and creativity seamlessly. Highly recommend Black Iris Films for impactful video production!",
    name: "Leon Matti",
    jobTitle: "Founder",
    company: "Smart Makeover",
    image: "https://static.wixstatic.com/media/a2a11d_5057b54b50e24496a9250c8b5d3b5a1b~mv2.jpg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_5057b54b50e24496a9250c8b5d3b5a1b~mv2.jpg",
  },
  {
    rating: 5,
    text: "Black Iris Films have a well-honed professionalism in storytelling through film and video. They have a firm grip on the visual narrative and excel at their ability to tailor content to a target audience. The collective at Black Iris Films are enthusiastic, positive and hard-working.",
    name: "Will Aslett",
    jobTitle: "Development Executive",
    company: "Freelance",
    image: "https://static.wixstatic.com/media/a2a11d_bc4e8ccb07cc4dd596f77cd89a6f5af0~mv2.jpg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_bc4e8ccb07cc4dd596f77cd89a6f5af0~mv2.jpg",
  },
  {
    rating: 5,
    text: "Black Iris Films are professional, friendly and thorough. I needed someone who was able to film and produce an interactive video series and Titus delivered exceptional content on time and within budget.",
    name: "Sarah Taylor",
    jobTitle: "Owner / Director",
    company: "Meetings Into Minutes",
    image: "https://static.wixstatic.com/media/a2a11d_bd0c317419aa45f2aaf662033c85597a~mv2.jpg/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_bd0c317419aa45f2aaf662033c85597a~mv2.jpg",
  },
  {
    rating: 5,
    text: "Black Iris Films is a video production company that consists of experienced filmmakers. They use ahead-of-curve marketing strategies along with original production to deliver the message of your brand and attract new customers to your products. These experts can create stunning and creative videos to meet client’s vision. Such content will help any business stand out from the crowd.",
    name: "Eva Williams",
    jobTitle: "Journalist",
    company: "FixThePhoto.com",
    image: "https://static.wixstatic.com/media/a2a11d_3ec815283fe140b292cde5f503ad4c4b~mv2.png/v1/fill/w_160,h_160,q_85,enc_avif,quality_auto/a2a11d_3ec815283fe140b292cde5f503ad4c4b~mv2.png",
    link: "https://fixthephoto.com/black-iris-films-review.html",
  },
];

const REEL_VIMEO_ID = "943964025";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
          className={i < rating ? "text-mint" : "text-fog"}
          aria-hidden
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t }: { t: Testimonial }) {
  const inner = (
    <div className="bg-off-white border border-fog/60 rounded-2xl p-7 md:p-8 break-inside-avoid mb-5 md:mb-6 transition-colors hover:border-fog">
      <Stars rating={t.rating} />
      <p className="mt-5 text-navy text-[15px] leading-relaxed">“{t.text}”</p>
      <div className="mt-7 pt-5 border-t border-fog/60 flex items-center gap-3.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.image}
          alt={t.name}
          className="w-11 h-11 rounded-full object-cover bg-fog/40 shrink-0"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <div className="text-navy font-bold text-[14px] leading-tight truncate">
            {t.name}
          </div>
          <div className="text-slate text-[12.5px] mt-0.5 leading-tight truncate">
            {t.jobTitle}
            {t.company ? <span className="text-slate/70">, {t.company}</span> : null}
          </div>
        </div>
        {t.link && (
          <span
            className="text-mint text-[10px] uppercase tracking-[0.16em] font-bold inline-flex items-center gap-1 whitespace-nowrap"
            aria-hidden
          >
            Read review
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </span>
        )}
      </div>
    </div>
  );

  if (t.link) {
    return (
      <a
        href={t.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={`Read the full review by ${t.name}, ${t.company}`}
      >
        {inner}
      </a>
    );
  }
  return inner;
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-bold mb-5">
            What people say
          </p>
          <h2 className="font-bold text-navy text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Trusted by brands worldwide.
          </h2>
        </div>

        {/* Hero reel: the "What our Clients had to Say" video, embedded inline. */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-fog/60 bg-navy-midnight shadow-xl">
            <iframe
              src={`https://player.vimeo.com/video/${REEL_VIMEO_ID}?title=0&byline=0&portrait=0&color=61B383&dnt=1`}
              title="Working with Black Iris Films: What our clients had to say"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
          <p className="text-center text-slate text-[13px] mt-4 italic">
            Two minutes with the clients we&apos;ve built films for, on what working together was actually like.
          </p>
        </div>

        {/* Quote grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 md:gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://quiz.blackirisfilms.com/"
            className="inline-flex items-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-7 py-4 text-[13px] font-bold uppercase tracking-wider text-white transition-colors"
          >
            Get an estimate in 1-min
          </a>
        </div>
      </div>
    </section>
  );
}

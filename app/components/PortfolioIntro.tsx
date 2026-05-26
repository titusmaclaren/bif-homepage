const thumbs = [
  "https://static.wixstatic.com/media/a2a11d_3e4c2b7cc3cd4a01b870fa5e42b4169c~mv2.jpg/v1/fill/w_639,h_360,fp_0.64_0.45,q_90,enc_avif,quality_auto/a2a11d_3e4c2b7cc3cd4a01b870fa5e42b4169c~mv2.jpg",
  "https://static.wixstatic.com/media/a2a11d_72b71c09827e4b77b549b9528e418867~mv2.jpg/v1/fill/w_640,h_360,fp_0.5_0.39,q_90,enc_avif,quality_auto/a2a11d_72b71c09827e4b77b549b9528e418867~mv2.jpg",
  "https://static.wixstatic.com/media/a2a11d_5bf50a7c15f64e3b989846e5b591a9d3~mv2.jpg/v1/fill/w_632,h_356,fp_0.36_0.3,q_90,enc_avif,quality_auto/a2a11d_5bf50a7c15f64e3b989846e5b591a9d3~mv2.jpg",
  "https://static.wixstatic.com/media/a2a11d_5d24f983e0e14d4495ec45478724d2eb~mv2.jpg/v1/fill/w_632,h_356,fp_0.6_0.31,q_90,enc_avif,quality_auto/a2a11d_5d24f983e0e14d4495ec45478724d2eb~mv2.jpg",
  "https://static.wixstatic.com/media/a2a11d_9bbe0636b2f84cab82f668122e3b26d7~mv2.jpg/v1/fill/w_632,h_356,fp_0.68_0.3,q_90,enc_avif,quality_auto/a2a11d_9bbe0636b2f84cab82f668122e3b26d7~mv2.jpg",
  "https://static.wixstatic.com/media/a2a11d_ab86965a0cfd4d06a36a1c407e3b0c6a~mv2.jpg/v1/fill/w_600,h_338,fp_0.42_0.23,q_90,enc_avif,quality_auto/a2a11d_ab86965a0cfd4d06a36a1c407e3b0c6a~mv2.jpg",
];

export function PortfolioIntro() {
  return (
    <section id="portfolio" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="max-w-4xl mb-12">
          <h2 className="font-light text-navy text-3xl md:text-4xl leading-[1.15] tracking-tight">
            Marketing videos, social media videos, passion projects, corporate videos & TV Commercials
          </h2>
          <p className="mt-7 text-lg text-slate font-light leading-relaxed">
            We use video marketing science to cut through the noise and connect with your
            customers. You focus on what you do best, we&apos;ll make sure people get why it
            matters. Click the thumbnails below to see our work (more available on request).
          </p>
          <div className="mt-8">
            <a
              href="https://quiz.blackirisfilms.com/"
              className="inline-flex items-center gap-2.5 rounded-sm bg-mint hover:bg-mint-bright px-7 py-4 text-[13px] font-semibold uppercase tracking-wider text-white transition-colors"
            >
              Get an estimate in 1-min
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {thumbs.map((t, i) => (
            <a
              key={i}
              href="https://www.blackirisfilms.com/work"
              className="group relative aspect-[16/9] rounded-lg overflow-hidden bg-fog/40 border border-fog/60"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity h-14 w-14 rounded-full bg-white/90 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#29334D">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Real client logos pulled from the BIF Wix logos gallery.
const logoBase = (id: string) =>
  `https://static.wixstatic.com/media/${id}/v1/fit/w_240,h_240,q_90,enc_avif,quality_auto/${id}`;

const logoIds = [
  "a2a11d_7c1ef1b67917431fba2b701d0e4de99f~mv2.png",
  "a2a11d_85bf428cf9644fc08155f10d6d391781~mv2.png",
  "a2a11d_010a5517d770400eac46c837e5d22b80~mv2.png",
  "a2a11d_0983d6e674f747929af1fe782d330184~mv2.png",
  "a2a11d_0a6b39e45f2a4a29958918c9d87c6a46~mv2.png",
  "a2a11d_c740ef8502ff4977b7cf7a1748cb2be0~mv2.png",
  "a2a11d_47785c83baaf40d5b66f50885be58e4c~mv2.png",
  "a2a11d_90eb2306ffe344e5ac09075298d78b9c~mv2.png",
  "a2a11d_943505bac67b4b4896db99ae830d5562~mv2.png",
  "a2a11d_1484aad847004412bb32b0a397cbf05f~mv2.png",
  "a2a11d_8b88894d81d94044a62a8abb128a2d69~mv2.png",
  "a2a11d_5e176653a98249ba996d5411578be9de~mv2.png",
  "a2a11d_80528256e6004ee69c80ff819aff90da~mv2.png",
  "a2a11d_92cb3ce0b0fa4e1cbc32a60808a0025f~mv2.png",
  "a2a11d_9d771740bb14488db9fda6106cbd16d3~mv2.png",
  "a2a11d_f35cb6752b8948709c0628796de09b91~mv2.png",
  "a2a11d_9f42bc16cc1b41cd8cf400205a3bd195~mv2.jpg",
  "a2a11d_7cfcafd25c004e749ba4171f0c83225a~mv2.png",
];

const logos = logoIds.map(logoBase);

export function ClientsStrip() {
  return (
    <section id="clients" className="bg-off-white border-y border-fog/60 py-8 md:py-10 overflow-hidden">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10 mb-6">
        <p className="text-center text-slate text-[13px] md:text-sm font-light tracking-wide">
          Trusted by 30+ industries | 15+ years experience | Fixed price, every time
        </p>
      </div>

      <div className="relative" aria-label="Black Iris Films client logos">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
          style={{ background: "linear-gradient(to right, #FAFAF8, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
          style={{ background: "linear-gradient(to left, #FAFAF8, transparent)" }}
        />

        <div className="flex w-max animate-marquee">
          {[...logos, ...logos].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              aria-hidden={i >= logos.length}
              className="h-10 md:h-12 w-auto object-contain shrink-0 mx-6 md:mx-8"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <a
          href="https://www.blackirisfilms.com/get-a-quote#testimonials"
          className="text-[12px] uppercase tracking-[0.18em] text-mint hover:text-mint-bright font-medium"
        >
          What else our clients say
        </a>
      </div>
    </section>
  );
}

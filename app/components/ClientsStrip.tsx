const clientLogos = [
  "https://static.wixstatic.com/media/a2a11d_7c1ef1b67917431fba2b701d0e4de99f~mv2.png/v1/fit/w_210,h_210,q_90,enc_avif,quality_auto/a2a11d_7c1ef1b67917431fba2b701d0e4de99f~mv2.png",
  "https://static.wixstatic.com/media/a2a11d_85bf428cf9644fc08155f10d6d391781~mv2.png/v1/fit/w_210,h_210,q_90,enc_avif,quality_auto/a2a11d_85bf428cf9644fc08155f10d6d391781~mv2.png",
  "https://static.wixstatic.com/media/a2a11d_010a5517d770400eac46c837e5d22b80~mv2.png/v1/fit/w_210,h_210,q_90,enc_avif,quality_auto/a2a11d_010a5517d770400eac46c837e5d22b80~mv2.png",
  "https://static.wixstatic.com/media/a2a11d_0983d6e674f747929af1fe782d330184~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/a2a11d_0983d6e674f747929af1fe782d330184~mv2.png",
  "https://static.wixstatic.com/media/a2a11d_0a6b39e45f2a4a29958918c9d87c6a46~mv2.png/v1/fit/w_200,h_200,q_90,enc_avif,quality_auto/a2a11d_0a6b39e45f2a4a29958918c9d87c6a46~mv2.png",
];

export function ClientsStrip() {
  return (
    <section id="clients" className="bg-off-white border-y border-fog/60 py-14">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <p className="text-center text-slate text-[15px] md:text-base font-light tracking-wide">
          Trusted by 30+ industries · 15+ years experience · Fixed price, every time
        </p>

        <div className="mt-10 grid grid-cols-3 md:grid-cols-5 gap-x-10 gap-y-8 items-center">
          {clientLogos.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt=""
              className="h-12 md:h-14 w-auto object-contain mx-auto opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all"
            />
          ))}
        </div>

        <p className="text-center mt-10">
          <a
            href="https://www.blackirisfilms.com/get-a-quote#testimonials"
            className="text-[12px] uppercase tracking-[0.18em] text-mint hover:text-mint-bright font-medium"
          >
            What else our clients say
          </a>
        </p>
      </div>
    </section>
  );
}

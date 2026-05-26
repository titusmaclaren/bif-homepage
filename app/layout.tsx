import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = localFont({
  src: [
    { path: "./fonts/Montserrat-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/Montserrat-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Montserrat-Italic.otf", weight: "400", style: "italic" },
    { path: "./fonts/Montserrat-Medium.otf", weight: "500", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blackirisfilms.com"),
  title: {
    default: "Black Iris Films. Emotion-led video production in Sydney.",
    template: "%s · Black Iris Films",
  },
  description:
    "Fixed-price emotion-led video production for Australian SMEs in finance, tech and higher education. Sydney-based. 10-day turnaround.",
  keywords: [
    "video production sydney",
    "brand film",
    "corporate video",
    "fintech video",
    "higher education video",
    "explainer video",
    "Black Iris Films",
  ],
  openGraph: {
    title: "Black Iris Films. Emotion-led video production in Sydney.",
    description:
      "Fixed-price emotion-led video production for Australian SMEs in finance, tech and higher education.",
    url: "https://blackirisfilms.com",
    siteName: "Black Iris Films",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Iris Films",
    description:
      "Emotion-led video production for finance, tech and higher education.",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-navy">
        {children}
      </body>
    </html>
  );
}

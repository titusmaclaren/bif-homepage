import type { Metadata } from "next";
import { Estimator } from "@/components/Estimator";
import { Header } from "@/components/Header";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Video Quote Estimator",
  description:
    "Get an indicative Sydney video production estimate in under a minute for brand films, explainers, social videos and corporate content.",
  path: "/estimate",
});

export default function EstimatePage() {
  return (
    <div className="estimator-shell min-h-screen flex flex-col bg-off-white text-text-primary">
      <Header />
      <Estimator />
    </div>
  );
}

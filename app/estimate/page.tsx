import type { Metadata } from "next";
import { Estimator } from "@/components/Estimator";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Video Quote Estimator",
  description:
    "Get an indicative video production estimate in under a minute.",
  alternates: { canonical: "/estimate" },
};

export default function EstimatePage() {
  return (
    <div className="estimator-shell min-h-screen flex flex-col bg-off-white text-text-primary">
      <Header />
      <Estimator />
    </div>
  );
}

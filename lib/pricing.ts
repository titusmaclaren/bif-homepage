/**
 * Pricing version stamp and the shape of what Claude returns.
 * Also exports a fallback mock estimate used when the Claude call fails or
 * during local dev if no API key is set.
 */

export const PRICING_VERSION = "2026.04";

export type EstimateResponse = {
  scope_band: string;
  production_low: number;
  production_high: number;
  post_production_low: number;
  post_production_high: number;
  pre_production_low: number;
  pre_production_high: number;
  total_low: number;
  total_high: number;
  rationale: string;
  production_description: string;
  post_production_description: string;
  pre_production_description: string | null;
  escalate: boolean;
  escalation_reason: string | null;
  pricing_version?: string;
  fallback?: boolean;
};

export const FALLBACK_ESTIMATE: EstimateResponse = {
  scope_band: "Brand Hero Film",
  production_low: 8500,
  production_high: 11000,
  post_production_low: 5500,
  post_production_high: 7500,
  pre_production_low: 0,
  pre_production_high: 0,
  total_low: 14000,
  total_high: 18500,
  rationale:
    "A cinematic brand piece anchored on your founder or hero product, designed to earn a permanent place on your homepage.",
  production_description:
    "An on-site shoot capturing your founder in a considered, emotion-led style, with B-roll of the team and workspace to deepen the story. A small focused crew.",
  post_production_description:
    "A cinematic edit with licensed music, colour grade and sound mix. Three social cutdowns optimised for LinkedIn, five stills pulled from the footage, and lower thirds.",
  pre_production_description: null,
  escalate: false,
  escalation_reason: null,
  pricing_version: PRICING_VERSION,
  fallback: true,
};

export const ESCALATION_ESTIMATE: EstimateResponse = {
  scope_band: "Escalation",
  production_low: 0,
  production_high: 0,
  post_production_low: 0,
  post_production_high: 0,
  pre_production_low: 0,
  pre_production_high: 0,
  total_low: 0,
  total_high: 0,
  rationale:
    "This project has enough moving parts that it deserves proper scoping. Book a call and we'll come back within one working day with a considered quote.",
  production_description: "",
  post_production_description: "",
  pre_production_description: null,
  escalate: true,
  escalation_reason: "Scope exceeds estimator confidence threshold.",
  pricing_version: PRICING_VERSION,
};

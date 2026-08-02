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

const ESTIMATE_TEXT_LIMITS = {
  scope_band: 120,
  rationale: 1200,
  description: 1200,
  escalation_reason: 600,
  pricing_version: 40,
};

const MAX_ESTIMATE_AMOUNT = 1_000_000;

export function normalizeEstimateResponse(
  value: unknown,
): EstimateResponse | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const input = value as Record<string, unknown>;
  const scopeBand = boundedString(
    input.scope_band,
    ESTIMATE_TEXT_LIMITS.scope_band,
  );
  const rationale = boundedString(
    input.rationale,
    ESTIMATE_TEXT_LIMITS.rationale,
  );
  const productionDescription = boundedString(
    input.production_description,
    ESTIMATE_TEXT_LIMITS.description,
  );
  const postProductionDescription = boundedString(
    input.post_production_description,
    ESTIMATE_TEXT_LIMITS.description,
  );
  const preProductionDescription = nullableBoundedString(
    input.pre_production_description,
    ESTIMATE_TEXT_LIMITS.description,
  );
  const escalationReason = nullableBoundedString(
    input.escalation_reason,
    ESTIMATE_TEXT_LIMITS.escalation_reason,
  );
  const pricingVersion = optionalBoundedString(
    input.pricing_version,
    ESTIMATE_TEXT_LIMITS.pricing_version,
  );
  const amounts = {
    production_low: estimateAmount(input.production_low),
    production_high: estimateAmount(input.production_high),
    post_production_low: estimateAmount(input.post_production_low),
    post_production_high: estimateAmount(input.post_production_high),
    pre_production_low: estimateAmount(input.pre_production_low),
    pre_production_high: estimateAmount(input.pre_production_high),
    total_low: estimateAmount(input.total_low),
    total_high: estimateAmount(input.total_high),
  };

  if (
    scopeBand === null ||
    rationale === null ||
    productionDescription === null ||
    postProductionDescription === null ||
    preProductionDescription === undefined ||
    escalationReason === undefined ||
    pricingVersion === null ||
    Object.values(amounts).some((amount) => amount === null) ||
    typeof input.escalate !== "boolean"
  ) {
    return null;
  }

  if (
    (amounts.production_low as number) > (amounts.production_high as number) ||
    (amounts.post_production_low as number) >
      (amounts.post_production_high as number) ||
    (amounts.pre_production_low as number) >
      (amounts.pre_production_high as number) ||
    (amounts.total_low as number) > (amounts.total_high as number)
  ) {
    return null;
  }

  return {
    scope_band: scopeBand,
    production_low: amounts.production_low as number,
    production_high: amounts.production_high as number,
    post_production_low: amounts.post_production_low as number,
    post_production_high: amounts.post_production_high as number,
    pre_production_low: amounts.pre_production_low as number,
    pre_production_high: amounts.pre_production_high as number,
    total_low: amounts.total_low as number,
    total_high: amounts.total_high as number,
    rationale,
    production_description: productionDescription,
    post_production_description: postProductionDescription,
    pre_production_description: preProductionDescription,
    escalate: input.escalate,
    escalation_reason: escalationReason,
    ...(pricingVersion ? { pricing_version: pricingVersion } : {}),
    ...(input.fallback === true ? { fallback: true } : {}),
  };
}

function boundedString(value: unknown, maxLength: number) {
  return typeof value === "string" && value.length <= maxLength ? value : null;
}

function optionalBoundedString(value: unknown, maxLength: number) {
  if (value === undefined) return undefined;
  return boundedString(value, maxLength);
}

function nullableBoundedString(value: unknown, maxLength: number) {
  if (value === null) return null;
  return boundedString(value, maxLength) ?? undefined;
}

function estimateAmount(value: unknown) {
  return typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= MAX_ESTIMATE_AMOUNT
    ? Math.round(value)
    : null;
}

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

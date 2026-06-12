/**
 * Quiz data. Single source of truth for question order, copy, and options.
 * Voice scrubbed against brand guidelines banned-word list.
 */

export type ScopeOption = {
  label: string;
  description: string;
};

export type Question =
  | {
      id: "goal";
      kind: "single";
      title: string;
      subtitle: string;
      options: string[];
    }
  | {
      id: "videoType";
      kind: "video-type";
      title: string;
      subtitle: string;
      options: string[];
    }
  | {
      id: "length";
      kind: "single";
      title: string;
      subtitle: string;
      options: string[];
    }
  | {
      id: "vibe";
      kind: "single";
      title: string;
      subtitle: string;
      options: string[];
    }
  | {
      id: "scope";
      kind: "scope";
      title: string;
      subtitle: string;
      options: ScopeOption[];
      highlight: string;
    }
  | {
      id: "brief";
      kind: "textarea";
      title: string;
      subtitle: string;
      minLength: number;
    }
  | {
      id: "details";
      kind: "details";
      title: string;
      subtitle: string;
    };

export const GOAL_OPTIONS = [
  "Build brand awareness",
  "Drive leads or conversions",
  "Launch or promote something",
  "Educate or explain",
  "Internal comms or culture",
  "Something else",
] as const;

export const VIDEO_TYPE_OPTIONS = [
  "Founder or thought leadership film",
  "Brand film",
  "Testimonial or case study",
  "Product or explainer",
  "Event coverage",
  "Animated piece",
  "Not sure yet",
] as const;

export const LENGTH_OPTIONS = [
  "15 to 30 seconds",
  "30 to 60 seconds",
  "1 to 2 minutes",
  "2 to 5 minutes",
  "5+ minutes",
  "Not sure",
] as const;

export const VIBE_OPTIONS = [
  "Cinematic and emotional",
  "Clean and corporate",
  "Documentary and authentic",
  "Designed and motion-led",
  "Playful and energetic",
] as const;

export const SCOPE_OPTIONS: ScopeOption[] = [
  { label: "Single hero video", description: "One film, one purpose." },
  {
    label: "Hero plus social cutdowns",
    description: "A hero film with 3 or 4 social-optimised versions.",
  },
  {
    label: "Full content suite",
    description:
      "Hero, cutdowns, stills from the footage, light graphics. Best value per asset.",
  },
  { label: "Not sure yet", description: "We'll help you figure it out on the call." },
];

export const QUESTIONS: Question[] = [
  {
    id: "goal",
    kind: "single",
    title: "What are you trying to achieve?",
    subtitle:
      "Pick the closest match. We'll use it to shape an approach and give you an indicative range. Takes under a minute.",
    options: [...GOAL_OPTIONS],
  },
  // Step 2 is a derived recommendation screen, not a question. Handled in the Estimator.
  {
    id: "videoType",
    kind: "video-type",
    title: "What kind of video are you picturing?",
    subtitle: "This helps us understand the production style and scope.",
    options: [...VIDEO_TYPE_OPTIONS],
  },
  {
    id: "length",
    kind: "single",
    title: "How long should it be?",
    subtitle: "Roughly. We'll refine this together.",
    options: [...LENGTH_OPTIONS],
  },
  {
    id: "vibe",
    kind: "single",
    title: "What's the vibe?",
    subtitle:
      "The feel we're going for shapes everything from lighting to edit pacing.",
    options: [...VIBE_OPTIONS],
  },
  {
    id: "scope",
    kind: "scope",
    title: "One video, or a suite of assets?",
    subtitle:
      "Most clients now get more from one shoot. A hero film plus cutdowns, stills, and graphics gives you a content engine, not a one-off.",
    options: SCOPE_OPTIONS,
    highlight: "Full content suite",
  },
  {
    id: "brief",
    kind: "textarea",
    title: "Tell us about the project.",
    subtitle:
      "The more you share, the more accurate the estimate. Who's it for, where it will live, anything that makes this specific.",
    minLength: 10,
  },
  {
    id: "details",
    kind: "details",
    title: "Where can we send your estimate?",
    subtitle:
      "You'll get your estimate on the next screen, and someone from our team will be in touch within one working day.",
  },
];

/** Total visible steps counting the derived recommendation screen. */
export const TOTAL_STEPS = QUESTIONS.length + 1; // + 1 for recommendation step

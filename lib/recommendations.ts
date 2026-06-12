/**
 * Two-card recommendation matrix keyed by goal.
 * Shown on step 2 ("For you, we'd recommend...").
 * User can pick one of these two OR expand the full video-type list.
 */

import type { ThumbKey } from "./thumbnails";

export type Recommendation = {
  headline: string;
  description: string;
  thumbnailKey: ThumbKey;
  priceRange: string;
  mapsToVideoType: string; // must match a label in VIDEO_TYPE_OPTIONS
};

export const GOAL_RECOMMENDATIONS: Record<string, [Recommendation, Recommendation]> = {
  "Drive leads or conversions": [
    {
      headline: "Customer testimonial film",
      description:
        "Proof sells. A 90-second testimonial from a client whose story maps to your pitch does the heavy lifting.",
      thumbnailKey: "testimonial",
      priceRange: "A$9k to A$14k",
      mapsToVideoType: "Testimonial or case study",
    },
    {
      headline: "Product or explainer story",
      description:
        "A tight product narrative that leads with what it feels like to use the thing, then the mechanics.",
      thumbnailKey: "explainer",
      priceRange: "A$10k to A$16k",
      mapsToVideoType: "Product or explainer",
    },
  ],
  "Build brand awareness": [
    {
      headline: "Founder-led brand film",
      description:
        "Emotion-led hero film anchored in the founder's voice. Homepage, LinkedIn, investor decks.",
      thumbnailKey: "founder",
      priceRange: "A$14k to A$22k",
      mapsToVideoType: "Founder or thought leadership film",
    },
    {
      headline: "Cinematic brand film",
      description:
        "A considered 60 to 120 second film that lives on your homepage and travels well on LinkedIn and YouTube.",
      thumbnailKey: "brand",
      priceRange: "A$15k to A$25k",
      mapsToVideoType: "Brand film",
    },
  ],
  "Launch or promote something": [
    {
      headline: "Launch hero plus cutdowns",
      description:
        "A 60 to 90 second hero moment, plus 3 social cutdowns to sustain reach post-launch.",
      thumbnailKey: "brand",
      priceRange: "A$14k to A$22k",
      mapsToVideoType: "Brand film",
    },
    {
      headline: "Product story",
      description:
        "A feature-led narrative with considered shots of the product in context. Emotion first, specs second.",
      thumbnailKey: "explainer",
      priceRange: "A$10k to A$16k",
      mapsToVideoType: "Product or explainer",
    },
  ],
  "Educate or explain": [
    {
      headline: "Live-action explainer",
      description:
        "Talking head plus motion graphics over stock or shot footage. Warm, human, and clear.",
      thumbnailKey: "explainer",
      priceRange: "A$8k to A$14k",
      mapsToVideoType: "Product or explainer",
    },
    {
      headline: "Animated explainer",
      description:
        "Flat-fee animation for subjects that don't lend themselves to camera. Fast turnaround, high clarity.",
      thumbnailKey: "animated",
      priceRange: "A$6k to A$12k",
      mapsToVideoType: "Animated piece",
    },
  ],
  "Internal comms or culture": [
    {
      headline: "Team or culture film",
      description:
        "Documentary-style piece capturing real people and real moments. Feels authentic because it is.",
      thumbnailKey: "founder",
      priceRange: "A$9k to A$15k",
      mapsToVideoType: "Founder or thought leadership film",
    },
    {
      headline: "Event highlights",
      description:
        "Coverage of your offsite, all-hands, or launch day. Voxpops, B-roll, a single highlight film.",
      thumbnailKey: "event",
      priceRange: "A$5k to A$9k",
      mapsToVideoType: "Event coverage",
    },
  ],
  "Something else": [
    {
      headline: "Brand film",
      description:
        "If you're not sure, a brand film is usually the right starting place. It earns its keep across a lot of surfaces.",
      thumbnailKey: "brand",
      priceRange: "A$14k to A$22k",
      mapsToVideoType: "Brand film",
    },
    {
      headline: "Tell us more",
      description:
        "Skip ahead and give us the full brief. We'll shape a recommendation around your goal.",
      thumbnailKey: "generic",
      priceRange: "Scoped on the call",
      mapsToVideoType: "Not sure yet",
    },
  ],
};

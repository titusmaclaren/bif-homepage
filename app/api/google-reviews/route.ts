import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type GoogleReview = {
  reviewId?: string;
  reviewer?: {
    displayName?: string;
    profilePhotoUrl?: string;
  };
  starRating?: string;
  comment?: string;
  createTime?: string;
  updateTime?: string;
};

type GoogleReviewsResponse = {
  reviews?: GoogleReview[];
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
  error?: {
    message?: string;
    status?: string;
  };
};

type PublicReview = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date?: string;
  profilePhotoUrl?: string;
};

const STAR_RATINGS: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

function missingEnv() {
  const required = [
    "GOOGLE_BUSINESS_ACCOUNT_ID",
    "GOOGLE_BUSINESS_LOCATION_ID",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_REFRESH_TOKEN",
  ];

  return required.filter((key) => !process.env[key]);
}

function json(data: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

  return NextResponse.json(data, { ...init, headers });
}

export function OPTIONS() {
  return json({});
}

async function getAccessToken() {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN ?? "",
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  const data = (await response.json()) as GoogleTokenResponse;

  if (!response.ok || !data.access_token) {
    throw new Error(
      data.error_description || data.error || "Unable to authenticate with Google",
    );
  }

  return data.access_token;
}

function normalizeReview(review: GoogleReview, index: number): PublicReview {
  const rating = review.starRating ? STAR_RATINGS[review.starRating] ?? 0 : 0;

  return {
    id: review.reviewId || `${review.reviewer?.displayName || "review"}-${index}`,
    author: review.reviewer?.displayName || "Google reviewer",
    rating,
    text: review.comment || "",
    date: review.updateTime || review.createTime,
    profilePhotoUrl: review.reviewer?.profilePhotoUrl,
  };
}

export async function GET() {
  const missing = missingEnv();

  if (missing.length) {
    return json(
      {
        configured: false,
        reviews: [],
        message: "Visit our Google profile to read the latest client reviews.",
      },
      { status: 200 },
    );
  }

  try {
    const accessToken = await getAccessToken();
    const accountId = process.env.GOOGLE_BUSINESS_ACCOUNT_ID;
    const locationId = process.env.GOOGLE_BUSINESS_LOCATION_ID;
    const reviews: PublicReview[] = [];
    let averageRating = 0;
    let totalReviewCount = 0;
    let pageToken = "";
    let page = 0;

    do {
      const params = new URLSearchParams({
        pageSize: "50",
        orderBy: "updateTime desc",
      });
      if (pageToken) params.set("pageToken", pageToken);

      const response = await fetch(
        `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews?${params}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          next: { revalidate: 3600 },
        },
      );

      const data = (await response.json()) as GoogleReviewsResponse;

      if (!response.ok) {
        throw new Error(
          data.error?.message ||
            data.error?.status ||
            "Unable to load Google reviews",
        );
      }

      averageRating = data.averageRating ?? averageRating;
      totalReviewCount = data.totalReviewCount ?? totalReviewCount;
      reviews.push(...(data.reviews || []).map(normalizeReview));
      pageToken = data.nextPageToken || "";
      page += 1;
    } while (pageToken && page < 20);

    return json({
      configured: true,
      averageRating,
      totalReviewCount,
      reviews,
    });
  } catch (error) {
    return json(
      {
        configured: true,
        reviews: [],
        message:
          error instanceof Error
            ? error.message
            : "Unable to load Google reviews",
      },
      { status: 502 },
    );
  }
}

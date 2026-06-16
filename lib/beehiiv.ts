const BEEHIIV_API = "https://api.beehiiv.com/v2";

type SubscribeInput = {
  email: string;
  name?: string;
  source?: string;
};

type SubscribeResult =
  | { ok: true }
  | { ok: false; error: string; skipped?: boolean };

function optionalBoolean(value: string | undefined, fallback: boolean) {
  if (!value) return fallback;
  return value.toLowerCase() === "true";
}

export async function subscribeToNewsletter(
  input: SubscribeInput,
): Promise<SubscribeResult> {
  const apiKey = process.env.BEEHIIV_API_KEY?.trim();
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID?.trim();

  if (!apiKey || !publicationId) {
    console.warn(
      "[beehiiv] BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID not set; skipping newsletter signup.",
    );
    return {
      ok: false,
      error: "BEEHIIV_API_KEY/BEEHIIV_PUBLICATION_ID not set",
      skipped: true,
    };
  }

  const email = input.email.trim().toLowerCase();
  if (!email) {
    return { ok: false, error: "Empty email", skipped: true };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(
      `${BEEHIIV_API}/publications/${encodeURIComponent(
        publicationId,
      )}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: optionalBoolean(
            process.env.BEEHIIV_SEND_WELCOME_EMAIL,
            true,
          ),
          utm_source: input.source || "blackirisfilms.com",
          referring_site: "blackirisfilms.com",
        }),
        signal: controller.signal,
      },
    );
    clearTimeout(timer);

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("[beehiiv] non-2xx", response.status, text.slice(0, 400));
      return {
        ok: false,
        error: `Beehiiv ${response.status}: ${text.slice(0, 400)}`,
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("[beehiiv] subscription failed", err);
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

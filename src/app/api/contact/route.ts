import { NextResponse } from "next/server";
import { isAllowedContactOrigin } from "@/lib/deployment";
import { inquiryServices, inquirySources } from "@/lib/inquiry";
import { projects } from "@/lib/content";

export const runtime = "nodejs";
export const maxDuration = 20;
const attempts = new Map<string, { count: number; expires: number }>();
const allowedServices = ["", ...inquiryServices.map((s) => s.title)];
const fail = (message: string, status: number) =>
  NextResponse.json({ message }, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!isAllowedContactOrigin(origin, request.url))
    return fail("Užklausą pateikite svetainėje.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return fail("Netinkamas užklausos formatas.", 415);
  if (Number(request.headers.get("content-length") || 0) > 24000)
    return fail("Užklausa per didelė.", 413);

  let payload: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail("Tuščia užklausa.", 400);
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 24000) {
        await reader.cancel();
        return fail("Užklausa per didelė.", 413);
      }
      chunks.push(value);
    }
    payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!payload || typeof payload !== "object" || Array.isArray(payload))
      return fail("Netinkamas užklausos formatas.", 400);
  } catch {
    return fail("Netinkamas užklausos formatas.", 400);
  }

  const field = (name: string) =>
    typeof payload[name] === "string" ? (payload[name] as string).trim() : "";
  const name = field("name"),
    email = field("email"),
    phone = field("phone"),
    service = field("service"),
    message = field("message"),
    source = field("source") || "/",
    projectSlug = field("project");
  const project = projects.find((p) => p.slug === projectSlug);
  if (!inquirySources.includes(source) || (projectSlug && !project))
    return fail(
      "Patikrinkite užklausos informaciją ir bandykite dar kartą.",
      400,
    );
  if (field("website"))
    return fail("Užklausos priimti nepavyko. Susisiekite telefonu.", 422);
  if (name.length < 2 || name.length > 100 || /[\r\n]/.test(name))
    return fail("Įrašykite savo vardą (2–100 simbolių).", 400);
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return fail("Įrašykite galiojantį el. pašto adresą.", 400);
  if (phone.length > 30 || (phone && !/^[+\d\s().-]+$/.test(phone)))
    return fail("Patikrinkite telefono numerį.", 400);
  if (!allowedServices.includes(service))
    return fail("Pasirinkite paslaugą iš sąrašo.", 400);
  if (message.length < 10 || message.length > 5000)
    return fail("Aprašykite projektą (10–5000 simbolių).", 400);
  if (payload.consent !== "on")
    return fail(
      "Patvirtinkite, kad susipažinote su privatumo informacija.",
      400,
    );

  const apiKey = process.env.RESEND_API_KEY,
    from = process.env.CONTACT_FROM,
    to = process.env.CONTACT_TO;
  if (!apiKey || !from || !to)
    return fail(
      "Šiuo metu formos siuntimas nepasiekiamas. Jūsų žinutė neišsiųsta. Susisiekite telefonu +370 645 93982 arba el. paštu.",
      503,
    );

  // Best-effort per-process limit. At deployment, also enable rate limiting at the trusted edge.
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.expires < now) attempts.delete(key);
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const attempt = attempts.get(ip) || { count: 0, expires: now + 600000 };
  if (attempt.count >= 5)
    return fail(
      "Pateikėte kelias užklausas. Bandykite po 10 minučių arba skambinkite mums.",
      429,
    );
  if (attempts.size >= 10000 && !attempts.has(ip))
    return fail(
      "Šiuo metu gauname daug užklausų. Bandykite vėliau arba susisiekite telefonu.",
      429,
    );
  attempts.set(ip, { ...attempt, count: attempt.count + 1 });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Nauja užklausa: ${service || "Projektas"}`,
        text: `Vardas: ${name}\nEl. paštas: ${email}\nTelefonas: ${phone || "Nenurodytas"}\nPaslauga: ${service || "Nenurodyta"}\nPeržiūrėtas projektas: ${project?.title || "Nenurodytas"}\nUžklausos puslapis: ${source}\n\n${message}\n\nSutikimas susisiekti: patvirtintas svetainės formoje.`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      return fail(
        "Nepavyko išsiųsti užklausos. Bandykite dar kartą arba susisiekite telefonu.",
        502,
      );
    const result = await response.json();
    if (!result.id)
      return fail(
        "Nepavyko patvirtinti pristatymo. Susisiekite telefonu arba el. paštu.",
        502,
      );
    return NextResponse.json({ success: true });
  } catch {
    return fail(
      "Nepavyko patvirtinti užklausos siuntimo. Susisiekite telefonu arba el. paštu.",
      502,
    );
  }
}

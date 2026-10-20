import { NextResponse } from "next/server";
import { parseQuote, summarizeQuote, quoteRef, formatINR } from "@/lib/quote";

export const runtime = "nodejs";

/**
 * Saves every enquiry before the visitor is sent to WhatsApp, so no lead is lost
 * if WhatsApp doesn't open.
 *
 * Delivery: set LEAD_WEBHOOK_URL to any endpoint that accepts JSON, for example a
 * Google Apps Script web app that appends a row to a Google Sheet, a Zapier/Make
 * hook, or a Slack/Discord webhook. Without it, leads are written to the server log.
 */

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;

function rateLimited(ip: string) {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > MAX_PER_WINDOW;
}

const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });

    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    // Honeypot: real people never fill this hidden field
    if (clean(body.website)) return NextResponse.json({ ok: true });

    const quoteQuery = clean(body.quote, 300);
    const quote = parseQuote(Object.fromEntries(new URLSearchParams(quoteQuery)));
    const summary = summarizeQuote(quote);

    const lead = {
        receivedAt: new Date().toISOString(),
        source: clean(body.source, 40) || "website",
        ref: quoteQuery ? quoteRef(quote) : undefined,
        name: clean(body.name, 120),
        phone: clean(body.phone, 30),
        email: clean(body.email, 160),
        date: clean(body.date, 20),
        functions: clean(body.functions, 200),
        service: clean(body.service, 120),
        message: clean(body.message, 2000),
        package: summary.pkg?.name,
        addOns: summary.lines.map((l) => `${l.addOn.name}${l.label ? ` × ${l.label}` : ""}`).join(", "),
        total: quoteQuery ? formatINR(summary.total) : undefined,
        quoteUrl: quoteQuery ? `https://sindhustudio.com/build?${quoteQuery}` : undefined,
        page: req.headers.get("referer") ?? undefined,
    };

    const webhook = process.env.LEAD_WEBHOOK_URL;
    if (webhook) {
        try {
            await fetch(webhook, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(lead),
                signal: AbortSignal.timeout(5000),
            });
            console.info("[lead] delivered", lead.ref ?? lead.source);
        } catch (err) {
            // Delivery failed: keep the full lead in the log so it can be recovered
            console.error("[lead] webhook failed", err, JSON.stringify(lead));
        }
    } else {
        console.info("[lead]", JSON.stringify(lead));
    }

    return NextResponse.json({ ok: true, ref: lead.ref });
}

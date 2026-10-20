import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/business";

/**
 * AI search engines are explicitly welcome: for a local business, being recommended
 * by ChatGPT, Perplexity, Gemini and Copilot matters more than blocking training.
 */
const aiCrawlers = [
    "OAI-SearchBot",
    "ChatGPT-User",
    "GPTBot",
    "PerplexityBot",
    "Perplexity-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "Google-Extended",
    "Applebot-Extended",
    "Bingbot",
    "DuckAssistBot",
    "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: "*", allow: "/", disallow: ["/api/", "/build/card", "/keystatic"] },
            { userAgent: aiCrawlers, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow: ["/api/", "/keystatic"] },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}

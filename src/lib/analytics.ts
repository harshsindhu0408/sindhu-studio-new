type Gtag = (...args: unknown[]) => void;

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: Gtag;
    }
}

/** Push a GA4 event. Safe to call anywhere; a no-op on the server or before analytics loads. */
export function track(event: string, params: Record<string, string | number | boolean | undefined> = {}) {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === "function") {
        window.gtag("event", event, params);
    } else {
        window.dataLayer.push({ event, ...params });
    }
}

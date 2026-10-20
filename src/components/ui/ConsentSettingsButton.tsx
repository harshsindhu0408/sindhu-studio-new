"use client";

import { openConsentSettings } from "./ConsentBanner";

export function ConsentSettingsButton({ label = "Cookie settings" }: { label?: string }) {
    return (
        <button type="button" onClick={openConsentSettings} className="cursor-pointer underline-offset-2 hover:text-accent hover:underline">
            {label}
        </button>
    );
}

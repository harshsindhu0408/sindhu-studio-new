import { Suspense } from "react";
import { Planner } from "./Planner";
import { getAvailability } from "@/lib/content";
import { getDictionary, type Locale } from "@/i18n";

export async function PlannerPage({ locale }: { locale: Locale }) {
    const t = getDictionary(locale).planner;
    const availability = await getAvailability();
    return (
        <div className="pt-28 md:pt-36">
            <header className="container-custom mb-10 max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    {t.eyebrow}{" "}
                    {locale === "en" && (
                        <span lang="hi" className="font-hindi normal-case tracking-normal text-sindoor">
                            · शादी प्लानर
                        </span>
                    )}
                </p>
                <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">{t.title}</h1>
                <p className="mt-4 text-lg text-foreground-muted">{t.intro}</p>
            </header>
            <Suspense fallback={<div className="container-custom h-96 animate-pulse rounded-3xl bg-card" />}>
                <Planner locale={locale} availability={availability} />
            </Suspense>
        </div>
    );
}

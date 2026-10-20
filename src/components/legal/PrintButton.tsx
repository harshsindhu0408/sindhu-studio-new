"use client";

export function PrintButton({ children }: { children: React.ReactNode }) {
    return (
        <button type="button" onClick={() => window.print()} className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 hover:text-accent print:hidden">
            {children}
        </button>
    );
}

import type { Metadata } from "next";
import { business } from "@/data/business";
import { JsonLd, personSchema } from "@/lib/schema";

export const metadata: Metadata = {
    title: `About Us: Wedding Photographers in ${business.address.locality} since ${business.foundingYear}`,
    description: `${business.name} was founded in ${business.foundingYear} by ${business.founder.name}. Meet the team behind ${business.address.locality}'s wedding photography and films.`,
    alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={personSchema()} />
            {children}
        </>
    );
}

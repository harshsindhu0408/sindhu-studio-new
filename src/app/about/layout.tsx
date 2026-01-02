import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about Sindhu Studio's story, our passionate team, and the values that drive us to create timeless photography.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

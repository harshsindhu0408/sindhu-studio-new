import type { MetadataRoute } from "next";
import { business } from "@/data/business";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: business.name,
        short_name: business.name,
        description: business.description,
        start_url: "/",
        display: "standalone",
        background_color: "#14110F",
        theme_color: "#14110F",
        lang: "en-IN",
        categories: ["photography", "lifestyle"],
        icons: [
            { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
            { src: "/apple-icon", sizes: "180x180", type: "image/png" },
        ],
        shortcuts: [
            { name: "Build a quote", url: "/build" },
            { name: "Compare packages", url: "/packages" },
        ],
    };
}

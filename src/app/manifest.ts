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
            { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
            { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
            { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
        shortcuts: [
            { name: "Build a quote", url: "/build" },
            { name: "Compare packages", url: "/packages" },
        ],
    };
}

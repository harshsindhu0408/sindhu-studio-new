"use client";

import Link from "next/link";
import { ArrowUpRight, Diamond, Video, Camera, MonitorPlay, Infinity, Youtube, Baby, Gift, Sparkles, PlusCircle } from "lucide-react";
import { addOns, getDiscountPercentage, AddOn } from "@/lib/addons";
import { motion } from "framer-motion";
import { useState } from "react";

const iconMap: Record<string, React.ReactNode> = {
    "Drone Shoot": <Video className="h-6 w-6" />,
    "LED Screen (8x12)": <MonitorPlay className="h-6 w-6" />,
    "2 LED Screens (43 inches)": <MonitorPlay className="h-6 w-6" />,
    "Ring Ceremony": <Diamond className="h-6 w-6" />,
    "Candid Photography": <Camera className="h-6 w-6" />,
    "Cinematic Videography": <Video className="h-6 w-6" />,
    "Live Stream on YouTube": <Youtube className="h-6 w-6" />,
    "Pre-Wedding Shoot": <Infinity className="h-6 w-6" />,
    "Baby Shoot Programme": <Baby className="h-6 w-6" />,
    "Birthday Programme": <Gift className="h-6 w-6" />,
    "Kua Poojan": <Sparkles className="h-6 w-6" />,
};

const defaultIcon = <PlusCircle className="h-6 w-6" />;

export default function AddOnsPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-24 overflow-hidden relative">
            {/* Elegant Background Accents */}
            <div className="pointer-events-none absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-accent/5 blur-[120px]" />
            <div className="pointer-events-none absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-accent/5 blur-[120px]" />

            {/* Header */}
            <header className="container-custom mb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-accent flex items-center justify-center gap-3">
                        <span className="w-8 h-[1px] bg-accent/50" />
                        Curated Enhancements
                        <span className="w-8 h-[1px] bg-accent/50" />
                    </p>
                    <h1 className="font-display text-5xl font-light tracking-tight md:text-7xl lg:text-8xl">
                        A La Carte <span className="italic text-accent">Menu</span>
                    </h1>
                    <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground-muted">
                        Tailor your collection with our exclusive add-on services. Select the perfect enhancements to elevate your memories, offering premium quality at a special limited-time rate.
                    </p>
                </motion.div>
            </header>

            {/* Elegant List Layout */}
            <section className="container-custom max-w-5xl">
                <div className="flex flex-col gap-6">
                    {addOns.map((addon, index) => (
                        <AddonRow key={addon.name} addon={addon} index={index} />
                    ))}
                </div>
            </section>
        </div>
    );
}

function AddonRow({ addon, index }: { addon: AddOn; index: number }) {
    const [selectedOption, setSelectedOption] = useState(0);

    const price = addon.options ? addon.options[selectedOption].price : addon.price;
    const originalPrice = addon.options ? addon.options[selectedOption].originalPrice : addon.originalPrice;
    const discount = getDiscountPercentage(originalPrice, price);
    const bookingName = addon.options ? `${addon.options[selectedOption].label} ${addon.name}` : addon.name;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border/40 p-1 md:bg-transparent md:border-t md:border-b md:border-x-0 md:rounded-none md:p-0 transition-all hover:bg-card/50"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:py-10 md:px-4">

                <div className="flex items-start md:items-center gap-6 md:w-1/2">
                    <div className="hidden md:flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-background-secondary border border-border/50 text-foreground-muted group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500">
                        {iconMap[addon.name] || defaultIcon}
                    </div>
                    <div>
                        <div className="flex flex-col gap-1 mb-2">
                            <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight group-hover:text-accent transition-colors duration-300">
                                {addon.name}
                            </h3>
                            {addon.options && (
                                <div className="flex items-center gap-2 mt-2 bg-background-secondary p-1 rounded-full border border-border/50 w-max">
                                    {addon.options.map((opt, i) => (
                                        <button
                                            key={opt.label}
                                            onClick={() => setSelectedOption(i)}
                                            className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full transition-all ${selectedOption === i ? 'bg-accent text-white shadow-sm' : 'text-foreground-muted hover:text-foreground'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <p className="text-sm md:text-base leading-relaxed text-foreground-muted max-w-md mt-2">
                            {addon.description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-row md:flex-col items-end md:items-end justify-between md:justify-center gap-4 w-full md:w-auto">
                    <div className="flex flex-col md:items-end text-left md:text-right">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-sm font-medium text-foreground-muted/60 line-through">
                                ₹{originalPrice.toLocaleString("en-IN")}
                            </span>
                            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-500 border border-emerald-500/20 shadow-sm">
                                {discount}% OFF
                            </span>
                        </div>
                        <div className="font-display text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                            ₹{price.toLocaleString("en-IN")}
                        </div>
                    </div>

                    <Link
                        href={`/contact?addon=${encodeURIComponent(bookingName)}`}
                        className="group/btn relative overflow-hidden rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium flex items-center gap-2 transition-all hover:pr-5 hover:scale-105"
                    >
                        <span className="relative z-10 transition-transform group-hover/btn:-translate-x-1">Book</span>
                        <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        <div className="absolute inset-0 bg-accent translate-y-[100%] rounded-full transition-transform duration-300 group-hover/btn:translate-y-0" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

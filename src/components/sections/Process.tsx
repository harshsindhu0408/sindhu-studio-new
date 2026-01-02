"use client";

import { MessageSquare, Calendar, Camera, HeartHandshake } from "lucide-react";
import { SectionWrapper, StaggerContainer, StaggerItem } from "@/components/ui/SectionWrapper";

const steps = [
    {
        icon: MessageSquare,
        title: "Connect",
        description: "Tell us about your story. We'll discuss your vision and find the perfect package for your needs."
    },
    {
        icon: Calendar,
        title: "Plan",
        description: "We work with you to create a timeline, scout locations, and ensure every detail is prepared."
    },
    {
        icon: Camera,
        title: "Create",
        description: "On your big day, we blend into the background, capturing authentic moments as they unfold."
    },
    {
        icon: HeartHandshake,
        title: "Deliver",
        description: "We handcraft your images and films, delivering a timeless gallery you'll cherish forever."
    }
];

export function Process() {
    return (
        <section className="section-padding bg-background-secondary overflow-hidden">
            <div className="container-custom">
                <SectionWrapper className="mb-16 text-center">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        The Experience
                    </p>
                    <h2 className="font-display text-3xl font-medium md:text-5xl">
                        Your Journey With Us
                    </h2>
                </SectionWrapper>

                <StaggerContainer className="relative grid gap-12 md:grid-cols-4 md:gap-8" staggerDelay={0.2}>
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-8 hidden h-px w-full max-w-[80%] bg-border md:block md:left-[10%]" />

                    {steps.map((step, index) => (
                        <StaggerItem key={step.title} className="relative text-center">
                            <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-background border border-border shadow-sm z-10 transition-colors duration-300 hover:border-accent hover:text-accent">
                                <step.icon className="h-6 w-6" />
                                <div className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-accent text-[10px] font-bold text-white flex items-center justify-center">
                                    {index + 1}
                                </div>
                            </div>
                            <h3 className="mb-3 font-display text-xl font-medium">{step.title}</h3>
                            <p className="text-sm leading-relaxed text-foreground-muted">
                                {step.description}
                            </p>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { Award, Heart, Camera, Users } from "lucide-react";
import { SectionWrapper, StaggerContainer, StaggerItem } from "@/components/ui/SectionWrapper";

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    profileImage: string;
}

const team: TeamMember[] = [
    {
        name: "Krishan Sindhu",
        role: "Founder & Lead Photographer",
        bio: "With over 30 years of experience, Krishan founded Sindhu Studio with a vision to create timeless imagery that captures the essence of every moment.",
        profileImage: "",
    },
    {
        name: "Pawan Grewal",
        role: "Creative Director",
        bio: "Pawan brings artistic vision and creative direction to every shoot, ensuring each project tells a unique and compelling story.",
        profileImage: "",
    },
    {
        name: "Harsh Sindhu",
        role: "Post-Production Lead",
        bio: "Harsh leads our editing team, bringing each image to life with his signature style that balances artistry with authenticity.",
        profileImage: "",
    },
    {
        name: "Harsh Sindhu",
        role: "Post-Production Lead",
        bio: "Harsh leads our editing team, bringing each image to life with his signature style that balances artistry with authenticity.",
        profileImage: "",
    },
];


const milestones = [
    { year: "2000", title: "Founded", description: "Started with a passion and a single camera" },
    { year: "2004", title: "Studio Launch", description: "Opened our flagship studio in Rohtak" },
    { year: "2020", title: "500+ Weddings", description: "Celebrated covering our 500th wedding" },
    { year: "2024", title: "National Recognition", description: "Named among India's Top 10 Photography Studios" },
];

const values = [
    {
        icon: Heart,
        title: "Passion",
        description: "Every frame is shot with love and dedication to our craft.",
    },
    {
        icon: Camera,
        title: "Excellence",
        description: "We never compromise on quality, from equipment to editing.",
    },
    {
        icon: Users,
        title: "Connection",
        description: "Building genuine relationships with every client we serve.",
    },
    {
        icon: Award,
        title: "Innovation",
        description: "Constantly evolving our techniques and creative approach.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24">
            {/* Page Header */}
            <section className="section-padding pb-12">
                <div className="container-custom">
                    <SectionWrapper className="mx-auto max-w-3xl text-center">
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                            Our Story
                        </p>
                        <h1 className="font-display text-5xl font-medium md:text-6xl lg:text-7xl">
                            About Us
                        </h1>
                        <p className="mt-6 text-foreground-muted">
                            The story behind Sindhu Studio—a journey of passion, creativity,
                            and countless cherished moments.
                        </p>
                    </SectionWrapper>
                </div>
            </section>

            {/* Story Section */}
            <section className="section-padding bg-background-secondary">
                <div className="container-custom">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                        <SectionWrapper animation="fade-right">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-background to-accent/10" />
                                {/* Decorative elements */}
                                <div className="absolute -left-4 -top-4 h-24 w-24 border-l-2 border-t-2 border-accent" />
                                <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b-2 border-r-2 border-accent" />
                            </div>
                        </SectionWrapper>

                        <SectionWrapper animation="fade-left" delay={0.2}>
                            <div className="flex h-full flex-col justify-center">
                                <h2 className="font-display text-3xl font-medium md:text-4xl">
                                    Where Every Frame
                                    <br />
                                    <span className="italic text-accent">Tells a Story</span>
                                </h2>

                                <div className="mt-8 space-y-4 text-foreground-muted">
                                    <p>
                                        Sindhu Studio was born from a simple belief: that life&apos;s most
                                        precious moments deserve to be captured with artistry,
                                        authenticity, and heart.
                                    </p>
                                    <p>
                                        Founded in 2000 by Krishan Sindhu, what started as a
                                        one-person passion project has grown into one of Rohtak&apos;s
                                        most sought-after photography studios. But some things
                                        haven&apos;t changed—our commitment to excellence, our personal
                                        approach, and our genuine love for what we do.
                                    </p>
                                    <p>
                                        Today, our team of talented artists brings together diverse
                                        skills and perspectives, united by a shared vision: to
                                        create images that don&apos;t just document moments, but
                                        transform them into timeless treasures.
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center gap-4">
                                    <div className="h-px flex-1 bg-border" />
                                    <p className="font-display italic text-foreground-muted">
                                        — The Sindhu Family
                                    </p>
                                </div>
                            </div>
                        </SectionWrapper>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <SectionWrapper className="mb-12 text-center">
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                            What Drives Us
                        </p>
                        <h2 className="font-display text-3xl font-medium md:text-4xl">
                            Our Values
                        </h2>
                    </SectionWrapper>

                    <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
                        {values.map((value) => (
                            <StaggerItem key={value.title}>
                                <div className="group rounded-lg border border-border bg-card p-8 text-center transition-all duration-300 hover:border-accent/50">
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                                        <value.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-display text-xl font-medium">
                                        {value.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-foreground-muted">
                                        {value.description}
                                    </p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="section-padding bg-background-secondary">
                <div className="container-custom">
                    <SectionWrapper className="mb-12 text-center">
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                            Our Journey
                        </p>
                        <h2 className="font-display text-3xl font-medium md:text-4xl">
                            Milestones
                        </h2>
                    </SectionWrapper>

                    <div className="relative mx-auto max-w-4xl">
                        {/* Vertical line - Left on mobile, Center on Desktop */}
                        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent md:left-1/2 md:-translate-x-1/2" />

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <SectionWrapper
                                    key={milestone.year}
                                    animation="fade-up"
                                    delay={index * 0.1}
                                >
                                    <div className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                        }`}>
                                        {/* Timeline Dot */}
                                        <div className="absolute left-4 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-background ring-4 ring-background md:left-1/2">
                                            <div className="h-2 w-2 rounded-full bg-accent" />
                                        </div>

                                        {/* Spacer for layout balance on desktop */}
                                        <div className="hidden w-1/2 md:block" />

                                        {/* Content Card */}
                                        <div className="w-full pl-12 md:w-1/2 md:pl-0 md:px-8">
                                            <div className={`relative rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-accent/50 hover:shadow-md ${index % 2 === 0 ? "md:text-left" : "md:text-right"
                                                }`}>
                                                {/* Connecting Line (Desktop) */}
                                                <div className={`hidden md:block absolute top-1/2 h-px w-8 bg-accent/30 ${index % 2 === 0
                                                    ? "-right-8"
                                                    : "-left-8"
                                                    }`} />

                                                <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold tracking-wider text-accent selected-none">
                                                    {milestone.year}
                                                </span>
                                                <h3 className="mb-2 font-display text-xl font-medium">
                                                    {milestone.title}
                                                </h3>
                                                <p className="text-sm leading-relaxed text-foreground-muted">
                                                    {milestone.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </SectionWrapper>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <SectionWrapper className="mb-12 text-center">
                        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                            The Artists
                        </p>
                        <h2 className="font-display text-3xl font-medium md:text-4xl">
                            Meet Our Team
                        </h2>
                    </SectionWrapper>

                    <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
                        {team.map((member) => (
                            <StaggerItem key={member.name}>
                                <motion.div
                                    className="group text-center"
                                    whileHover={{ y: -8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Avatar placeholder */}
                                    <div className="relative mx-auto mb-6 aspect-square w-full max-w-[200px] overflow-hidden rounded-full">
                                        <div className="h-full w-full bg-gradient-to-br from-accent/30 via-background-secondary to-accent/10" />
                                        <div className="absolute inset-2 rounded-full border border-accent/20" />
                                    </div>

                                    <h3 className="font-display text-lg font-medium">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm text-accent">{member.role}</p>
                                    <p className="mt-3 text-sm text-foreground-muted">
                                        {member.bio}
                                    </p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>
        </div>
    );
}

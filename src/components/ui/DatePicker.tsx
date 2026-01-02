"use client";

import { useState, useEffect, useRef } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday,
    startOfWeek,
    endOfWeek
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DatePickerProps {
    selected?: Date;
    onSelect: (date: Date) => void;
    className?: string;
    placeholder?: string;
}

export function DatePicker({ selected, onSelect, className, placeholder = "Select date" }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth)),
        end: endOfWeek(endOfMonth(currentMonth))
    });

    const handleSelect = (date: Date) => {
        onSelect(date);
        setIsOpen(false);
    };

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            {/* Input Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex cursor-pointer items-center gap-3 border-b border-border bg-transparent py-3 transition-colors hover:border-accent",
                    isOpen && "border-accent",
                    !selected && "text-foreground-muted"
                )}
            >
                <CalendarIcon className="h-5 w-5 shrink-0 text-accent" />
                <span className={cn("flex-1 text-base", selected ? "text-foreground" : "text-foreground-muted")}>
                    {selected ? format(selected, "PPP") : placeholder}
                </span>
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full z-50 mt-2 w-[320px] rounded-xl border border-border bg-card p-4 shadow-xl ring-1 ring-black/5 dark:ring-white/10"
                    >
                        {/* Header */}
                        <div className="mb-4 flex items-center justify-between">
                            <button
                                onClick={(e) => { e.stopPropagation(); prevMonth(); }}
                                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent/10 hover:text-accent transition-colors"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <h3 className="font-display text-lg font-medium">
                                {format(currentMonth, "MMMM yyyy")}
                            </h3>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextMonth(); }}
                                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent/10 hover:text-accent transition-colors"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Weekdays */}
                        <div className="mb-2 grid grid-cols-7 text-center">
                            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                                <div key={d} className="text-xs font-medium uppercase text-foreground-muted">
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-1">
                            {days.map((day, i) => {
                                const isSelected = selected && isSameDay(day, selected);
                                const isCurrentMonth = isSameMonth(day, currentMonth);
                                const isTodayDate = isToday(day);

                                return (
                                    <button
                                        key={i}
                                        onClick={(e) => { e.stopPropagation(); handleSelect(day); }}
                                        className={cn(
                                            "flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-all",
                                            !isCurrentMonth && "text-foreground-muted/30 hover:text-foreground-muted",
                                            isCurrentMonth && "text-foreground hover:bg-accent/10 hover:text-accent",
                                            isSelected && "bg-accent text-white shadow-md hover:bg-accent hover:text-white",
                                            !isSelected && isTodayDate && "text-accent font-semibold ring-1 ring-accent inset-0"
                                        )}
                                    >
                                        {format(day, "d")}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  // Use target (page scroll) instead of container (internal scroll)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    // Outer wrapper - tall to create scroll distance
    <div
      ref={ref}
      className="relative"
      style={{ height: `${content.length * 100}vh` }}
    >
      {/* Sticky container - stays pinned at 100vh */}
      <div className="sticky top-0 h-screen w-full bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex justify-center gap-16 items-center">
            
            {/* Left side - text content that fades */}
            <div className="max-w-lg">
              {/* Header - always visible */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-10 bg-[#E31F25]" />
                  <span className="text-[#E31F25] text-[10px] font-semibold tracking-[0.3em] uppercase">O nas</span>
                </div>
              </div>
              
              {/* Content items - stacked, only active one visible */}
              <div className="relative min-h-[200px]">
                {content.map((item, index) => (
                  <motion.div
                    key={item.title + index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeCard === index ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={cn(
                      "absolute top-0 left-0 w-full",
                      activeCard === index ? "pointer-events-auto" : "pointer-events-none"
                    )}
                  >
                    <h2 className="text-3xl lg:text-4xl font-display font-semibold text-[#0A0A0A] leading-tight mb-6">
                      {item.title}
                    </h2>
                    <p className="text-base max-w-md text-[#525252] leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              {/* Progress indicator */}
              <div className="flex gap-2 mt-10">
                {content.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      activeCard === index 
                        ? "w-8 bg-[#E31F25]" 
                        : "w-2 bg-[#E5E5E5]"
                    )}
                  />
                ))}
              </div>
            </div>
            
            {/* Right side - visual content */}
            <div
              className={cn(
                "hidden h-80 w-96 overflow-hidden rounded-2xl shadow-xl lg:block",
                contentClassName,
              )}
            >
              {content.map((item, index) => (
                <motion.div
                  key={item.title + index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={cn(
                    "absolute inset-0 h-full w-full",
                    activeCard === index ? "pointer-events-auto" : "pointer-events-none"
                  )}
                >
                  {item.content ?? null}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

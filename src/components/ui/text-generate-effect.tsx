"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 0,
  staggerDelay = 0.15,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delay?: number;
  staggerDelay?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
          y: 0,
        },
        {
          duration: duration,
          delay: stagger(staggerDelay),
          ease: [0.16, 1, 0.3, 1],
        }
      );
    }, delay * 1000);
    
    return () => clearTimeout(timeout);
  }, [animate, delay, duration, filter, staggerDelay]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="inline-block opacity-0"
              style={{
                filter: filter ? "blur(8px)" : "none",
                transform: "translateY(20px)",
              }}
            >
              {word}
              {idx < wordsArray.length - 1 && <span>&nbsp;</span>}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn(className)}>
      {renderWords()}
    </div>
  );
};

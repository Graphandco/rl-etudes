"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import AppearFromSide from "@/components/ui/AppearFromSide";

const AUTO_SCROLL = true;
const SCROLL_INTERVAL = 5000; // ms

function normalizeImage(item) {
   if (!item) return null;
   if (item.url) return item;
   if (item.image?.url) return item.image;
   return null;
}

export function QuinconceImageGallery({ images, title, className }) {
   const normalized = images.map(normalizeImage).filter(Boolean);
   const imageCount = normalized.length;

   if (imageCount === 0) {
      return (
         <div
            className={cn(
               "flex w-full shrink-0 items-center justify-center rounded-lg bg-neutral-200 py-10 text-neutral-500 md:w-3/5",
               className,
            )}
         >
            Aucune image
         </div>
      );
   }

   if (imageCount === 1) {
      const img = normalized[0];
      return (
         <div
            className={cn(
               "w-full shrink-0 overflow-hidden rounded-lg md:w-3/5",
               className,
            )}
         >
            <Image
               src={img.url}
               alt={title}
               width={img.width || 1200}
               height={img.height || 800}
               sizes="(max-width: 768px) 100vw, 60vw"
               className="h-auto w-full rounded-lg"
            />
         </div>
      );
   }

   return (
      <QuinconceCarousel
         images={normalized}
         title={title}
         className={className}
      />
   );
}

function QuinconceCarousel({ images, title, className }) {
   const [index, setIndex] = useState(0);
   const [direction, setDirection] = useState(0);
   const [progressKey, setProgressKey] = useState(0);
   const [isPaused, setIsPaused] = useState(false);
   const intervalRef = useRef(null);
   const imageCount = images.length;

   const paginate = (newDirection) => {
      if (imageCount === 0) return;
      setDirection(newDirection);
      setIndex((prev) => (prev + newDirection + imageCount) % imageCount);
      setProgressKey((prev) => prev + 1);
   };

   useEffect(() => {
      if (!AUTO_SCROLL || isPaused || imageCount <= 1) {
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
         }
         return;
      }

      intervalRef.current = setInterval(() => {
         setIndex((prev) => (prev + 1) % imageCount);
         setDirection(1);
         setProgressKey((prev) => prev + 1);
      }, SCROLL_INTERVAL);

      return () => {
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
         }
      };
   }, [isPaused, imageCount]);

   const variants = {
      enter: (direction) => ({
         x: direction > 0 ? 50 : -50,
         opacity: 0,
      }),
      center: {
         x: 0,
         opacity: 1,
      },
      exit: (direction) => ({
         x: direction < 0 ? 50 : -50,
         opacity: 0,
      }),
   };

   const currentImg = images[index];

   const w = currentImg.width || 1200;
   const h = currentImg.height || 800;

   return (
      <div
         className={cn(
            "relative w-full overflow-hidden rounded-lg md:w-3/5",
            className,
         )}
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}
      >
         <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
               key={index}
               custom={direction}
               variants={variants}
               initial="enter"
               animate="center"
               exit="exit"
               transition={{
                  duration: 0.35,
                  ease: "easeInOut",
               }}
               className="w-full"
            >
               <Image
                  src={currentImg.url}
                  alt={`${title} - ${index + 1}`}
                  width={w}
                  height={h}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="h-auto w-full rounded-lg"
                  priority={index === 0}
               />
            </motion.div>
         </AnimatePresence>

         {AUTO_SCROLL && !isPaused && (
            <motion.div
               key={progressKey}
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{
                  duration: SCROLL_INTERVAL / 1000,
                  ease: "linear",
               }}
               className="absolute bottom-0 left-0 z-10 h-1 w-full bg-accent"
            />
         )}

         <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-4">
            <button
               type="button"
               onClick={() => paginate(-1)}
               className="pointer-events-auto rounded-full bg-accent/70 p-2 text-white transition hover:bg-accent"
               aria-label="Image précédente"
            >
               <ArrowLeft size={24} />
            </button>
            <button
               type="button"
               onClick={() => paginate(1)}
               className="pointer-events-auto rounded-full bg-accent/70 p-2 text-white transition hover:bg-accent"
               aria-label="Image suivante"
            >
               <ArrowRight size={24} />
            </button>
         </div>

         <div className="absolute bottom-2 right-4 z-20 rounded bg-accent/70 px-2 py-1 text-sm text-white">
            {index + 1} / {imageCount}
         </div>
      </div>
   );
}

export default function Quinconce({
   images = [],
   title,
   content,
   left,
   right,
   className,
   ...props
}) {
   const isLeft = left || !right;

   return (
      <AppearFromSide left={left} right={right}>
         <section
            className={cn(
               "wrapper my-10 md:my-20 flex flex-col gap-10 overflow-hidden md:items-start",
               isLeft ? "md:flex-row" : "md:flex-row-reverse",
               className,
            )}
            {...props}
         >
            <QuinconceImageGallery
               images={images}
               title={title}
               className="shrink-0"
            />
            <div className="space-y-4 w-full md:w-2/5">
               <h2 className="title-h2">{title}</h2>
               <div
                  dangerouslySetInnerHTML={{ __html: content }}
                  className="prose"
               />
            </div>
         </section>
      </AppearFromSide>
   );
}

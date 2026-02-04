"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function BlockAppear({
   children,
   animateOnScroll = true,
   delay = 0,
   stagger = 0.1,
   animationType = "slideUp", // slideUp, fade, scale, slideLeft, slideRight, blur, rotate, clip
   className,
   ...props
}) {
   const containerRef = useRef(null);
   const childrenRefs = useRef([]);

   const getAnimationProps = (type) => {
      switch (type) {
         case "fade":
            return {
               from: { opacity: 0 },
               to: { opacity: 1 },
            };
         case "scale":
            return {
               from: { opacity: 0, scale: 0.8 },
               to: { opacity: 1, scale: 1 },
            };
         case "slideLeft":
            return {
               from: { x: "-100%", opacity: 0 },
               to: { x: "0%", opacity: 1 },
            };
         case "slideRight":
            return {
               from: { x: "100%", opacity: 0 },
               to: { x: "0%", opacity: 1 },
            };
         case "blur":
            return {
               from: { opacity: 0, filter: "blur(5px)" },
               to: { opacity: 1, filter: "blur(0px)" },
            };
         case "rotate":
            return {
               from: { opacity: 0, rotation: -2, y: "10px" },
               to: { opacity: 1, rotation: 0, y: "0%" },
            };
         case "clip":
            return {
               from: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
               to: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
            };
         case "slideUp":
         default:
            return {
               from: { opacity: 0, y: "20px", filter: "blur(5px)" },
               to: { opacity: 1, y: "0%", filter: "blur(0px)" },
            };
      }
   };

   useGSAP(
      () => {
         if (!containerRef.current) return;

         // Récupérer tous les enfants directs
         const childrenElements = Array.from(containerRef.current.children);

         if (childrenElements.length === 0) return;

         childrenRefs.current = childrenElements;

         // Ajouter will-change pour optimiser les performances
         childrenElements.forEach((child) => {
            if (child instanceof HTMLElement) {
               child.classList.add("will-change-transform");
            }
         });

         const animProps = getAnimationProps(animationType);

         // Initialiser les éléments dans leur état de départ
         gsap.set(childrenElements, animProps.from);

         const animationProps = {
            ...animProps.to,
            duration: 1,
            stagger: stagger,
            ease: "power4.out",
            delay: delay,
         };

         if (animateOnScroll) {
            gsap.to(childrenElements, {
               ...animationProps,
               scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 80%",
                  once: true,
               },
            });
         } else {
            gsap.to(childrenElements, animationProps);
         }
      },
      {
         scope: containerRef,
         dependencies: [animateOnScroll, delay, stagger, animationType],
      }
   );

   return (
      <div
         ref={containerRef}
         className={cn("block-appear-container", className)}
         {...props}
      >
         {children}
      </div>
   );
}

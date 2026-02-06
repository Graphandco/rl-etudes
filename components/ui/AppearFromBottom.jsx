"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function AppearFromBottom({ children, className, ...props }) {
   const containerRef = useRef(null);

   useGSAP(
      () => {
         if (!containerRef.current) return;

         // Positionner l'élément 50px plus bas initialement
         gsap.set(containerRef.current, {
            y: 50,
         });

         // Animation avec ScrollTrigger
         gsap.to(containerRef.current, {
            y: 0,
            duration: 2,
            ease: "easeInOut",
            scrollTrigger: {
               trigger: containerRef.current,
               start: "bottom 100%", // Démarre quand le bas de l'élément est à 20% du bas de l'écran
               end: "bottom 80%", // Se termine quand le bas de l'élément est à 20% du bas de l'écran
               scrub: 1,
            },
         });
      },
      {
         scope: containerRef,
      }
   );

   return (
      <div ref={containerRef} className={cn("", className)} {...props}>
         {children}
      </div>
   );
}

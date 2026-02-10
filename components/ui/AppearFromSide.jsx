"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function AppearFromSide({
   children,
   left,
   right,
   className,
   ...props
}) {
   const containerRef = useRef(null);
   const isLeft = left || !right; // Par défaut left si aucune prop n'est fournie

   useGSAP(
      () => {
         if (!containerRef.current) return;

         // Vérifier si on est sur mobile (largeur < 768px)
         const isMobile = window.innerWidth < 768;

         if (isMobile) {
            // Sur mobile : animation fade simple
            gsap.set(containerRef.current, {
               opacity: 0,
               y: 30,
            });

            ScrollTrigger.create({
               trigger: containerRef.current,
               start: "top 80%",
               animation: gsap.to(containerRef.current, {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  ease: "ease",
               }),
               once: true,
            });
         } else {
            // Sur desktop : animation horizontale
            const startX = isLeft ? "-20vw" : "20vw";

            // Positionner le composant hors écran initialement
            gsap.set(containerRef.current, {
               x: startX,
            });

            // Créer une timeline pour l'animation
            const tl = gsap.timeline({
               scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top bottom", // Commence dès que le conteneur devient visible
                  end: "center center", // Se termine quand le conteneur est au centre de l'écran
                  scrub: 1,
               },
            });

            // Animer le composant de sa position hors écran vers sa position initiale
            tl.to(containerRef.current, {
               x: "0%",
               duration: 1,
               ease: "ease",
            });
         }
      },
      {
         scope: containerRef,
         dependencies: [left, right],
      }
   );

   return (
      <div ref={containerRef} className={cn("", className)} {...props}>
         {children}
      </div>
   );
}

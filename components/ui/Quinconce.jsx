"use client";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Quinconce({
   image,
   title,
   content,
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
                  ease: "power2.out",
               }),
               once: true,
            });
         } else {
            // Sur desktop : animation horizontale
            const startX = isLeft ? "-100%" : "100%";

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
               ease: "power2.out",
            });
         }
      },
      {
         scope: containerRef,
         dependencies: [left, right],
      }
   );

   return (
      <div
         ref={containerRef}
         className={cn(
            "wrapper mt-10 mb-10 flex flex-col md:items-end gap-10 overflow-hidden",
            isLeft ? "md:flex-row" : "md:flex-row-reverse",
            className
         )}
         {...props}
      >
         <Image src={image} alt={title} width={500} height={500} />
         <div className="space-y-4">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-sm">{content}</p>
         </div>
      </div>
   );
}

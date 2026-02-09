"use client";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Partenaires({ partenaires }) {
   const marqueeRef = useRef(null);
   const contentRef = useRef(null);

   useGSAP(
      () => {
         if (!marqueeRef.current || !contentRef.current) return;

         const marquee = marqueeRef.current;
         const content = contentRef.current;
         let animation = null;

         // Attendre que les images soient chargées pour calculer la largeur correcte
         const images = content.querySelectorAll("img");
         const imagePromises = Array.from(images).map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
               img.onload = resolve;
               img.onerror = resolve;
               // Timeout de sécurité
               setTimeout(resolve, 2000);
            });
         });

         Promise.all(imagePromises).then(() => {
            // Forcer un recalcul de la mise en page
            void content.offsetWidth;

            // Calculer la largeur totale du contenu (diviser par 2 car on a dupliqué)
            const contentWidth = content.scrollWidth / 2;
            const gap = 60; // Espace entre les logos (gap-15 = 3.75rem ≈ 60px)
            const totalWidth = contentWidth + gap;

            // Vitesse de défilement (pixels par seconde)
            const speed = 80; // Ajustable : plus petit = plus rapide

            // Créer une timeline infinie
            animation = gsap.timeline({ repeat: -1, ease: "none" });

            // Animation de gauche à droite
            animation.to(content, {
               x: -totalWidth,
               duration: totalWidth / speed,
               ease: "none",
            });

            // Réinitialiser la position pour créer la boucle
            animation.set(content, { x: 0 });
         });

         // Nettoyer l'animation au démontage
         return () => {
            if (animation) {
               animation.kill();
            }
            const tweens = gsap.getTweensOf(content);
            tweens.forEach((tween) => tween.kill());
         };
      },
      {
         scope: marqueeRef,
         dependencies: [partenaires],
      }
   );

   if (!partenaires || partenaires.length === 0) return null;

   return (
      <section id="partenaires" className="py-10 md:py-20 overflow-hidden">
         <div ref={marqueeRef} className="relative w-full">
            <div
               ref={contentRef}
               className="flex items-center gap-15 will-change-transform"
               style={{ width: "max-content" }}
            >
               {/* Première série de logos */}
               {partenaires.map((partenaire) => (
                  <div
                     key={`partenaire-1-${partenaire.ID}`}
                     className="shrink-0 px-5"
                  >
                     <Image
                        src={partenaire.url}
                        alt="Logo de l'entreprise"
                        width={partenaire.width}
                        height={partenaire.height}
                        className="w-auto max-w-40 h-20 object-contain hover:scale-105 transition-transform duration-300"
                     />
                  </div>
               ))}
               {/* Duplication pour l'effet infini */}
               {partenaires.map((partenaire) => (
                  <div
                     key={`partenaire-2-${partenaire.ID}`}
                     className="shrink-0 px-5"
                  >
                     <Image
                        src={partenaire.url}
                        alt="Logo de l'entreprise"
                        width={partenaire.width}
                        height={partenaire.height}
                        className="w-auto max-w-40 h-20 object-contain hover:scale-105 transition-transform duration-300"
                     />
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}

"use client";
import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";

const DynamicIcon = ({ iconName }) => {
   const Icon = LucideIcons[iconName];
   return <Icon />;
};

const Stats = ({ stats }) => {
   const refs = useRef([]);
   const containerRef = useRef(null);
   const isInView = useInView(containerRef, { once: false });

   useEffect(() => {
      if (!isInView) return;

      stats.forEach((stat, index) => {
         animate(0, Number(stat.nombre), {
            duration: 2.5,
            onUpdate: (value) => {
               if (refs.current[index]) {
                  const rounded = Math.round(value);
                  refs.current[index].textContent =
                     rounded.toLocaleString("fr-FR");
               }
            },
         });
      });
   }, [isInView]);

   return (
      <section ref={containerRef} className="wrapper py-14 md:py-20 lg:py-24">
         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((stat, index) => (
               <div
                  key={index}
                  className="flex flex-col items-center py-3 sm:py-0"
               >
                  <div className="text-3xl mb-3 text-primary aspect-square bg-primary-100 rounded-full p-3">
                     <DynamicIcon iconName={stat.picto} />
                  </div>
                  <p className="mb-3 text-center text-4xl text-accent">
                     <span ref={(el) => (refs.current[index] = el)} />
                     {stat.suffixe}
                  </p>
                  <p className="text-center text-primary font-semibold leading-tight">
                     {stat.titre}
                  </p>
               </div>
            ))}
         </div>
      </section>
   );
};

export default Stats;

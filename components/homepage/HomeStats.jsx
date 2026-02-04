"use client";
import { ArrowRightIcon, Handshake, Coffee, ClockPlus } from "lucide-react";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

const Stats = () => {
   const stats = [
      {
         num: 35,
         suffix: "",
         subheading: "Ans d'expérience",
         icon: <ClockPlus />,
      },
      {
         num: 97,
         suffix: "%",
         subheading: "Fidélisation client",
         icon: <Handshake />,
      },
      {
         num: 1645,
         suffix: "",
         subheading: "Litres de café",
         icon: <Coffee />,
      },
      {
         num: 1245,
         suffix: "",
         subheading: "Encore une autre stat",
         icon: <ArrowRightIcon />,
      },
   ];

   const refs = useRef([]);
   const containerRef = useRef(null);
   const isInView = useInView(containerRef, { once: false });

   useEffect(() => {
      if (!isInView) return;

      stats.forEach((stat, index) => {
         animate(0, stat.num, {
            duration: 2.5,
            onUpdate: (value) => {
               if (refs.current[index]) {
                  const rounded = Math.round(value);
                  refs.current[index].textContent =
                     rounded.toLocaleString("en-US");
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
                     {stat.icon}
                  </div>
                  <p className="mb-3 text-center text-4xl text-accent">
                     <span ref={(el) => (refs.current[index] = el)} />
                     {stat.suffix}
                  </p>
                  <p className="text-center text-primary font-semibold leading-tight">
                     {stat.subheading}
                  </p>
               </div>
            ))}
         </div>
      </section>
   );
};

export default Stats;

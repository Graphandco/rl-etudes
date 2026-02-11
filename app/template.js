"use client";

import { ReactLenis, useLenis } from "lenis/react";

export default function Template({ children }) {
   const lenis = useLenis((lenis) => {
      // called every scroll
      // console.log(lenis);
   });

   return (
      <>
         <ReactLenis
            root
            options={{
               lerp: 0.25,
               duration: 1.5,
               infinite: false,
               wheelMultiplier: 0.75,
               orientation: "vertical",
               smoothWheel: true,
               // Désactivé pour permettre le pull-to-refresh natif sur mobile
               smoothTouch: false,
               syncTouch: false,
            }}
         />
         {children}
      </>
   );
}

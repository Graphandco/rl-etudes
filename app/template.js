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
               lerp: 0.1,
               duration: 1,
               smoothTouch: true,
               touchMultiplier: 3,
               infinite: false,
               wheelMultiplier: 0.8,
               orientation: "vertical",
               smoothWheel: true,
               syncTouch: true,
            }}
         />
         {children}
      </>
   );
}

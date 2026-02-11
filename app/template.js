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
               smoothTouch: true,
               touchMultiplier: 1,
               infinite: false,
               wheelMultiplier: 0.75,
               orientation: "vertical",
               smoothWheel: true,
               syncTouch: true,
            }}
         />
         {children}
      </>
   );
}

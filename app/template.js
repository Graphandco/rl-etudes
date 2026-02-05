"use client";

import { ReactLenis, useLenis } from "lenis/react";

export default function Template({ children }) {
   const lenis = useLenis((lenis) => {
      // called every scroll
      console.log(lenis);
   });

   return (
      <>
         <ReactLenis
            root
            options={{
               lerp: 0.1,
               duration: 1.2,
               smoothTouch: true,
               touchMultiplier: 1.5,
            }}
         />
         {children}
      </>
   );
}

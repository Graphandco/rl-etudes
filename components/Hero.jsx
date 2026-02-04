"use client";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useHeaderHeight from "@/hooks/useHeaderHeight";
import { cn } from "@/lib/utils";

export default function Hero({
   image: { url, width, height },
   alt,
   children,
   className,
   ...props
}) {
   const headerHeight = useHeaderHeight();
   const heroHeight = `calc(100vh - ${headerHeight}px)`;
   const imageRef = useRef(null);

   useGSAP(
      () => {
         if (!imageRef.current) return;

         gsap.fromTo(
            imageRef.current,
            {
               clipPath: "inset(0% 0% 0% 100%)",
            },
            {
               clipPath: "inset(0% 0% 0% 0%)",
               duration: 0.8,
               ease: "power5.inOut",
               delay: 0.3,
            }
         );
      },
      { scope: imageRef }
   );

   return (
      <section
         id="hero"
         className={cn(
            "relative grid grid-cols-1 md:grid-cols-[3fr_2fr] bg-neutral-100 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[url(/hero/bg-topo.webp)] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-5",
            className
         )}
         style={{ minHeight: heroHeight }}
         {...props}
      >
         <div
            className="hero-mobile-bg p-[5vw] flex flex-col justify-center items-baseline relative"
            style={{
               "--hero-image": `url(${url})`,
            }}
         >
            <div className="w-full relative z-10">{children}</div>
         </div>
         <div ref={imageRef} className="hidden md:block h-full overflow-hidden">
            <Image
               className="h-full w-full object-cover"
               src={url}
               alt={alt}
               width={width}
               height={height}
            />
         </div>
      </section>
   );
}

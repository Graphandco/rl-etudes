"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function TextAppear({
   children,
   animateOnScroll = true,
   delay = 0,
   animationType = "slideUp", // slideUp, fade, scale, slideLeft, slideRight, blur, rotate, clip
}) {
   const containerRef = useRef(null);
   const elementRefs = useRef([]);
   const splitRefs = useRef([]);
   const lines = useRef([]);

   const waitForFonts = async () => {
      try {
         await document.fonts.ready;

         const customFonts = [
            "Geist Mono",
            "PP Neue Montreal",
            "PP Pangram Sans",
            "Big Shoulders Display",
         ];
         const fontCheckPromises = customFonts.map((fontFamily) => {
            return document.fonts.check(`16px ${fontFamily}`);
         });

         await Promise.all(fontCheckPromises);
         await new Promise((resolve) => setTimeout(resolve, 100));

         return true;
      } catch (error) {
         await new Promise((resolve) => setTimeout(resolve, 200));
         return true;
      }
   };

   useGSAP(
      () => {
         if (!containerRef.current) return;

         const getAnimationProps = (type) => {
            switch (type) {
               case "fade":
                  return {
                     from: { opacity: 0 },
                     to: { opacity: 1 },
                  };
               case "scale":
                  return {
                     from: { opacity: 0, scale: 0.8 },
                     to: { opacity: 1, scale: 1 },
                  };
               case "slideLeft":
                  return {
                     from: { x: "-100%", opacity: 0 },
                     to: { x: "0%", opacity: 1 },
                  };
               case "slideRight":
                  return {
                     from: { x: "100%", opacity: 0 },
                     to: { x: "0%", opacity: 1 },
                  };
               case "blur":
                  return {
                     from: { opacity: 0, filter: "blur(5px)" },
                     to: { opacity: 1, filter: "blur(0px)" },
                  };
               case "rotate":
                  return {
                     from: { opacity: 0, rotation: -2, y: "10px" },
                     to: { opacity: 1, rotation: 0, y: "0%" },
                  };
               case "clip":
                  return {
                     from: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
                     to: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
                  };
               case "slideUp":
               default:
                  return {
                     from: { opacity: 0, filter: "blur(5px)" },
                     to: { opacity: 1, filter: "blur(0px)" },
                  };
            }
         };

         const initializeSplitText = () => {
            // await waitForFonts();

            splitRefs.current = [];
            lines.current = [];
            elementRefs.current = [];

            let elements = [];
            if (containerRef.current.hasAttribute("data-copy-wrapper")) {
               elements = Array.from(containerRef.current.children);
            } else {
               elements = [containerRef.current];
            }

            elements.forEach((element) => {
               elementRefs.current.push(element);

               const split = SplitText.create(element, {
                  type: "lines",
                  mask: "lines",
                  linesClass: "line++",
                  lineThreshold: 0.1,
               });

               splitRefs.current.push(split);

               const computedStyle = window.getComputedStyle(element);
               const textIndent = computedStyle.textIndent;

               if (textIndent && textIndent !== "0px") {
                  if (split.lines.length > 0) {
                     split.lines[0].style.paddingLeft = textIndent;
                  }
                  element.style.textIndent = "0";
               }

               split.lines.forEach((line) => {
                  line.classList.add(
                     "relative",
                     "will-change-transform",
                     "pb-[0.2em]",
                     "-mb-[0.2em]"
                  );
               });

               lines.current.push(...split.lines);
            });

            const animProps = getAnimationProps(animationType);
            gsap.set(lines.current, animProps.from);

            const animationProps = {
               ...animProps.to,
               duration: 1,
               stagger: 0.1,
               ease: "power4.out",
               delay: delay,
            };

            if (animateOnScroll) {
               gsap.to(lines.current, {
                  ...animationProps,
                  scrollTrigger: {
                     trigger: containerRef.current,
                     start: "top 90%",
                     once: true,
                  },
               });
            } else {
               gsap.to(lines.current, animationProps);
            }
         };

         initializeSplitText();

         return () => {
            splitRefs.current.forEach((split) => {
               if (split) {
                  split.revert();
               }
            });
         };
      },
      {
         scope: containerRef,
         dependencies: [animateOnScroll, delay, animationType],
      }
   );

   if (React.Children.count(children) === 1) {
      return React.cloneElement(children, { ref: containerRef });
   }

   return (
      <div ref={containerRef} data-copy-wrapper="true">
         {children}
      </div>
   );
}

"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import AppearFromSide from "@/components/ui/AppearFromSide";

export default function Quinconce({
   image,
   title,
   content,
   left,
   right,
   className,
   ...props
}) {
   const isLeft = left || !right; // Par défaut left si aucune prop n'est fournie

   return (
      <AppearFromSide left={left} right={right}>
         <section
            className={cn(
               "wrapper mt-10 mb-10 flex flex-col md:items-end gap-10 overflow-hidden",
               isLeft ? "md:flex-row" : "md:flex-row-reverse",
               className
            )}
            {...props}
         >
            <Image
               src={image.url}
               alt={title}
               width={image.width}
               height={image.height}
               className="w-full md:w-3/5 h-auto rounded-lg"
            />
            <div className="space-y-4 w-full md:w-2/5">
               <h2 className="title-h2">{title}</h2>
               <div
                  dangerouslySetInnerHTML={{ __html: content }}
                  className="prose"
               />
            </div>
         </section>
      </AppearFromSide>
   );
}

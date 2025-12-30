import TextAppear from "@/components/TextAppear";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
   return (
      <Hero image="/home/hero.webp">
         <TextAppear delay={0.3}>
            <h1 className="text-4xl font-title font-bold text-primary">
               Ceci est un long texte d'exemple pour tester la police de
               caractères !!!
            </h1>
         </TextAppear>
         <TextAppear delay={0.6} className="my-5">
            <div className="my-5">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
               itaque assumenda alias odit incidunt? Vero itaque quo odio quod
               mollitia nesciunt libero impedit beatae repellat?
            </div>
         </TextAppear>
         <TextAppear delay={0.9}>
            <div>
               <Button>
                  <span>Click me</span>
                  <ArrowRightIcon className="w-4 h-4" />
               </Button>
            </div>
         </TextAppear>
      </Hero>
   );
}

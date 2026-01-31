import TextAppear from "@/components/TextAppear";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
   return (
      <Hero image="/home/hero.webp">
         <TextAppear delay={0.3}>
            <h1 className="text-4xl font-title font-bold text-primary">
               Ingénierie des réseaux & expertise géomatique
            </h1>
         </TextAppear>
         <TextAppear delay={0.6}>
            <div className="mt-2 mb-5">
               Bureau d’études spécialisé dans les réseaux de distribution
               d’énergie et les prestations de topographie, détection et DAO.
            </div>
         </TextAppear>
         {/* <TextAppear delay={0.9}>
            <div>
               <Button>
                  <span>Click me</span>
                  <ArrowRightIcon className="w-4 h-4" />
               </Button>
            </div>
         </TextAppear> */}
         <div className="grid md:grid-cols-2 items-center gap-8">
            <TextAppear delay={0.8}>
               <div className="flex flex-col items-center justify-between gap-2 bg-white rounded-xl p-5 shadow-md text-center h-full">
                  <Image
                     src="/home/etude.webp"
                     alt="Bureau d’Études"
                     width={75}
                     height={75}
                  />
                  <span className="text-lg font-bold">
                     Bureau d’Études – Réseaux de Distribution
                  </span>
                  <Button>
                     <span>Découvrir</span>
                     <ArrowRightIcon className="w-4 h-4" />
                  </Button>
               </div>
            </TextAppear>
            <TextAppear delay={0.9}>
               <div className="flex flex-col items-center justify-between gap-2 bg-white rounded-xl p-5 shadow-md text-center h-full">
                  <Image
                     src="/home/topographie.webp"
                     alt="Bureau d’Études"
                     width={75}
                     height={75}
                  />
                  <span className="text-lg font-bold">
                     Topographie – Détection – DAO
                  </span>
                  <Button>
                     <span>Découvrir</span>
                     <ArrowRightIcon className="w-4 h-4" />
                  </Button>
               </div>
            </TextAppear>
         </div>
      </Hero>
   );
}

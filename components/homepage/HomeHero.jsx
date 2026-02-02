import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import BlockAppear from "@/components/BlockAppear";
import Link from "next/link";

export default function HomeHero({ pageData }) {
   const heroDescription = pageData.acf.hero_description;
   return (
      <Hero image="/home/hero.webp">
         <BlockAppear delay={0.3}>
            <h1 className="text-4xl font-title font-bold text-primary">
               {pageData.title}
            </h1>
            <div className="mt-2 mb-5">{heroDescription}</div>
         </BlockAppear>

         <BlockAppear
            delay={0.8}
            className="grid lg:grid-cols-2 items-center gap-8"
         >
            <Link
               href="/bureau-detudes"
               className="group flex flex-col items-center justify-between gap-2 bg-white rounded-xl p-5 shadow-md text-center h-full"
            >
               <Image
                  src="/home/etude.webp"
                  alt="Bureau d'Études"
                  width={75}
                  height={75}
                  className="transition-transform duration-300 group-hover:scale-110"
               />
               <span className="flex items-center text-lg leading-tight font-bold transition-[font-size] duration-300 group-hover:text-base h-16">
                  Bureau d'Études – Réseaux de Distribution
               </span>
               <Button size="sm">
                  <span>Découvrir</span>
                  <ArrowRightIcon className="w-4 h-4" />
               </Button>
            </Link>
            <Link
               href="/topographie"
               className="group flex flex-col items-center justify-between gap-2 bg-white rounded-xl p-5 shadow-md text-center h-full"
            >
               <Image
                  src="/home/topographie.webp"
                  alt="Bureau d'Études"
                  width={75}
                  height={75}
                  className="transition-transform duration-300 group-hover:scale-110"
               />
               <span className="flex items-center text-lg leading-tight font-bold transition-[font-size] duration-300 group-hover:text-base h-16">
                  Topographie – Détection – DAO
               </span>
               <Button size="sm">
                  <span>Découvrir</span>
                  <ArrowRightIcon className="w-4 h-4" />
               </Button>
            </Link>
         </BlockAppear>
      </Hero>
   );
}

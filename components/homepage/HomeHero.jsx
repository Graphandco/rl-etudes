import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import BlockAppear from "@/components/ui/BlockAppear";
import { Link } from "next-view-transitions";

export default function HomeHero({ pageData }) {
   const hero = pageData.hero;
   return (
      <Hero image={pageData.featuredImage} alt={pageData.title}>
         <BlockAppear delay={0.3}>
            <h3 className="title-h3 mb-2 text-center">RL Études</h3>
            <h1 className="text-4xl font-title font-bold text-primary">
               {pageData.title}
            </h1>
            <div className="mt-2 mb-5">{hero.description}</div>
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
                  src={hero.be_image.sizes.medium}
                  alt="Bureau d'Études"
                  width={hero.be_image.sizes["medium-width"]}
                  height={hero.be_image.sizes["medium-height"]}
                  className="w-20 h-auto transition-transform duration-300 group-hover:scale-110"
               />
               <span className="flex items-center text-lg leading-tight font-bold transition-[font-size] duration-300 group-hover:text-base h-16">
                  {hero.be}
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
                  src={hero.topo_image.sizes.medium}
                  alt="Bureau d'Études"
                  width={hero.topo_image.sizes["medium-width"]}
                  height={hero.topo_image.sizes["medium-height"]}
                  className="w-20 h-auto transition-transform duration-300 group-hover:scale-110"
               />
               <span className="flex items-center text-lg leading-tight font-bold transition-[font-size] duration-300 group-hover:text-base h-16">
                  {hero.topo}
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

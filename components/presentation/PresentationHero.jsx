import Hero from "@/components/Hero";
import BlockAppear from "@/components/BlockAppear";
export default function PresentationHero() {
   return (
      <>
         <Hero image="/locaux.webp">
            <BlockAppear delay={0.3}>
               <h1 className="text-4xl font-title font-bold text-primary">
                  Présentation
               </h1>
               <div className="mt-2 mb-5">
                  Fondée en 1989, la société RL Études est un bureau d’études
                  indépendant spécialisé dans les réseaux de distribution
                  d’énergie, la topographie, la détection de réseaux enterrés et
                  la DAO.
               </div>
            </BlockAppear>
         </Hero>
      </>
   );
}

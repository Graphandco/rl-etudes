import Hero from "@/components/Hero";
import BlockAppear from "@/components/BlockAppear";
export default function PresentationHero({ pageData }) {
   return (
      <>
         <Hero image={pageData.featuredImage} alt={pageData.title}>
            <BlockAppear delay={0.3}>
               <h1 className="text-4xl font-title font-bold text-primary">
                  {pageData.title}
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

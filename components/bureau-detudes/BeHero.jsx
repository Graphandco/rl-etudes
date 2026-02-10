import Hero from "@/components/ui/Hero";
import BlockAppear from "@/components/ui/BlockAppear";
export default function BeHero({ pageData }) {
   return (
      <Hero image={pageData.featuredImage} alt={pageData.title}>
         <BlockAppear delay={0.3}>
            <h1 className="text-4xl font-title font-bold text-primary">
               {pageData.title}
            </h1>
            <div className="mt-2 mb-5">
               RL Études intervient principalement sur les réseaux de
               distribution d’énergie, pour le compte de concessionnaires,
               collectivités et acteurs publics.
            </div>
         </BlockAppear>
      </Hero>
   );
}

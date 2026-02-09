import Hero from "@/components/ui/Hero";
import BlockAppear from "@/components/ui/BlockAppear";
export default function ProjetsListHero({ pageData }) {
   return (
      <Hero image={pageData.featuredImage} alt={pageData.title}>
         <BlockAppear delay={0.3}>
            <h1 className="title-h1 font-title font-bold text-primary mb-5">
               {pageData.title}
            </h1>
         </BlockAppear>
      </Hero>
   );
}

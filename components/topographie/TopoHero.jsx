import Hero from "@/components/ui/Hero";
import BlockAppear from "@/components/ui/BlockAppear";
export default function TopoHero({ pageData }) {
   return (
      <Hero image={pageData.featuredImage} alt={pageData.title}>
         <BlockAppear delay={0.3}>
            <h1 className="text-4xl font-title font-bold text-primary">
               {pageData.title}
            </h1>
            {/* <div className="mt-2 mb-5">{hero.description}</div> */}
         </BlockAppear>
      </Hero>
   );
}

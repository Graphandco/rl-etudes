import { getWordpressContent } from "@/actions/getWordpressContent";
import PresentationHero from "@/components/presentation/PresentationHero";
import Quinconce from "@/components/ui/Quinconce";
import Poles from "@/components/presentation/Poles";
import LastBlocks from "@/components/presentation/LastBlocks";
import Partenaires from "@/components/presentation/Partenaires";
export default async function Presentation() {
   const pageData = await getWordpressContent({ id: 23, type: "page" });
   return (
      <div>
         <PresentationHero pageData={pageData} />
         <Quinconce
            left
            image={pageData.expertise_technique.image}
            title={pageData.expertise_technique.title}
            content={pageData.expertise_technique.content}
            className="to-scroll"
         />
         <Quinconce
            right
            image={pageData.competences_certifiees.image}
            title={pageData.competences_certifiees.title}
            content={pageData.competences_certifiees.content}
         />
         <Poles poles={pageData.poles} />
         <LastBlocks lastBlocks={pageData.last_block} />
         <Partenaires partenaires={pageData.partenaires} />
      </div>
   );
}

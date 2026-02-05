import { getWordpressContent } from "@/actions/getWordpressContent";
import PresentationHero from "@/components/presentation/PresentationHero";
import Quinconce from "@/components/ui/Quinconce";
export default async function Presentation() {
   const pageData = await getWordpressContent({ id: 23, type: "page" });
   return (
      <div>
         <PresentationHero pageData={pageData} />
         <Quinconce
            left
            image="/contact/contact.webp"
            title={pageData.expertise_technique.title}
            content={pageData.expertise_technique.content}
         />
         <Quinconce
            right
            image="/contact/contact.webp"
            title={pageData.competences_certifiees.title}
            content={pageData.competences_certifiees.content}
         />
      </div>
   );
}

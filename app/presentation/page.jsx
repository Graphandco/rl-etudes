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
            title="Titre test"
            content="Contenu test"
         />
         <Quinconce
            right
            image="/contact/contact.webp"
            title="Titre test"
            content="Contenu test"
         />
      </div>
   );
}

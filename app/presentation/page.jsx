import { getWordpressContent } from "@/actions/getWordpressContent";
import PresentationHero from "@/components/presentation/PresentationHero";
export default async function Presentation() {
   const pageData = await getWordpressContent({ id: 23, type: "page" });
   return (
      <div>
         <PresentationHero pageData={pageData} />
      </div>
   );
}

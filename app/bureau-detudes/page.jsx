import { getWordpressContent } from "@/actions/getWordpressContent";
import BeHero from "@/components/bureau-detudes/BeHero";
import Reseaux from "@/components/bureau-detudes/Reseaux";
import BePrestations from "@/components/bureau-detudes/BePrestations";
export default async function BureauDetudes() {
   const pageData = await getWordpressContent({ id: 26, type: "page" });

   return (
      <div>
         <BeHero pageData={pageData} />
         <Reseaux reseaux={pageData.reseaux} />
         <BePrestations prestations={pageData.prestations} />
      </div>
   );
}

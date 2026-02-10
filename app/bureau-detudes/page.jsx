import { getWordpressContent } from "@/actions/getWordpressContent";
import BeHero from "@/components/bureau-detudes/BeHero";
import Reseaux from "@/components/bureau-detudes/Reseaux";
export default async function BureauDetudes() {
   const pageData = await getWordpressContent({ id: 26, type: "page" });

   return (
      <div>
         <BeHero pageData={pageData} />
         <Reseaux reseaux={pageData.reseaux} />
      </div>
   );
}

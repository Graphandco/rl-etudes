import { getWordpressContent } from "@/actions/getWordpressContent";
import TopoHero from "@/components/topographie/TopoHero";
export default async function Topographie() {
   const pageData = await getWordpressContent({ id: 28, type: "page" });
   return (
      <div>
         <TopoHero pageData={pageData} />
      </div>
   );
}

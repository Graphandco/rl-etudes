import { getWordpressContent } from "@/actions/getWordpressContent";
import TopoHero from "@/components/topographie/TopoHero";
import TopoPrestations from "@/components/topographie/TopoPrestations";
export default async function Topographie() {
   const pageData = await getWordpressContent({ id: 28, type: "page" });
   return (
      <div>
         <TopoHero pageData={pageData} />
         <TopoPrestations prestations={pageData.prestations} />
      </div>
   );
}

import { getAllWordpressProjets } from "@/actions/getWordpressProjets";
import ProjetsList from "@/components/projets/ProjetsList";
import ProjetsListHero from "@/components/projets/ProjetsListHero";
import { getWordpressContent } from "@/actions/getWordpressContent";

export default async function ProjetsPage() {
   const projets = await getAllWordpressProjets();
   const pageData = await getWordpressContent({ id: 101, type: "page" });

   return (
      <>
         <ProjetsListHero pageData={pageData} />
         <ProjetsList projets={projets} />
      </>
   );
}

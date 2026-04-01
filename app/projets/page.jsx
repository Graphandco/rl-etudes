import ProjetsList from "@/components/projets/ProjetsList";
import ProjetsListHero from "@/components/projets/ProjetsListHero";
import { getWordpressContent } from "@/actions/getWordpressContent";

export default async function ProjetsPage() {
   const pageData = await getWordpressContent({ id: 101, type: "page" });

   return (
      <>
         <ProjetsListHero pageData={pageData} />
         <ProjetsList projects={pageData.projects_list} />
      </>
   );
}

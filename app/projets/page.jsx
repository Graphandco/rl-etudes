import ProjetsList from "@/components/projets/ProjetsList";
import ProjetsListHero from "@/components/projets/ProjetsListHero";
import { getWordpressContent } from "@/actions/getWordpressContent";

export async function generateMetadata() {
   const data = await getWordpressContent({ id: 101, type: "page" });

   const cleanDescription = (data.seo.metaDesc || "Projets de RL Études")
      .replace(/[#*]/g, "")
      .slice(0, 160);

   return {
      title: data.seo.title || `${data.title} - RL Études`,
      description: cleanDescription,
      openGraph: {
         title: data.seo.title || `${data.title} - RL Études`,
         description: cleanDescription,
         url: "https://rletudes.fr/projets",
         type: "website",
         siteName: "RL Études",
      },
   };
}

export default async function ProjetsPage() {
   const pageData = await getWordpressContent({ id: 101, type: "page" });

   return (
      <>
         <ProjetsListHero pageData={pageData} />
         <ProjetsList projects={pageData.projects_list} />
      </>
   );
}

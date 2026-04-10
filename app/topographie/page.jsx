import { getWordpressContent } from "@/actions/getWordpressContent";
import TopoHero from "@/components/topographie/TopoHero";
import TopoPrestations from "@/components/topographie/TopoPrestations";

export async function generateMetadata() {
   const data = await getWordpressContent({ id: 28, type: "page" });

   const cleanDescription = (data.seo.metaDesc || "Topographie près de Colmar")
      .replace(/[#*]/g, "")
      .slice(0, 160);

   return {
      title: data.seo.title || `${data.title} - RL Études`,
      description: cleanDescription,
      openGraph: {
         title: data.seo.title || `${data.title} - RL Études`,
         description: cleanDescription,
         url: "https://rletudes.fr/topographie",
         type: "website",
         siteName: "RL Études",
      },
   };
}

export default async function Topographie() {
   const pageData = await getWordpressContent({ id: 28, type: "page" });
   return (
      <div>
         <TopoHero pageData={pageData} />
         <TopoPrestations prestations={pageData.prestations} />
      </div>
   );
}

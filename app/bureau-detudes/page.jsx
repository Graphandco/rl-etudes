import { getWordpressContent } from "@/actions/getWordpressContent";
import BeHero from "@/components/bureau-detudes/BeHero";
import Reseaux from "@/components/bureau-detudes/Reseaux";
import BePrestations from "@/components/bureau-detudes/BePrestations";

export async function generateMetadata() {
   const data = await getWordpressContent({ id: 26, type: "page" });

   const cleanDescription = (
      data.seo.metaDesc || "Bureau d'études près de Colmar"
   )
      .replace(/[#*]/g, "")
      .slice(0, 160);

   return {
      title: data.seo.title || `${data.title} - RL Études`,
      description: cleanDescription,
      openGraph: {
         title: data.seo.title || `${data.title} - RL Études`,
         description: cleanDescription,
         url: "https://rletudes.fr/bureau-detudes",
         type: "website",
         siteName: "RL Études",
      },
   };
}

export default async function BureauDetudes() {
   const pageData = await getWordpressContent({ id: 26, type: "page" });

   console.log(pageData);

   return (
      <div>
         <BeHero pageData={pageData} />
         <Reseaux reseaux={pageData.reseaux} />
         <BePrestations prestations={pageData.prestations} />
      </div>
   );
}

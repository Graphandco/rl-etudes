import { getWordpressContent } from "@/actions/getWordpressContent";
import PresentationHero from "@/components/presentation/PresentationHero";
import Quinconce from "@/components/ui/Quinconce";
import Poles from "@/components/presentation/Poles";
import LastBlocks from "@/components/presentation/LastBlocks";
import CCTA from "@/components/presentation/CCTA";
import Partenaires from "@/components/presentation/Partenaires";

export async function generateMetadata() {
   const data = await getWordpressContent({ id: 23, type: "page" });

   const cleanDescription = (data.seo.metaDesc || "Présentation de RL Études")
      .replace(/[#*]/g, "")
      .slice(0, 160);

   return {
      title: data.seo.title || `${data.title} - RL Études`,
      description: cleanDescription,
      openGraph: {
         title: data.seo.title || `${data.title} - RL Études`,
         description: cleanDescription,
         url: "https://rletudes.fr/presentation",
         type: "website",
         siteName: "RL Études",
      },
   };
}

export default async function Presentation() {
   const pageData = await getWordpressContent({ id: 23, type: "page" });
   console.log(pageData);
   return (
      <div>
         <PresentationHero pageData={pageData} />
         <Quinconce
            left
            images={pageData.expertise_technique.images}
            title={pageData.expertise_technique.title}
            content={pageData.expertise_technique.content}
            className="to-scroll"
         />
         <Quinconce
            right
            images={pageData.competences_certifiees.images}
            title={pageData.competences_certifiees.title}
            content={pageData.competences_certifiees.content}
         />
         <Poles poles={pageData.poles} />
         <LastBlocks lastBlocks={pageData.last_block} />
         <CCTA ccta={pageData.ccta} />
         <Partenaires partenaires={pageData.partenaires} />
      </div>
   );
}

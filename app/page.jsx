import { getWordpressContent } from "@/actions/getWordpressContent";
import HomeHero from "@/components/homepage/HomeHero";
import HomePrestations from "@/components/homepage/HomePrestations";
import HomeBandeau from "@/components/homepage/HomeBandeau";
import HomeStats from "@/components/homepage/HomeStats";

export async function generateMetadata() {
   const data = await getWordpressContent({ id: 2, type: "page" });

   const cleanDescription = (data.seo.metaDesc || "Accueil de RL Études")
      .replace(/[#*]/g, "")
      .slice(0, 160);

   return {
      title: data.seo.title || `${data.title} - RL Études`,
      description: cleanDescription,
      openGraph: {
         title: data.seo.title || `${data.title} - RL Études`,
         description: cleanDescription,
         url: "https://rletudes.fr",
         type: "website",
         siteName: "RL Études",
      },
   };
}

export default async function Home() {
   const pageData = await getWordpressContent({ id: 2, type: "page" });
   return (
      <>
         <HomeHero pageData={pageData} />
         <HomePrestations pageData={pageData} />
         <HomeBandeau pageData={pageData} />
         <HomeStats stats={pageData.stats} />
      </>
   );
}

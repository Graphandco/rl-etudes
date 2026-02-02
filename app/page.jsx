import { getWordpressContent } from "@/actions/getWordpressContent";
import HomeHero from "@/components/homepage/HomeHero";

export default async function Home() {
   const pageData = await getWordpressContent({ id: 2, type: "page" });
   return (
      <>
         <HomeHero pageData={pageData} />
      </>
   );
}

import { getWordpressContent } from "@/actions/getWordpressContent";

export default async function Topographie() {
   const pageData = await getWordpressContent({ id: 28, type: "page" });
   return (
      <div>
         <PresentationHero pageData={pageData} />
      </div>
   );
}

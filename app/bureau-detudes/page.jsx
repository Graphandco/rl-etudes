import { getWordpressContent } from "@/actions/getWordpressContent";
export default async function BureauDetudes() {
   const pageData = await getWordpressContent({ id: 26, type: "page" });

   return (
      <div>
         <PresentationHero pageData={pageData} />
      </div>
   );
}

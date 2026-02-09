import { getWordpressContent } from "@/actions/getWordpressContent";
export default async function PolitiqueConfidentialite() {
   const pageData = await getWordpressContent({ id: 107, type: "page" });
   return (
      <section className="wrapper pt-10 pb-20">
         <h1 className="text-4xl font-title font-bold text-primary">
            {pageData.title}
         </h1>
         <div
            className="prose mt-15"
            dangerouslySetInnerHTML={{
               __html: pageData.content,
            }}
         />
      </section>
   );
}

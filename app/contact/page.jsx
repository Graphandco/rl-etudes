import { getWordpressContent } from "@/actions/getWordpressContent";
import ContactHero from "@/components/contact/ContactHero";
export default async function Contact() {
   const pageData = await getWordpressContent({ id: 30, type: "page" });
   return (
      <div>
         <ContactHero pageData={pageData} />
      </div>
   );
}

import { getWordpressContent } from "@/actions/getWordpressContent";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
export default async function Contact() {
   const pageData = await getWordpressContent({ id: 30, type: "page" });
   return (
      <div>
         <ContactHero pageData={pageData} />
         <ContactForm />
      </div>
   );
}

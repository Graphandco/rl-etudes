import { getWordpressContent } from "@/actions/getWordpressContent";
import ContactHero from "@/components/contact/ContactHero";
// import ContactForm from "@/components/contact/ContactForm";

export async function generateMetadata() {
   const data = await getWordpressContent({ id: 30, type: "page" });

   const cleanDescription = (data.seo.metaDesc || "Contactez RL Études")
      .replace(/[#*]/g, "")
      .slice(0, 160);

   return {
      title: data.seo.title || `${data.title} - RL Études`,
      description: cleanDescription,
      openGraph: {
         title: data.seo.title || `${data.title} - RL Études`,
         description: cleanDescription,
         url: "https://rletudes.fr/contact",
         type: "website",
         siteName: "RL Études",
      },
   };
}

export default async function Contact() {
   const pageData = await getWordpressContent({ id: 30, type: "page" });
   return (
      <div>
         <ContactHero pageData={pageData} />
         {/* <ContactForm /> */}
      </div>
   );
}

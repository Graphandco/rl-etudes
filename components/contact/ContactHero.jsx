import Hero from "@/components/ui/Hero";
import BlockAppear from "@/components/ui/BlockAppear";
import ContactForm from "@/components/contact/ContactForm";
export default function ContactHero({ pageData }) {
   return (
      <Hero image={pageData.featuredImage} alt={pageData.title}>
         <BlockAppear delay={0.3}>
            <h1 className="text-4xl font-title font-bold text-primary mb-5">
               {pageData.title}
            </h1>
            <ContactForm />
         </BlockAppear>
      </Hero>
   );
}

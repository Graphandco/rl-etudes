import Hero from "@/components/Hero";
export default function ContactHero({ pageData }) {
   return (
      <Hero image={pageData.featuredImage} alt={pageData.title}>
         <h1>{pageData.title}</h1>
      </Hero>
   );
}

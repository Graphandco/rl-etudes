import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";
export default function HomeBandeau({ pageData }) {
   const bandeau = pageData.bandeau;
   return (
      <section
         className="bg-cover bg-center bg-no-repeat bg-fixed relative isolate before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/50 "
         style={{
            backgroundImage: `url(${bandeau.image.url})`,
         }}
      >
         <div className="wrapper py-14 md:py-20 lg:py-24 relative text-center">
            <p className="text-white">{bandeau.sous_titre}</p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl text-accent font-semibold mb-5">
               {bandeau.titre}
            </h3>
            <Link href="/contact">
               <Button size="lg">
                  <span>Contactez-nous</span>
                  <MailIcon className="w-4 h-4" />
               </Button>
            </Link>
         </div>
      </section>
   );
}

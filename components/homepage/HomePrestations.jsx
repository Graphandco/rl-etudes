import Image from "next/image";
import YellowShape from "@/components/ui/YellowShape";
import BlockAppear from "@/components/ui/BlockAppear";
export default function HomePrestations({ pageData }) {
   const prestations = pageData.prestations;
   console.log(prestations);

   return (
      <section className="relative">
         <YellowShape bottom right />
         <div className="wrapper py-5 sm:py-10 md:py-16">
            <div className="text-center max-w-lg mx-auto">
               <h3 className="title-h3 mb-2">{prestations.sous_titre}</h3>
               <h2 className="title-h2">{prestations.titre}</h2>
            </div>
            <BlockAppear className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
               {prestations.cartes.map((prestation) => (
                  <div
                     key={prestation.titre}
                     className="p-5 bg-white rounded-lg border border-accent shadow-md text-center"
                  >
                     <Image
                        src={prestation.picto.sizes.medium}
                        alt={prestation.titre}
                        width={prestation.picto.sizes["medium-width"]}
                        height={prestation.picto.sizes["medium-height"]}
                        className="h-12 w-auto mx-auto p-2 bg-accent/50 rounded-full outline outline-accent outline-offset-2"
                     />
                     <h3 className="text-lg font-bold leading-tight my-3">
                        {prestation.titre}
                     </h3>
                     <p className="text-sm">{prestation.description}</p>
                  </div>
               ))}
            </BlockAppear>
         </div>
      </section>
   );
}

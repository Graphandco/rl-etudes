import Image from "next/image";
import YellowShape from "@/components/ui/YellowShape";
import AppearFromSide from "@/components/ui/AppearFromSide";
export default function Reseaux({ reseaux }) {
   return (
      <section id="reseaux" className="py-10 md:py-20 relative">
         <YellowShape bottom right className="z-10" />
         <div className="wrapper">
            <h2 className="title-h2 mb-10">{reseaux.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 items-center">
               <AppearFromSide left>
                  <Image
                     src={reseaux.image?.url}
                     alt="RL Études"
                     width={reseaux.image?.width}
                     height={reseaux.image?.height}
                     className="w-full h-auto rounded-lg"
                  />
               </AppearFromSide>
               {/* <AppearFromSide right> */}
               <div className="grid grid-cols-2 gap-5">
                  {reseaux.items.map((reseau) => (
                     <div
                        key={reseau.title}
                        className="flex flex-col lg:flex-row items-center gap-2 lg:gap-5 bg-white border-2 border-primary p-5 rounded-lg shadow-md"
                     >
                        {reseau.picto.url && (
                           <Image
                              src={reseau.picto?.url}
                              alt={reseau.title}
                              width={reseau.picto?.width}
                              height={reseau.picto?.height}
                              className="w-auto h-10 object-contain"
                           />
                        )}
                        <div className="text-center font-semibold leading-tight">
                           {reseau.title}
                        </div>
                     </div>
                  ))}
               </div>
               {/* </AppearFromSide> */}
            </div>
         </div>
      </section>
   );
}

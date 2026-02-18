import Image from "next/image";
import AppearFromBottom from "@/components/ui/AppearFromBottom";
export default function Poles({ poles }) {
   return (
      <section id="poles" className="py-10 md:py-20 bg-neutral-100">
         <div className="wrapper">
            <h2 className="title-h2 mb-5">{poles.title}</h2>
            <p>{poles.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-15">
               {poles.poles_items.map((pole) => (
                  <div
                     key={pole.title}
                     className="bg-white p-5 md:p-10 nth-2:bg-accent hover:scale-105 transition-all duration-300"
                  >
                     <AppearFromBottom>
                        <Image
                           src={pole.picto.url}
                           alt={pole.title}
                           width={pole.picto.width}
                           height={pole.picto.height}
                           className="h-16 w-auto mx-auto"
                        />
                     </AppearFromBottom>
                     <h3 className="text-lg text-center font-bold my-5">
                        {pole.title}
                     </h3>
                     <div
                        className="prose"
                        dangerouslySetInnerHTML={{ __html: pole.content }}
                     />
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}

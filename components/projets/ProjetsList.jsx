import { Link } from "next-view-transitions";
import Image from "next/image";

export default function ProjetsList({ projets }) {
   if (!projets || projets.length === 0) {
      return (
         <div className="wrapper py-14">
            <p>Aucun projet trouvé.</p>
         </div>
      );
   }

   return (
      <section className="wrapper py-14">
         <h1 className="title-h2 mb-10">Nos Projets</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projets.map((projet) => (
               <Link
                  key={projet.id}
                  href={`/projets/${projet.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
               >
                  {projet.featuredImage && (
                     <div className="relative h-48 overflow-hidden">
                        <Image
                           src={projet.featuredImage.url}
                           alt={projet.featuredImage.alt || projet.title}
                           width={projet.featuredImage.width || 400}
                           height={projet.featuredImage.height || 300}
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                     </div>
                  )}
                  <div className="p-5">
                     <h2 className="text-xl font-bold text-primary mb-2">
                        {projet.title}
                     </h2>
                  </div>
               </Link>
            ))}
         </div>
      </section>
   );
}

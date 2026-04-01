import { QuinconceImageGallery } from "@/components/ui/Quinconce";
import YellowShape from "@/components/ui/YellowShape";

export default function ProjetsList({ projects }) {
   if (!projects || projects.length === 0) {
      return (
         <div className="wrapper py-14">
            <p>Aucun projet trouvé.</p>
         </div>
      );
   }

   return (
      <section className="py-14 relative">
         <YellowShape top right />
         <div className="wrapper">
            <h1 className="title-h2 mb-10">Nos Projets</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {projects.map(
                  (
                     {
                        project_title,
                        project_description,
                        project_images = [],
                     },
                     index,
                  ) => (
                     <article
                        key={index}
                        className="group block bg-primary text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                     >
                        <div className="p-5">
                           <h2 className="text-xl font-bold text-accent mb-2">
                              {project_title}
                           </h2>
                           {project_images.length > 0 && (
                              <QuinconceImageGallery
                                 images={project_images}
                                 title={project_title}
                                 className="w-full md:w-full mb-4"
                              />
                           )}
                           <div
                              dangerouslySetInnerHTML={{
                                 __html: project_description,
                              }}
                              className="text-white prose"
                           />
                        </div>
                     </article>
                  ),
               )}
            </div>
         </div>
      </section>
   );
}

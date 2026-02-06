import Image from "next/image";

export default function ProjetSingle({ projet }) {
   console.log(projet);
   return (
      <article className="wrapper py-14">
         {projet.featuredImage && (
            <div className="relative w-full h-[400px] md:h-[600px] mb-8 rounded-xl overflow-hidden">
               <Image
                  src={projet.featuredImage.url}
                  alt={projet.featuredImage.alt || projet.title}
                  width={projet.featuredImage.width || 1200}
                  height={projet.featuredImage.height || 800}
                  className="w-full h-full object-cover"
               />
            </div>
         )}

         <h1 className="title-h2 mb-6">{projet.title}</h1>

         {projet.content && (
            <div
               className="prose max-w-none"
               dangerouslySetInnerHTML={{ __html: projet.content }}
            />
         )}
      </article>
   );
}

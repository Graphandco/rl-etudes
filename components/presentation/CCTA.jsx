import Image from "next/image";
export default function CCTA({ ccta }) {
   console.log(ccta);
   return (
      <section className="wrapper my-12 md:my-15 lg:my-25 grid grid-cols-1 md:grid-cols-[2fr_1fr] items-center gap-10">
         <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: ccta.ccta_content }}
         />
         <Image
            src={ccta.ccta_image.url}
            alt={ccta.ccta_image.alt}
            width={ccta.ccta_image.width}
            height={ccta.ccta_image.height}
            className="w-48 h-auto mx-auto"
         />
      </section>
   );
}

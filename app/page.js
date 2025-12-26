import TextAppear from "@/components/TextAppear";

export default function Home() {
   return (
      <section className="hero wrapper mt-5">
         <h1 className="text-4xl font-bold text-primary">Hello World !!!</h1>
         <p className="text-lg">This is a paragraphe</p>
         <button className="bg-accent text-primary font-semibold px-4 py-2 rounded-md">
            Click me
         </button>
         <div className="mt-5 max-w-2xl mx-auto bg-white">
            <TextAppear delay={0.5} animationType="blur">
               <p>
                  Loren30Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Quisquam, quos. Loren30Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Quisquam, quos. Loren30Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                  quos. Loren30Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quisquam, quos. Loren30Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Quisquam, quos.
               </p>
            </TextAppear>
         </div>
      </section>
   );
}

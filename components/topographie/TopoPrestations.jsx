import Quinconce from "@/components/ui/Quinconce";

export default function TopoPrestations({ prestations }) {
   return (
      <section id="bePrestations" className="py-10 md:py-20">
         <div className="wrapper">
            <h2 className="title-h2 mb-5">Découvrez nos prestations</h2>
            {prestations.activites.map((prestation, index) => (
               <Quinconce
                  key={index}
                  right={index % 2 === 0}
                  left={index % 2 === 1}
                  images={prestation.images}
                  title={prestation.title}
                  content={prestation.content}
                  className="to-scroll"
               />
            ))}
         </div>
      </section>
   );
}

import Quinconce from "@/components/ui/Quinconce";

export default function BePrestations({ prestations }) {
   return (
      <section id="bePrestations" className="py-10 md:py-20">
         <div className="wrapper">
            <h2 className="title-h2 mb-5">Nos prestations</h2>
            {prestations.activites.map((prestation, index) => (
               <Quinconce
                  key={prestation.index}
                  right={index % 2 === 0}
                  left={index % 2 === 1}
                  image={prestation.image}
                  title={prestation.title}
                  content={prestation.content}
                  className="to-scroll"
               />
            ))}
         </div>
      </section>
   );
}

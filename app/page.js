import Image from "next/image";

export default function Home() {
   return (
      <section className="hero wrapper">
         <h1 className="text-4xl font-bold text-primary">Hello World !!!</h1>
         <p className="text-lg">This is a paragraph</p>
         <button className="bg-accent text-primary font-semibold px-4 py-2 rounded-md">
            Click me
         </button>
      </section>
   );
}

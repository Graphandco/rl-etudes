import Image from "next/image";

export default function Home() {
   return (
      <section className="hero container mx-auto">
         <h1 className="text-4xl font-bold">Hello World !!!</h1>
         <p className="text-lg">This is a paragraph</p>
         <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Click me
         </button>
      </section>
   );
}

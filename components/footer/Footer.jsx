import { Link } from "next-view-transitions";
import Image from "next/image";
export default function Footer({}) {
   return (
      <footer className="bg-primary text-white isolate sticky bottom-0 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[url(/hero/bg-topo.webp)] before:bg-cover before:bg-center before:bg-no-repeat before:-z-10 before:opacity-40">
         <div className="wrapper pt-5 pb-3 sm:pt-8 md:pt-12">
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
               <div className="space-y-1">
                  <Image
                     src="/logo.webp"
                     alt="RL Etudes"
                     width={598}
                     height={247}
                     className="w-32 h-auto"
                  />
                  <div className="text-xl uppercase text-accent">RL Études</div>
               </div>
               <div className="md:space-y-2 border-l border-accent pl-4">
                  <div className="text-xl font-semibold text-accent">
                     Nous trouver
                  </div>
                  <div>
                     <div>7 rue des Alpes</div>
                     <div>68127 Niederentzen</div>
                  </div>
               </div>
               <div className="md:space-y-2 border-l border-accent pl-4">
                  <div className="text-xl font-semibold text-accent">
                     Nous contacter
                  </div>
                  <div>
                     <Link
                        className="block hover:text-accent"
                        href="tel:0389454436"
                     >
                        03 89 45 44 36
                     </Link>
                     <Link
                        className="block hover:text-accent"
                        href="mailto:contact@rl-etudes.fr"
                     >
                        contact@rl-etudes.fr
                     </Link>
                  </div>
               </div>
            </div>
            <Link
               href="https://www.facebook.com/pages/RL%20Etudes/113937037871272/#"
               target="_blank"
            >
               <svg
                  className="hover:fill-accent fill-white w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
               >
                  <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5l0-170.3-52.8 0 0-78.2 52.8 0 0-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4l0 70.8c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2l0 27.8 83.6 0-14.4 78.2-69.3 0 0 175.9C413.8 494.8 512 386.9 512 256z" />
               </svg>
            </Link>

            <div className="flex flex-wrap gap-x-2 justify-center md:justify-end items-center text-sm transition-colors">
               <Link className="hover:text-accent" href="/mentions-legales">
                  Mentions légales
               </Link>
               <Link
                  className="hover:text-accent"
                  href="/politique-de-confidentialite"
               >
                  Politique de confidentialité
               </Link>
               <Link
                  href="https://graphandco.com"
                  target="_blank"
                  className="flex gap-2 items-center hover:text-accent transition-colors"
               >
                  <Image
                     src="/logo-graphandco.svg"
                     alt="Graph and Co"
                     width={20}
                     height={20}
                  />
                  Graph and Co - {new Date().getFullYear()} &copy;
               </Link>
            </div>
         </div>
      </footer>
   );
}

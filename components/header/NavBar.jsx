import Image from "next/image";
import Link from "next/link";
export default function NavBar() {
   return (
      <nav className="wrapper py-2 flex justify-between items-center">
         <Link href="/">
            <Image src="/logo.webp" alt="Logo" width={120} height={120} />
         </Link>
         <ul className="flex items-center gap-4">
            <li>
               <Link href="/">Accueil</Link>
            </li>
            <li>
               <Link href="/">About</Link>
            </li>
            <li>
               <Link href="/contact">Contact</Link>
            </li>
         </ul>
      </nav>
   );
}

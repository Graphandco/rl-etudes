"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

export default function NavBar({ links = [] }) {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const pathname = usePathname();

   const defaultLinks = [
      { href: "/", label: "Accueil" },
      { href: "/presentation", label: "Présentation" },
      { href: "/bureau-detudes", label: "Bureau d'études" },
      { href: "/topographie", label: "Topographie" },
      { href: "/contact", label: "Contact" },
   ];

   const menuLinks = links.length > 0 ? links : defaultLinks;

   return (
      <>
         <nav className="wrapper py-2 flex justify-between items-center">
            <Link href="/">
               <Image src="/logo.webp" alt="Logo" width={120} height={120} />
            </Link>

            {/* Menu Desktop */}
            <ul className="hidden md:flex items-center gap-4">
               {menuLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                     <li key={link.label}>
                        <Link
                           href={link.href}
                           className={`transition-colors ${
                              isActive
                                 ? "text-primary font-semibold"
                                 : "hover:text-primary font-semibold"
                           }`}
                        >
                           {link.label}
                        </Link>
                     </li>
                  );
               })}
            </ul>

            {/* Bouton Menu Mobile */}
            <button
               onClick={() => setIsMobileMenuOpen(true)}
               aria-label="Ouvrir le menu"
               className="md:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
               <Menu size={24} />
            </button>
         </nav>

         {/* Menu Mobile */}
         <MobileMenu
            links={menuLinks}
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
         />
      </>
   );
}

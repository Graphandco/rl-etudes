"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const menuVariants = {
   closed: {
      x: "100%",
      // scale: 0.9,
      opacity: 0,
      transition: {
         type: "spring",
         damping: 30,
         stiffness: 300,
         staggerChildren: 0.05,
         staggerDirection: -1,
      },
   },
   open: {
      x: 0,
      // scale: 1,
      opacity: 1,
      transition: {
         type: "spring",
         damping: 25,
         stiffness: 200,
         staggerChildren: 0.1,
         delayChildren: 0.2,
      },
   },
};

const linkVariants = {
   closed: {
      x: 50,
      opacity: 0,
      scale: 0.8,
   },
   open: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
         type: "spring",
         damping: 20,
         stiffness: 300,
      },
   },
};

const overlayVariants = {
   closed: {
      opacity: 0,
      backdropFilter: "blur(0px)",
   },
   open: {
      opacity: 1,
      backdropFilter: "blur(4px)",
      transition: {
         duration: 0.3,
      },
   },
};

export default function MobileMenu({ links, isOpen, onClose }) {
   const pathname = usePathname();

   return (
      <AnimatePresence>
         {isOpen && (
            <>
               {/* Overlay */}
               <motion.div
                  variants={overlayVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="fixed inset-0 bg-black/50 z-40"
                  onClick={onClose}
               />

               {/* Menu */}
               <motion.div
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto flex flex-col"
               >
                  <div className="p-6 flex-1">
                     {/* Header avec bouton fermer */}
                     <div className="flex justify-end mb-8">
                        <button
                           onClick={onClose}
                           aria-label="Fermer le menu"
                           className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                        >
                           <X size={24} />
                        </button>
                     </div>

                     {/* Liste des liens */}
                     <nav>
                        <motion.ul
                           variants={menuVariants}
                           initial="closed"
                           animate="open"
                           className="flex flex-col gap-4"
                        >
                           {links.map((link, index) => {
                              const isActive = pathname === link.href;
                              return (
                                 <motion.li
                                    key={link.label}
                                    variants={linkVariants}
                                    whileHover={{ x: 8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                 >
                                    <Link
                                       href={link.href}
                                       onClick={onClose}
                                       className={`block py-3 px-4 transition-colors relative ${
                                          isActive
                                             ? "text-primary font-semibold"
                                             : "text-neutral-700"
                                       }`}
                                    >
                                       {link.label}
                                    </Link>
                                 </motion.li>
                              );
                           })}
                        </motion.ul>
                     </nav>
                  </div>

                  {/* Logo en bas */}
                  <div className="p-6 border-t border-neutral-200">
                     <Link href="/" onClick={onClose}>
                        <Image
                           src="/logo.webp"
                           alt="Logo"
                           width={120}
                           height={120}
                           className="mx-auto"
                        />
                     </Link>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
   );
}

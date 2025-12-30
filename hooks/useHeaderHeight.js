"use client";
import { useEffect, useState, useRef } from "react";

export default function useHeaderHeight() {
   const [headerHeight, setHeaderHeight] = useState(0);
   const headerRef = useRef(null);

   useEffect(() => {
      // Obtenir la référence au header une seule fois
      if (!headerRef.current) {
         headerRef.current = document.querySelector("header");
      }

      const header = headerRef.current;
      if (!header) return;

      const calculateHeaderHeight = () => {
         if (header) {
            setHeaderHeight(header.offsetHeight);
         }
      };

      // Calculer au chargement
      calculateHeaderHeight();

      // Recalculer au redimensionnement
      window.addEventListener("resize", calculateHeaderHeight);

      // Observer les changements de taille du header
      const resizeObserver = new ResizeObserver(calculateHeaderHeight);
      resizeObserver.observe(header);

      return () => {
         window.removeEventListener("resize", calculateHeaderHeight);
         resizeObserver.disconnect();
      };
   }, []);

   return headerHeight;
}

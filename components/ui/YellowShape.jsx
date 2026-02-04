import { cn } from "@/lib/utils";

export default function YellowShape({ top, right, bottom, left }) {
   // Déterminer les classes de position
   const positionClasses = [];
   if (top) positionClasses.push("top-0");
   if (right) positionClasses.push("right-0");
   if (bottom) positionClasses.push("bottom-0");
   if (left) positionClasses.push("left-0");

   // Si aucune position n'est spécifiée, utiliser bottom right par défaut
   if (positionClasses.length === 0) {
      positionClasses.push("bottom-0", "right-0");
   }

   // Déterminer le clipPath selon les positions
   const getClipPath = () => {
      const hasTop = top;
      const hasRight = right;
      const hasBottom = bottom;
      const hasLeft = left;

      // Si aucune position n'est spécifiée, utiliser bottom right par défaut
      if (!hasTop && !hasRight && !hasBottom && !hasLeft) {
         return "polygon(50% 0, 100% 0, 100% 100%, 0% 100%)";
      }

      // top right
      if (hasTop && hasRight) {
         return "polygon(0 0, 100% 0, 100% 100%, 50% 100%)";
      }
      // top left
      if (hasTop && hasLeft) {
         return "polygon(0 0, 100% 0, 50% 100%, 0% 100%)";
      }
      // bottom right
      if (hasBottom && hasRight) {
         return "polygon(50% 0, 100% 0, 100% 100%, 0% 100%)";
      }
      // bottom left
      if (hasBottom && hasLeft) {
         return "polygon(0 0, 50% 0, 100% 100%, 0% 100%)";
      }

      // Fallback par défaut (bottom right)
      return "polygon(50% 0, 100% 0, 100% 100%, 0% 100%)";
   };

   return (
      <div
         className={cn("absolute w-5/6 h-1/2 bg-accent -z-10", positionClasses)}
         style={{ clipPath: getClipPath() }}
      ></div>
   );
}

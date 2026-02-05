import { Link } from "next-view-transitions";
import { Phone, MapPin } from "lucide-react";
export default function Topbar() {
   return (
      <div className="bg-primary text-white">
         <div className="wrapper py-2 flex flex-col sm:flex-row sm:gap-4 sm:items-center text-sm sm:text-base">
            <Link
               href="tel:0389454436"
               className="flex items-center gap-1 cursor-pointer hover:text-accent"
            >
               <Phone size={14} className="text-accent" />
               <span className="text-sm">03 89 45 44 36</span>
            </Link>
            <div className="flex items-center gap-1">
               <MapPin size={14} className="text-accent" />
               <span className="text-sm">
                  7 rue des Alpes, 68127 Niederentzen
               </span>
            </div>
         </div>
      </div>
   );
}

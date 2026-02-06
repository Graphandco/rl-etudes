import { getAllWordpressProjets } from "@/actions/getWordpressProjets";
import ProjetsList from "@/components/projets/ProjetsList";

export default async function ProjetsPage() {
   const projets = await getAllWordpressProjets();

   return (
      <div>
         <ProjetsList projets={projets} />
      </div>
   );
}

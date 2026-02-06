import { getWordpressProjet, getAllWordpressProjets } from "@/actions/getWordpressProjets";
import ProjetSingle from "@/components/projets/ProjetSingle";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
   try {
      const projets = await getAllWordpressProjets();
      return projets.map((projet) => ({
         slug: projet.slug,
      }));
   } catch (error) {
      console.error("Erreur lors de la génération des paramètres statiques:", error);
      return [];
   }
}

export async function generateMetadata({ params }) {
   const { slug } = await params;

   try {
      const projet = await getWordpressProjet({ slug });

      return {
         title: projet.seo?.title || projet.title,
         description: projet.seo?.metaDesc || "",
      };
   } catch (error) {
      return {
         title: "Projet",
      };
   }
}

export default async function ProjetPage({ params }) {
   const { slug } = await params;

   try {
      const projet = await getWordpressProjet({ slug });

      return <ProjetSingle projet={projet} />;
   } catch (error) {
      console.error("Erreur lors de la récupération du projet:", error);
      notFound();
   }
}

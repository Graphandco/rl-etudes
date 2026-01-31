"use server";

const GRAPHQL_BASE_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL; // ex: https://site.com/graphql
const REST_BASE_URL = process.env.NEXT_PUBLIC_WP_REST; // ex: https://site.com/wp-json/wp/v2
const REVALIDATE_TIME = Number(process.env.REVALIDATE_TIME) || 300;

/**
 * Récupère une page ou un post WordPress avec GraphQL pour les champs de base et REST pour les champs ACF
 * @param {Object} options
 * @param {string|number} options.id - ID de la page/post
 * @param {'page'|'post'} [options.type='page'] - type de contenu
 */
export async function getWordpressContent({ id, type = "page" }) {
   if (!id) throw new Error("L'ID est requis");

   if (!GRAPHQL_BASE_URL) {
      throw new Error(
         "La variable d'environnement NEXT_PUBLIC_WP_GRAPHQL n'est pas définie"
      );
   }

   if (!REST_BASE_URL) {
      throw new Error(
         "La variable d'environnement NEXT_PUBLIC_WP_REST n'est pas définie"
      );
   }

   // 1️⃣ GraphQL pour récupérer les champs de base (title, content, seo)
   const graphqlQuery = `
    query GetContent($id: ID!) {
      ${type}(id: $id, idType: DATABASE_ID) {
        title
        content(format: RENDERED)
        seo: seo {
          title
          metaDesc
          metaRobotsNoindex
        }
      }
    }
  `;

   const graphqlRes = await fetch(GRAPHQL_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: graphqlQuery, variables: { id } }),
      next: { revalidate: REVALIDATE_TIME },
   });

   if (!graphqlRes.ok) throw new Error("Erreur lors de la requête GraphQL");

   const { data: graphqlData } = await graphqlRes.json();
   const graphQLContent = graphqlData[type];

   // 2️⃣ REST uniquement pour récupérer tous les champs ACF
   const restRes = await fetch(`${REST_BASE_URL}/${type}s/${id}`, {
      next: { revalidate: REVALIDATE_TIME },
   });

   if (!restRes.ok) {
      throw new Error(
         `Erreur lors de la récupération des champs ACF via REST (${restRes.status})`
      );
   }

   const restData = await restRes.json();
   const acfFields = restData.acf || {};

   // 3️⃣ Retourne un objet combiné : GraphQL pour les champs de base + REST pour les champs ACF
   return {
      title: graphQLContent.title,
      content: graphQLContent.content,
      seo: graphQLContent.seo,
      // Fusionne tous les champs ACF directement dans l'objet retourné
      ...acfFields,
      // Garde aussi une référence à tous les champs ACF dans 'acf' pour référence
      acf: acfFields,
   };
}

/**
 * Récupère les coordonnées depuis les options ACF WordPress via GraphQL
 * @returns {Promise<{adresse: string, telephone: string, email: string}>}
 */
export async function getWordpressCoordonnees() {
   if (!GRAPHQL_BASE_URL) {
      throw new Error(
         "La variable d'environnement NEXT_PUBLIC_WP_GRAPHQL n'est pas définie"
      );
   }

   // Requête GraphQL pour récupérer les options ACF coordonnees
   const graphqlQuery = `
    query GetCoordonnees {
      coordonnees {
        coordonnes {
          adresse
          email
          telephone
        }
      }
    }
  `;

   const graphqlRes = await fetch(GRAPHQL_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: graphqlQuery }),
      next: { revalidate: REVALIDATE_TIME },
   });

   if (!graphqlRes.ok) {
      throw new Error("Erreur lors de la requête GraphQL pour les coordonnées");
   }

   const { data } = await graphqlRes.json();

   if (!data?.coordonnees?.coordonnes) {
      throw new Error("Les options ACF coordonnees n'ont pas été trouvées");
   }

   return {
      adresse: data.coordonnees.coordonnes.adresse || "",
      telephone: data.coordonnees.coordonnes.telephone || "",
      email: data.coordonnees.coordonnes.email || "",
   };
}

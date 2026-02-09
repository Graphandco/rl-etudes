"use server";

const GRAPHQL_BASE_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL;
const REST_BASE_URL = process.env.NEXT_PUBLIC_WP_REST;
const REVALIDATE_TIME = Number(process.env.REVALIDATE_TIME) || 300;

/**
 * Récupère un projet WordPress par ID ou slug
 * @param {Object} options
 * @param {string|number} options.id - ID du projet
 * @param {string} [options.slug] - Slug du projet
 */
export async function getWordpressProjet({ id, slug }) {
   if (!id && !slug) {
      throw new Error("L'ID ou le slug est requis");
   }

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

   // 1️⃣ GraphQL pour récupérer les champs de base
   const idType = id ? "DATABASE_ID" : "SLUG";
   const identifier = id || slug;

   const graphqlQuery = `
    query GetProjet($id: ID!, $idType: ProjetIdType!) {
      projet(id: $id, idType: $idType) {
        id
        databaseId
        slug
        title
        content(format: RENDERED)
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
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
      body: JSON.stringify({
         query: graphqlQuery,
         variables: { id: identifier, idType },
      }),
      next: { revalidate: REVALIDATE_TIME },
   });

   if (!graphqlRes.ok) throw new Error("Erreur lors de la requête GraphQL");

   const { data: graphqlData, errors: graphqlErrors } = await graphqlRes.json();

   if (graphqlErrors) {
      console.error("Erreurs GraphQL:", graphqlErrors);
   }

   const graphQLContent = graphqlData?.projet;

   if (!graphQLContent) {
      throw new Error("Projet non trouvé");
   }

   // 2️⃣ REST pour récupérer les champs ACF
   // Utiliser databaseId (ID numérique) pour REST, pas l'ID GraphQL
   const projetId = graphQLContent.databaseId || graphQLContent.id;

   let acfFields = {};

   // Essayer d'abord avec l'ID
   let restRes = await fetch(`${REST_BASE_URL}/projets/${projetId}`, {
      next: { revalidate: REVALIDATE_TIME },
   });

   // Si l'ID ne fonctionne pas, essayer avec le slug
   if (!restRes.ok && graphQLContent.slug) {
      restRes = await fetch(
         `${REST_BASE_URL}/projets?slug=${graphQLContent.slug}`,
         {
            next: { revalidate: REVALIDATE_TIME },
         }
      );

      if (restRes.ok) {
         const restDataArray = await restRes.json();
         if (restDataArray && restDataArray.length > 0) {
            acfFields = restDataArray[0].acf || {};
         }
      }
   } else if (restRes.ok) {
      const restData = await restRes.json();
      acfFields = restData.acf || {};
   } else {
      // Si REST échoue, on continue sans ACF plutôt que de faire échouer la requête
      console.warn(
         `Impossible de récupérer les champs ACF via REST (${
            restRes.status
         }) pour le projet ${
            projetId || graphQLContent.slug
         }. Les données de base seront retournées sans ACF.`
      );
   }

   // 3️⃣ Retourne un objet combiné
   return {
      id: graphQLContent.id,
      slug: graphQLContent.slug,
      title: graphQLContent.title,
      content: graphQLContent.content,
      seo: graphQLContent.seo,
      featuredImage: graphQLContent.featuredImage?.node
         ? {
              url: graphQLContent.featuredImage.node.sourceUrl,
              alt: graphQLContent.featuredImage.node.altText || "",
              width:
                 graphQLContent.featuredImage.node.mediaDetails?.width || null,
              height:
                 graphQLContent.featuredImage.node.mediaDetails?.height || null,
           }
         : null,
      // Fusionne tous les champs ACF
      ...acfFields,
      acf: acfFields,
   };
}

/**
 * Récupère tous les projets WordPress
 * @returns {Promise<Array>} Liste de tous les projets
 */
export async function getAllWordpressProjets() {
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

   // 1️⃣ GraphQL pour récupérer la liste des projets
   const graphqlQuery = `
    query GetAllProjets {
      projets(first: 100) {
        nodes {
          id
          databaseId
          slug
          title
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
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
      throw new Error("Erreur lors de la requête GraphQL");
   }

   const { data } = await graphqlRes.json();
   const projets = data.projets?.nodes || [];

   // 2️⃣ Pour chaque projet, récupérer les champs ACF via REST
   const projetsWithACF = await Promise.all(
      projets.map(async (projet) => {
         try {
            // Utiliser databaseId (ID numérique) pour REST, pas l'ID GraphQL
            const projetId = projet.databaseId || projet.id;
            const restRes = await fetch(
               `${REST_BASE_URL}/projets/${projetId}`,
               {
                  next: { revalidate: REVALIDATE_TIME },
               }
            );

            if (restRes.ok) {
               const restData = await restRes.json();
               return {
                  id: projet.id,
                  slug: projet.slug,
                  title: projet.title,
                  featuredImage: projet.featuredImage?.node
                     ? {
                          url: projet.featuredImage.node.sourceUrl,
                          alt: projet.featuredImage.node.altText || "",
                          width:
                             projet.featuredImage.node.mediaDetails?.width ||
                             null,
                          height:
                             projet.featuredImage.node.mediaDetails?.height ||
                             null,
                       }
                     : null,
                  ...(restData.acf || {}),
               };
            }
         } catch (error) {
            console.error(
               `Erreur lors de la récupération des ACF pour le projet ${projet.id}:`,
               error
            );
         }

         // Retourner les données de base si les ACF échouent
         return {
            id: projet.id,
            slug: projet.slug,
            title: projet.title,
            featuredImage: projet.featuredImage?.node
               ? {
                    url: projet.featuredImage.node.sourceUrl,
                    alt: projet.featuredImage.node.altText || "",
                    width:
                       projet.featuredImage.node.mediaDetails?.width || null,
                    height:
                       projet.featuredImage.node.mediaDetails?.height || null,
                 }
               : null,
         };
      })
   );

   return projetsWithACF;
}

# Build stage
FROM node:26-alpine AS builder

WORKDIR /app

# Arguments de build pour les variables d'environnement
ARG NEXT_PUBLIC_WP_GRAPHQL
ARG NEXT_PUBLIC_WP_REST
ARG NEXT_PUBLIC_MATOMO_URL
ARG NEXT_PUBLIC_MATOMO_SITE_ID

# Convertir les ARG en ENV pour qu'elles soient disponibles au build Next.js
ENV NEXT_PUBLIC_WP_GRAPHQL=$NEXT_PUBLIC_WP_GRAPHQL
ENV NEXT_PUBLIC_WP_REST=$NEXT_PUBLIC_WP_REST
ENV NEXT_PUBLIC_MATOMO_URL=$NEXT_PUBLIC_MATOMO_URL
ENV NEXT_PUBLIC_MATOMO_SITE_ID=$NEXT_PUBLIC_MATOMO_SITE_ID

# Copier uniquement les fichiers de dépendances d'abord (cache Docker)
COPY package*.json ./
RUN npm ci

# Copier le reste du code source
COPY . .

# Build Next.js (génère .next/standalone)
RUN npm run build

# Runtime stage — image minimale via output standalone
FROM node:26-alpine AS runner

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3007
ENV HOSTNAME=0.0.0.0

# Assets publics + sortie standalone (deps tracées uniquement)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3007

CMD ["node", "server.js"]

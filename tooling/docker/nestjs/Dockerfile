FROM node:22-alpine AS base
ARG PACKAGE
ENV PACKAGE=${PACKAGE}
WORKDIR /usr/app

#
# workspace
#

FROM base AS workspace

COPY ./ ./
RUN npx turbo@2.1.3 prune ${PACKAGE} --docker

# add all prisma files to turbo purned output
RUN cd /usr/app/out/full && mkdir ../prisma && find . -type d -name "prisma" -exec cp -r --parents {} ../prisma \;

#
# development
#

FROM base AS development
RUN apk add --no-cache python3 make g++ tree
ENV NODE_ENV=development

COPY --from=workspace /usr/app/out/json/ ./
RUN npm install

COPY --from=workspace /usr/app/out/prisma/ ./
COPY --from=workspace /usr/app/out/full/turbo.json ./
RUN npm run db:generate

COPY --from=workspace /usr/app/out/full/ ./
RUN npx turbo run build --filter=${PACKAGE}...

#
# production
#

FROM base AS production
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 user
RUN chown -R user:nodejs /usr/app
USER user

COPY --from=development --chown=user:nodejs /usr/app ./
RUN npm i -g cross-env
RUN npm prune --omit=dev

CMD ["npm", "run", "start:prod", "-w", "${PACKAGE}"]
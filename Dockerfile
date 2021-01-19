FROM node:14 as environment

ENV HOME_DIR=/app
COPY [".", "${HOME_DIR}/"]

FROM environment AS build

COPY ["./package.json", "yarn.lock", "${HOME_DIR}/"]
WORKDIR "${HOME_DIR}"
RUN yarn install --frozen-lockfile --network-timeout 100000

FROM build as test

COPY --from=build "${HOME_DIR}/node_modules" "${HOME_DIR}/node_modules"
COPY --from=environment "${HOME_DIR}/" "${HOME_DIR}/"

WORKDIR "${HOME_DIR}/"
RUN yarn test

FROM test as app
COPY --from=test "${HOME_DIR}/package.json" "${HOME_DIR}/"
COPY --from=test "${HOME_DIR}/.env*" "${HOME_DIR}/"
COPY --from=test "${HOME_DIR}/node_modules" "${HOME_DIR}/node_modules"
COPY --from=test "${HOME_DIR}/src" "${HOME_DIR}/src"

EXPOSE 3000
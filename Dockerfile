FROM node:19-slim

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN ["npm", "install", "--force --frozen-lockfile"]

ADD . /app/
RUN rm package-lock.json

RUN npm config rm proxy
RUN npm config rm https-proxy
RUN rm -rf /root/.npm/_cacache
RUN npm cache clean --force
RUN npx nuxi cleanup
RUN npm run build

ENV HOST 0.0.0.0
ENV PORT 3001

EXPOSE 3001
CMD [ "npm", "run", "preview" ]
# RUN npm run preview

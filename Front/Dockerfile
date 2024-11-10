FROM node:20

WORKDIR /frontDirectory

COPY src/package.json ./

RUN npm install

COPY src ./

EXPOSE 4200

CMD ["npm","run", "start"]
FROM node:20

WORKDIR /mySecondFolder

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3085

CMD ["node","jwtToken"]
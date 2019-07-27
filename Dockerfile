FROM node:10.16-alpine
RUN apk add python make g++ libc-dev pkgconfig gcc
ENV NODE_ENV production
ENV PORT 3000
ENV CENTRE_PASTEUR_YAOUNDE_BUCKET healthstack-centrepasteur-yaounde
ENV AWS_ACCESS_KEY_ID AKIAXZQNA7IQJILJLEPO
ENV AWS_SECRET_ACCESS_KEY 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
ENV REGION eu-west-1
ENV SENDER_EMAIL healthstacker@gmail.com
ENV SESSION_SECRET fomeneodiwuor
ENV AFRICAS_TALKING_API_KEY d8a3e2bb31803d5c7898d954ff9a8d6415a8b5da11119d2ea6a5dfe1fcab6f53
ENV AFRICAS_TALKING_USERNAME healthstacker
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
CMD npm start
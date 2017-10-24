FROM node:8.7.0

ADD ./ /seamless-ai-challenge/server

WORKDIR /seamless-ai-challenge/server

EXPOSE 3000

ENV NODE_ENV production

ENTRYPOINT [ "node", "." ]

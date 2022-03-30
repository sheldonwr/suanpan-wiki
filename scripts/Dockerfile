ARG ARCH="amd64"
FROM registry.xuelangyun.com/shuzhi-$ARCH/node_sdk_base:latest
WORKDIR /home/app/

RUN mkdir -p /home/app/suanpan-wiki-server
COPY packages/suanpan-wiki-server ./suanpan-wiki-server
RUN cd suanpan-wiki-server
RUN npm i --only=production

CMD [ "bash" ]
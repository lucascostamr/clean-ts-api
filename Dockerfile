FROM node:21.6.1-alpine3.19
WORKDIR /app
COPY ./package* .
CMD [\
    "sh", "-c", "\
    apk add git &&\
    npm i &&\
    echo '\n\nITS ALIVE' &&\
    sh"\
]
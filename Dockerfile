ARG version
FROM amazonlinux:$version
WORKDIR /app
COPY ./package* .
CMD [\
    "sh", "-c", "\
    yum upgrade &&\
    yum -y install nodejs git tar &&\
    npm i &&\
    curl $MONGOMS_DOWNLOAD_URL | tar xzv -C './node_modules/.cache/mongodb-memory-server' &&\
    echo '\n\nITS ALIVE' &&\
    sh"\
]

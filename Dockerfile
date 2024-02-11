ARG version
FROM amazonlinux:$version
WORKDIR /app
COPY ./package* .
CMD [\
    "sh", "-c", "\
    yum upgrade &&\
    yum -y install nodejs git &&\
    npm i &&\
    echo '\n\nITS ALIVE' &&\
    sh"\
]

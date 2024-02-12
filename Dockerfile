FROM amazonlinux:2023.3.20240117.0
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

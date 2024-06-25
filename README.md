<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://media.licdn.com/dms/image/C4D12AQFhlYow_0XQBA/article-cover_image-shrink_720_1280/0/1571543597550?e=2147483647&v=beta&t=eMSv7ImH2VbFDl2pcDJA4iFaerOpSghtaz7tJEuDGok" alt="Project logo"></a>
</p>

<h3 align="center">Client Service</h3>

---

## 📝 Table of Contents
- [Getting Started](#getting_started)
- [Deploy](#deploy)
- [Built Using](#built_using)

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

You'll need to have docker installed in your machine:
```
apt-get install docker
```

### Installing
First you'll need to create and set up the .env file in the root directory. Just follow the .env file. 
After setting up the .env file, you'll just need to run:

Linux/Unix:
```
docker compose up --build
```
Windows:
```
docker compose up --build
```
## 🔧 Running the tests <a name = "tests"></a>
Before running, make sure you're inside the docker client service container

### All tests
This will run all tests

```
mvn clean test
```

## 🎈 Deploy <a name="deploy"></a>
To deploy the Application just run, inside the client service container :

```
mvn spring-boot:run
```
or

```
java -jar target/client-service-{version}.jar
```
## ⛏️ Built Using <a name = "built_using"></a>
- [PostgreSQL](https://www.postgresql.org/)
- [SpringBoot](https://spring.io/projects/spring-boot)
- [Java](https://www.java.com)
- [npm](https://www.npmjs.com/)

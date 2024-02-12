<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Project Title</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">
  This API is a hands-on endeavor aimed at building a robust Authentication API for personal learning and skill development. Embracing Clean Architecture, SOLID principles, Test-Driven Development (TDD), TypeScript, Node.js, and MongoDB, this project offers an opportunity to delve into advanced software engineering concepts while creating a secure authentication system. Hope you find it useful!
</p

## 📝 Table of Contents
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
What things you need to install the software and how to install them.

You'll need to have docker in your machine:
```
apt-get install docker
```

### Installing
First you'll need to create and set up the .env file in the root directory. Just follow the .env.example file
After setting up the .env file, you'll just need to run docker:

```
docker compose up --build
```
After docker compose finishes, you can interact with the conatiner running:

Linux/Unix:
```
./start.sh
```
Windows:
```
./start.ps1
```
## 🔧 Running the tests <a name = "tests"></a>
Before running, make sure you're inside the docker container

### All tests
This will run all tests

```
npm test
```
### Unit Tests
This will run just the unit tests

```
npm run test:unit
```
### Integration Tests
This will run just the integration tests

```
npm run test:integration
```
### Coverage Tests
This will check and generate the coverage of tests

```
npm run test:ci
```

## 🎈 Usage <a name="usage"></a>
To use the API just run:

```
npm start
```

## ⛏️ Built Using <a name = "built_using"></a>
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [NodeJs](https://nodejs.org/en/)

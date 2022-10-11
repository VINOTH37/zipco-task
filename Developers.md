# ZipCo User API Challenge


## Pre-requisite

* *NodeJS* : https://nodejs.org/en/download/
* *Docker Desktop*  : https://docs.docker.com/desktop/windows/install/ (Based on OS)
* *Git* : https://git-scm.com/downloads

## Installation & Run

* clone the project/repo
* Do *npm install*  for installing dependencies
* To run in local use *npm run start* - To Start application in local (It needs a mysql database setup in local)

### Running with Docker

* *docker-compose up* (compose and run, it also creates the mysql database)
* *docker-compose down* (Destroy application and mysql containers)

## Running Test Cases

* *To Run Test Cases* - Use launch.json | Mocha Tests

## API's

* *User API's*
    - *Create User*: curl --location --request POST '{host_name}:{port}/api/v1/users/'
    - *Get UserbyId*: curl --location --request GET '{host_name}:{port}/api/v1/users/{userId}'
    - *Get All Users*: curl --location --request GET '{host_name}:{port}/api/v1/users/'

* Account API's
    - *Create Account*: curl --location --request POST '{host_name}:{port}/api/v1/accounts/'
    - *Get AccountbyUserId*: curl --location --request GET '{host_name}:{port}/api/v1/accounts/{userId}'
    - *Get All accounts*: curl --location --request GET '{host_name}:{port}/api/v1/accounts/'

* *Postman Collection*: https://www.getpostman.com/collections/8b64449dfa9cecd6267e

## Software version used

* [Mysql]:5.6, [mysql2]: Used in this project to connect with MySQL DB
* [Node]: v12.0.0
* [Mocha](https://mochajs.org/), [Chai](http://www.chaijs.com/): Used to write test cases and run in local
* [Koa](https://koajs.com/): A new FrameWork designed to be more expressive and more foundation for web appplication and API's
* [Joi](https://joi.dev/ | https://github.com/hapijs/joi): The most powerful schema description language and data validator for JavaScript.
* Language - [TypeScript](https://www.typescriptlang.org/)
* [knex](http://knexjs.org/): Used for SQL Database & Migrations
* [pino]: Very low overhead logger used with koa

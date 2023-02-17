# Auth API
### Introduction
Auth API is an API that allow authenticated users to access their profile.
### Project Support Features
* Users can signup and login to their accounts
* Users can see their account information
* Only the admin can see all users
### Installation Guide
* Clone this repository [here](https://github.com/Timmy-id/auth_api).
* Run yarn to install all dependencies
* You can either work with the default database or use your locally installed MongoDB. Do configure to your choice.
* Create a .env file in your project root and add your variables as seen in the .env.example file.
### Usage
* Run docker-compose up -d to spin up your mongodb and redis database.
* Run yarn start to start the application.
* Connect to the API using Postman on port 8000.
* The API documentation is at `/api-docs`
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/auth/register | To register a new user account |
| POST | /api/auth/login | To login an existing user |
| GET | /api/auth/logout | To logout the current user |
| GET | /api/users/me | To get the profile of the current user |
| GET | /api/users | To retrieve all users (only role admin can do this) |

* To get the admin role, create a new user and change the role from your database to admin. 
### Technologies Used
* [NodeJS](https://nodejs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [ExpressJS](https://www.expresjs.org/)
* [MongoDB](https://www.mongodb.com/)
* [Typegoose](https://typegoose.github.io/typegoose/)
* [redis](https://redis.io/)
* [docker](https://www.docker.com/)
### Authors
* [Oluwatimilehin Idowu](https://github.com/Timmy-id)
### License
This project is available for use under the MIT License.
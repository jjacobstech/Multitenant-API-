# Multitenant API

Built with Express, Typescript, TypeORM,  MongoDB, and Mongoose, and Jest for testing

## Getting Started

1.    Clone the repo
2.    `cd` into the directory
3.    `npm install`
4.   Create a `.env` file in the root directory and add the following:

```
APP_NAME=""
# development , staging , production
APP_ENV="development"
API_PREFIX="/api"
PORT=8000

#JWT SECRET
SESSION_SECRET="your-jwt-secret"

# JWT EXPIRATION TIME
JWT_EXPIRATION=86400

# DATABASE SELECTION - mongodb or postgres
DATABASE=postgres

#MONGODB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.b9x9.mongodb.net/test?retryWrites=true&w=majority

#POSTGRESQL
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=postgres

```

5.
const  { dbUser, db, dbUserPassword, dbHost, dbDialect } = require("../config")

module.exports = {
  "development": {
    "username": dbUser,
    "password": dbUserPassword,
    "database": db,
    "host": dbHost,
    "dialect": dbDialect
  },
  "test": {
    "username": dbUser,
    "password": dbUserPassword,
    "database": db,
    "host": dbHost,
    "dialect": dbDialect
  },
  "production": {
    "username": dbUser,
    "password": dbUserPassword,
    "database": db,
    "host": dbHost,
    "dialect": dbDialect
  }
}

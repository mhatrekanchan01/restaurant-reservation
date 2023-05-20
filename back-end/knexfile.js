/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://xnayikzv:PGokxPwuPHLqx-h83tyc2PESnsd7ySK_@kashin.db.elephantsql.com/xnayikzv",
  DATABASE_URL_DEVELOPMENT = "postgres://hecjvmaw:s6MrhgSJ6a66cj-0w9Dy4doDORolyUif@kashin.db.elephantsql.com/hecjvmaw",
  DATABASE_URL_TEST = "postgres://caxvaexy:EKS8arZnZb0GQ8YW4ZXivhjEySioDrL8@kashin.db.elephantsql.com/caxvaexy",
  DATABASE_URL_PREVIEW = "postgres://ynjtraly:PAIto088wxe69bB-CNLbWBZC8CuULE7I@kashin.db.elephantsql.com/ynjtraly",
  DEBUG,
} = process.env;


module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};

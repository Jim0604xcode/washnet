import type { Knex } from "knex";
import { env_config } from "./env";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: env_config.POSTGRES_DB,
      user:     env_config.POSTGRES_USER,
      password: env_config.POSTGRES_PASSWORD,
      host:env_config.DB_HOST,
      port:env_config.DB_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  test: {
    debug: false,
    client: 'postgresql',
    connection: {
      database: env_config.POSTGRES_DB_TEST,
      user:     env_config.POSTGRES_USER_TEST,
      password: env_config.POSTGRES_PASSWORD_TEST
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  

};

module.exports = config;

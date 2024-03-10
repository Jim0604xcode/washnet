// import {Client} from 'pg';
import {env_config} from './env'

// export const db = new Client({
//     database: env_config.POSTGRES_DB,
//     user: env_config.POSTGRES_USER,
//     password: env_config.POSTGRES_PASSWORD,
//     port:env_config.DB_PORT,
//     host:env_config.DB_HOST
// });
// db.connect().catch(err => {
//     console.error('Failed to connect to database:', err)
// })

import Knex from 'knex'

const knexConfigs = require('./knexfile')
export const knex = Knex(knexConfigs[env_config.KNEX_ENV])


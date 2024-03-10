import { config } from 'dotenv';
import populateEnv from 'populate-env';
import path from 'path';
let p = path.join(__dirname, '../.env')
config({path:p});


export const env_config = {
  PORT: 8080,
  POSTGRES_DB: '',
  POSTGRES_USER: '',
  POSTGRES_PASSWORD: '',
  DB_HOST: '',
  DB_PORT: 5432,
  KNEX_ENV:'',
  POSTGRES_DB_TEST: '',
  POSTGRES_USER_TEST: '',
  POSTGRES_PASSWORD_TEST: '',
};

populateEnv(env_config, { mode: 'halt' });
console.log(env_config);
cd  src && yarn knex init -x ts && cd ..

* create migration folder and file
yarn knex migrate:make <file_name> --knexfile src/knexfile

* create seed folder and file
yarn knex seed:make <file_name> --knexfile src/knexfile

* run migration files
yarn knex migrate:latest --knexfile src/knexfile --env development
yarn knex migrate:down --knexfile src/knexfile --env development


* run seed files
yarn knex seed:run --knexfile src/knexfile --env development


# create user = create role and permission
CREATE USER gordon WITH PASSWORD 'gordon';

# list create role permission list
\h CREATE ROLE

# create role with assign permission
CREATE ROLE gordon WITH SUPERUSER;
ALTER ROLE gordon WITH LOGIN;

# reset password
\password gordon

# drop role
DROP ROLE "gordon";

# list users
\du

# list current user and session_user
select current_user, session_user;

# set current user
set role 'gordon';

# set session user
set session AUTHORIZATION 'gordon';

# Create DB
CREATE DATABASE memo-wall;

# list All DB
\l

# switch DB
\c memo-wall

# get current DB
SELECT current_database();

# login to PSQL
psql -U gordon -W memo-wall


# UPDATE method
db.query(`UPDATE memo SET ${sql_params} WHERE id=$1 AND users_id!=$3 AND id NOT IN (SELECT memo_id FROM like_memo WHERE users_id = $4)`,sql_values)
# sql_params = content=$1,image=$2

# INSERT method
db.query(`INSERT INTO memo (${sql_Obj.sql_field}) values${sql_Obj.sql_params})`,sql_Obj.sql_values)
# sql_field = content,image
# sql_params = ($1,$2),($3,$4)
# sql_values = ["i love hong kong","my_image.jpg","i love hong kong 2","my_image2.jpg"]

# DELETE method
db.query(`DELETE FROM like_memo WHERE memo_id=$1`,[req.body.id])

# SELECT method
db.query(`SELECT memo_id FROM like_memo WHERE users_id = $1 ORDER BY created_at`,[req.session.userId])



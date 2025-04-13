node version :v20.11.0
express
nodemon for local developement.
Database:Postgresql

Steps to run the application
-->Create the database with name studentsvault.
-->Database username as postgres.
-->Database password as changeme.
-->Run the npm install.

Steps to Populating the tables in Database
-->From root direcotory navige to /src using cd src.
-->npx sequelize-cli db:migrate.
Now you can find the populated tables in Database.

Steps to start project 
-->npm start
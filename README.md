# Note_taking_app

Note_taking_app can be used to create notes, update notes, delete notes etc.
There is a login and sign-up option for the users.
There is an about page that contains the different opne source licenses used in the project listed.
There is a settings page where user can adjust the font-size of the application.

# Back End Creation

Back end server was created using the following steps
1.npx express-generator notes_server
2.cd notes_server
3.npm install
4.npm start
To see the back end in a web browser open localhost:3000

If you would like to use a tool that will automatically restart the application whe new changes are made, you can use Nodemon. Install it globally on your system with:
npm install -g nodemon
Then type nodemon to start the application instead of npm start

The following dependencies were installed in backend

## Back End dependencies

npm install mysql2
npm install knex bcrypt jsonwebtoken
npm install dotenv

## To generate JWT token

Using Node.js Crypto Library
If you prefer to generate the key programmatically, you can use Node.js's built-in crypto library:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

or execute node JWT.js file in front-end command prompt after copying JWT.js file

# Front End Creation

npx create-expo-app My_notes
cd My_notes
npx expo start

## Front End Dependencies

npm install axios
npm install -g npm-license-crawler
npm install @react-navigation/native
npm install expo-splash-screen
npm install @react-navigation/stack
npm install @react-native-async-storage/async-storage
npm install expo@51.0.11
npm install expo-font@12.0.7
npm install expo-splash-screen@0.27.5
npm install expo-system-ui@3.0.6
npm install react-native@0.74.2

# Troubleshooting

If you have any issues with the app, contact me at Sandhyakochappu@gmail.com.

# License

MIT open license was used for code licensing purposes.
Free redistribution of software: Anyone can sell giving away the software
Source code can be made available through compiled forms, in programmer-readable formats
People can modify and distributed the software under the same terms and conditions.

# Swagger API creation

script for creating Swagger API documentation can be found at server aPI 'docs' folder, openai.json file. This file contains scripts for different operations performed in the application user login, sign-up, creating notes, updating notes, and deleting notes.
Use the following link in web browser to access the documentation
http://localhost:3000/docs/

# Create tables in database and update tables using knex

1: Set Up Knex.js
First, we need to install Knex.js and the MySQL driver:
npm install knex mysql2

Step 2: Create Knex Configuration inside server aPI
Create a knexfile.js for Knex configuration:and add the following code inside

module.exports = {
development: {
client: 'mysql2',
connection: {
host: 'localhost',
user: 'your_mysql_user',
password: 'your_mysql_password',
database: 'your_database_name'
},
migrations: {
directory: './migrations'
},
seeds: {
directory: './seeds'
}
}
};

Step 3: Initialize Knex and Create Database Connection
Create a file to initialize Knex and export the connection in Server API.

db/knex.js and update with the following code

const knex = require('knex');
const config = require('../../knexfile');

const db = knex(config.development);

module.exports = db;

Step 4: Create Migrations folder
Create migration files for the users and notes tables:
npx knex migrate:make create_users_table
npx knex migrate:make create_notes_table

Update the migration files:

migrations/20220528123000_create_users_table.js

exports.up = function(knex) {
return knex.schema.createTable('users', function(table) {
table.increments('id').primary();
table.string('username').notNullable().unique();
table.string('password').notNullable();
});
};

exports.down = function(knex) {
return knex.schema.dropTable('users');
};

migrations/20220528123100_create_notes_table.js

exports.up = function(knex) {
return knex.schema.createTable('notes', function(table) {
table.increments('id').primary();
table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
table.string('content').notNullable();
});
};

exports.down = function(knex) {
return knex.schema.dropTable('notes');
};

Run the migrations:
npx knex migrate:latest

# Handling secrets

Environment variables: secret keys are set up in .env file

# Generating Licenses with npm-license-crawler

You can generate the licenses.json file using the npm-license-crawler commands:
npm install -g npm-license-crawler
npm-license-crawler --json licenses.json

Run this command in the root of your project, and it will generate a JSON file with all the licenses of your project's dependencies.

### Usage

This project can be used to showcase a portfolio including a home page, About page, Contact page, Resume page and Portfolio page.
Users can use these pages to display their personal details, contact information, qualifications, skills, and the work they have done.

### A list of features and workflow

This website has five main pages. Home, About, Login, Seetings and Sign-up. Home page contains header, footer, hero image,
Footer contains the different tabs.

About page provides a description of different open source licenses used in the project.
In the login screen, user can enter their username and password and login to the application.
Sign-up page contains user sign-up information
Settings page has a slider to adjust the font-size of the app.
Home page contains the details about existing notes, how to create new notes, delete and edit existing notes.

### Application architecture

We have different folders named app for navigating to different pages This folder contains all the main pages of the app.,
tabs folder for contains the main screens of the app.
An assets folder to store images and other local files if any.

Button clicks were handled using 'useState'.

Stylings were done using css style sheets.
.env was created in the root folder and used to store API keys,.
.gitignore file was created to avoid versioning of some files
MIT license is used in this project.

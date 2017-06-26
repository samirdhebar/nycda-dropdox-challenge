# NYCDA Upload Challenge - DropDox

This project is built off of the Auth Example project. You'll find it's been
a little more organized in to separate routes.

Your goal here is to implement the uploading portion of this DropDox app.
All of the changes you'll need are expressed below, but **you should only have to edit routes/dox.js and views/pages/upload.ejs for the main goals**. You're welcome to look around at any other files (This should be a good example project!) But you should not need to edit any other files, unless you try the challenge goals.

## Your Goals

* Get everything running with a fresh database (See "Getting Started" below)
* Create a proper file upload form in `views/pages/upload.ejs`
* It should have a file input with a name of `file` and a submit button
* Handle the submit in a POST endpoint of /upload in `routes/dox.js`
	* Also handle showing an error message if something goes wrong, or they POST without a file
* Add a `multer` upload middleware that handles a single file (with a name of `file`)
* In the route handler, call `User.createFile` with all of the information needed of a file
	* We use `User.createFile` and not `File.create` so that the file is associated with the user
	* Check the `models/file.js` model to see what fields your file will need
* When the file is created in the database, do an `fs.copy` to `assets/files/[filename].[extension]`
* If all works out, you should see all of your user files at `/home`, and be able to click on files to download them

Already done? Here are some challenge goals:

* Style up your upload form to look cool
* Extend the `User` model to add a function that does all of the file saving, given a `file` object
* Modify your POST route and your file input to allow for multi-file upload



## Getting started

Follow these steps to get the app working, before we start building on it:

1) Run `npm install` to install all the necessary modules
2) Create a new Postgres database for out project (e.g. `auth_example`)
3) Create a `.env` file that specifies db name, user, and password, e.g.
```
DB_NAME=[db name]
DB_USER=[db user name]
DB_PASSWORD=[db user password]

# Optional
PORT=[web app port]           # Default: 7000
DB_HOST=[db host]       # Default: localhost
DB_PORT=[db port]       # Default: 5432
DATABASE_URL=[postgres://...] # Default: Nothing, uses other DATABASE values
```
4) Run `npm start` and make sure it all works without errors



## Project Organization

```
.
├── app.js                    # Main entry point of the app
├── assets                    # Where public-access static files live
│   ├── css                   #   Where site styles live
│   └── files                 #   Where user uploaded files live
├── middleware                # Where all reusable middleware live
│   ├── deserializeUser.js    #   Turns `req.session.userid` into `req.user`
│   ├── requireLoggedIn.js    #   Redirects logged out user to /login
│   └── requireLoggedOut.js   #   Redirects logged in user to /home
├── models                    # Where all of the Sequelize models live
│   ├── deserializeUser.js    #   Model that defines file uploads
│   └── user.js               #   Model that defines authed users
├── routes                    # Where router files live
│   ├── auth.js               #   All routes dealing with signup / login
│   └── dox.js                #   All routes dealing with displaying or uploading files
├── util                      # Common use functioniality lives here
│   ├── renderTemplate.js     #   Helper function for rendering template.ejs
│   └── sql.js                #   Sequelize instance and configuration
└── views                     # EJS files for rendering live here
    ├── pages                 #   Where each individual page is kept
    └── template.ejs          #   Main template file
```

# NYCDA Upload Challenge - DropDox API

To improve our signup and login experience, we'll provide instant feedback for
users when they try to do either action. Upon submitting the form, we'll
immediately give them a message if something goes wrong, or redirect them if
it's all good.

In order to accomplish this goal, **you should only have to edit
`routes/api.js`, `models/user.js`, `assets/js/login.js`, `assets/js/docs.js`,
and `assets/js/signup.js`**.

## Your Goals

First we'll want to implement our API endpoints:
* Move as much of the functionality from POST `/login` and POST `/signup` in
`routes/auth.js` into helper methods on the `User` model as possible
(`models/user.js`)
* Have those routes use those functions and return HTML
* Have the same routes in `routes/api.js` use the same functions, but return
JSON instead

Next, we'll want to submit our forms via AJAX:
* In `assets/js/login.js`, you'll want to listen for the form submit
* If they don't provide a username or password, you should immediately `alert`
the user to an error, saying they need those arguments
* Submit an `$.ajax` POST request to `/api/login` with the username and password
* If all goes well, redirect them to `/home`
* If there's an error, alert the user to it
* Do all of the same in `assets/js/signup.js`, for the `/api/signup` endpoint

Finally, we're going to add some new, API-only functionality, the ability to delete documents:
* In `routes/api.js`, you'll want to implement the endpoint at `/doc/:fileId`
that finds a file by ID, and calls `destroy()` on the instance. If the database
gives an error, or no file exists, be sure to return an error response.
* In `assets/js/docs.js`, you'll want to listen for delete button presses
* Using the `data-fileId` attribute on each button, you'll want to submit a
DELETE request to `api/doc/:fileId`
* If everything goes well, you should remove the table row from the docs page
using jQuery
* If something goes wrong, you should alert the user and do nothing

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

# NYCDA Upload Challenge - DropDox Thumbnails

We've further extended to include thumbnails for documents, and a document page
that allows you to preview the document. The plan is to have images that are
uploaded also get a thumbnail and a compressed preview of the image, before you
download it.

Follow the goals below to complete this task. You should only need to alter **`models/user.js`**, and **`models/file.js`** to get everything done.

## Your Goals

File uploads have been consolidated under a `user.upload` instance method that's
defined in `models/user.js`. It gets called in the POST `/upload` route in
`routes/docs.js`.
* Edit this function to generate a preview that is 80% quality, 400px tall, but
maintains the aspect ratio of the image
* Also generate a thumbnail that is 64px wide, and 64px tall, cropping the photo
* These images should be saved to `assets/previews/[filename].jpg` and
`assets/thumbnails/[filename].jpg` respectively

File instances have been equipped with `getPreviewSrc()` and `getThumbnailSrc()`
methods that get the correct path for an img src of the preview and thumbnail
respectively. They're used in `views/pages/document.ejs` and
`views/pages/docs.ejs` respectively.
* Alter the `getPreviewSrc()` method to return a preview src path if one is
available, and null if it's not
* Alter the `getThumbnailSrc()` method to return a thumbnail src path if one is
available, or a default path to `/icons/file.png` if it's not
* You can use `fs`'s
[`existsSync(path)`](https://nodejs.org/api/fs.html#fs_fs_existssync_path)
method to check if the files exist or not
  * We use `existsSync()` instead of `exists` because we want to be able to call
  this function synchronously



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

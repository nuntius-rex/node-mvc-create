# MVC Create - An MVC Structure Builder

## PURPOSE

<p>A module to create a default MVC pattern folder and file structure.</p>

## INSTALL

```
npm i mvccreate
```

## Recommended Usage

<p>This module is intended to be a one time 'run-and-done' step at the beginning of a project.
The code has been updated to help prevent files being overwritten, but YOU SHOULD NOT run this module on an existing project.
</p>

<p>It is recommended that you create an install.js script (do not use your main file). When you run the module, the default settings will set mvcCreate as a dev dependency. This module should never be ran in production.</p>

```
const mvcCreate=require("mvccreate");
mvcCreate.mvcCreate();
```

>**<p>Note: This will create all of the folders and files, with the option of creating a package.json.
Here is what the default tree will look like:</p>**

```
- controllers
- - homeController.js   
- models
- public
- - css
- - images
- - js
- views
- - index.html
- main.js
- routes.js
- util.js
- package.json (you will be provided an option to customize)
- README.md
```
## CUSTOMIZATION

>**<p>What if you want to build a slightly different MVC pattern or even another structure? No problem.<br>
The newest version allows you to add your own patterns. Just defined the pattern you want as follows: </p>**

```
const mvcCreate=require("mvccreate");

//Define dev-dependencies as an object:
userDevDepsObj={
  "mvccreate": "^1.0.7",
  "nodemon": "^2.0.4"
}

//Define regular dependencies as an object:
userDepsObj={
  "express": "^4.16.3",
  "express-es6-template-engine": "^2.2.3"
}

//Define a folder structure:
userDirs=[
  "public",
  "public/images",
  "public/js",
  "public/css",
  "funny",
  "views",
  "controllers",
  "models"
];

//Define files matching the folder structure:
userFiles=[
  "main.js",
  "router.js",
  "utils.js",
  "weird.js",
  "views/index.html",
  "models/homeModel.js",
  "controllers/homeController.js",
  "README.md"
];

//Feed these to mvcCreate for breakfast
mvcCreate.mvcCreate(userDevDepsObj, userDepsObj, userDirs, userFiles);


```
<p>You can also just inject specifics you would like to replace.
For example if you just wanted to replace userFiles:
</p>

```
userFiles=[
  "main.js",
  "router.js",
  "utils.js",
  "weird.js",
  "views/index.html",
  "models/homeModel.js",
  "controllers/homeController.js",
  "README.md"
];
mvcCreate.mvcCreate("", "", "", userFiles);

```

## PROMPT

<p>When you run the install.js script you created, you will be prompted with options to skip steps if you want. Finally, you will be prompted to create the package.json file. This process is a questionnaire similar to running the command 'npm init' but with a few more options. Finally, you will be given the option to install the dependencies. This step simply runs 'npm install' for you.</p>


## NPM VERSIONS npmjs.com
>1.0.6 - This version was an early development of the process.

>2.0.0 - This version enables user defined patterns and a package.json creation process similar to 'npm init' but with more features.

NPM Listing: https://www.npmjs.com/package/mvccreate

## KNOWN BUGS
>

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

### Most Basic install.js File:
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
- - homeModel.js
- public
- - css
- - images
- - js
- views
- - index.html
- main.js
- routes.js
- package.json (you will be provided an option to customize or skip)
- README.md
- .gitignore
```
### Hint

<p>The following can be used to setup the basics quickly from the command line or script:</p>

```
npm i mvccreate
echo const mvcCreate=require("mvccreate"); >install.js
echo mvcCreate.mvcCreate(); >>install.js
node install.js
```

## CUSTOMIZATION

>**<p>What if you want to build a slightly different MVC pattern or even another structure? No problem.
Version 2.0+ allows you to add your own patterns. If you want to use your own package.json, just skip the creation step. Just define the pattern you want as follows: </p>**

```
const mvcCreate=require("mvccreate");

//Define dev-dependencies as an object (if you are not using your own package.json):
userDevDepsObj={
  "mvccreate": "*",
  "nodemon": "^2.0.4"
}

//Define regular dependencies as an object (if you are not using your own package.json):
userDepsObj={
  "express": "^4.16.3",
  "express-es6-template-engine": "^2.2.3"
}

//Define a folder structure:
userDirs=[
  "config",
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
  "weird.js",
  "funny/iJustWantThisOneOkay.js",
  "views/index.html",
  "models/homeModel.js",
  "controllers/homeController.js",
  "README.md",
  ".gitignore"
];

//Feed these to mvcCreate for breakfast:
mvcCreate.mvcCreate(userDevDepsObj, userDepsObj, userDirs, userFiles);


```
<p>You can also just inject specific settings you would like to replace, if you like the defaults.
For example if you just wanted to replace userFiles, just pass empty parameters for the other settings:
</p>

```
userFiles=[
  "main.js",
  "router.js",
  "utils.js",
  "weird.js",
  "funny/iJustWantThisOneOkay.js",
  "views/index.html",
  "models/homeModel.js",
  "controllers/homeController.js",
  "README.md",
  ".gitignore"
];
mvcCreate.mvcCreate("", "", "", userFiles);


```

## PROMPT

<p>When you run the install.js script you created, you will be prompted with options to skip steps if you want. Finally, you will be prompted to create the package.json file. This process is a questionnaire similar to running the command 'npm init' but with a few more options. Finally, you will be given the option to install the dependencies. This step simply runs 'npm install' for you, installing what is configured in the package.json.</p>


## NPM VERSIONS npmjs.com
>1.0.6 - This version was an early development of the process.

>2.0.0 - This version enables user defined patterns and a package.json creation process similar to 'npm init' but with more features.

NPM Listing: https://www.npmjs.com/package/mvccreate

## KNOWN BUGS
>

# MVC Create

<p>A module script to create a default MVC pattern folder and file structure.</p>

## Install

```bash
npm i mvccreate
```

## Recommended Usage

<p style='color:red'>This module is intended to be a one time run-and-done at the beginning of a project, so BE CAREFUL not to run on an existing project. Create the following in an install.js script. Do not leave active on your main script!!!:</p>

```
const mvcCreate=require("mvccreate");
mvcCreate.mvcCreate();
```

>**<p>Note: This will create all of the folders and files, including a package.json. Here is what the tree will look like:</p>**

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
- package.json
- README.md

Some sample script will be written to main.js.
```

## PROMPT

<p>When you run, it will ask you if you wish to install dependencies for the project.</p>
<p>If yes is selected, Express and Nodemon will be installed per the dependencies that were written to package.json.</p>

>**<p style='color:red'>Be sure to modify the package.json removing the dependencies, if you do not intend to use them.</p>**

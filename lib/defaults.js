const path = require('path');
const base_folder = path.basename(path.resolve()).toLowerCase();
module.exports.dirsMVC=[
  "config",
  "public",
  "public/images",
  "public/js",
  "public/css",
  "views",
  "controllers",
  "models"
];

module.exports.filesMVC=[
  "main.js",
  "router.js",
  "views/index.html",
  "models/homeModel.js",
  "controllers/homeController.js",
  "README.md",
  ".gitignore"
];

module.exports.pkg={
  name: base_folder,
  version: "1.0.0",
  description: "MVC app",
  main: "main.js",
  scripts: {
    test: "", //echo \"Error: no test specified\" && exit 1
    start: "node main.js"
  },
  keywords: [""],
  author:"",
  license:"ISC",
  dependencies:{
  },
  devDependencies :{
  },
  repository:{
    "type":"",
    "url":""
  }
}

module.exports.defaultDeps={
  "express": "^4.16.3",
  "express-es6-template-engine": "^2.2.3"
}


module.exports.defaultDevDeps={
  "mvccreate": "*",
  "nodemon": "^2.0.4"
}


module.exports.defPgkJSON=
`
{
  "name": "test",
  "version": "1.0.0",
  "description": "test",
  "main": "main.js",
  "scripts": {
    "test": "nodemon test.js",
    "start": "nodenodemon main.js"
  },
  "keywords": [
    "test"
  ],
  "author": "Dan Guinn",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.3",
    "express-es6-template-engine": "^2.2.3"
  },
  "devDependencies": {
    "mvccreate": "*",
    "nodemon": "^2.0.4"
  },
  "repository": {
    "type": "",
    "url": ""
  }
}
`;

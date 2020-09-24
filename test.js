const mvcCreate=require("./index");

userDepsObj={
  "express": "^4.16.3",
  "express-es6-template-engine": "^2.2.3"
}

userDevDepsObj={
  "mvccreate": "^1.0.7",
  "nodemon": "^2.0.4"
}

userDirs=[
  "public",
  "public/images",
  "public/js",
  "public/css",
  "views",
  "controllers",
  "models"
];

userFiles=[
  "main.js",
  "router.js",
  "utils.js",
  "views/index.html",
  "models/homeModel.js",
  "controllers/homeController.js",
  "README.md"
];

mvcCreate.mvcCreate();
//mvcCreate.mvcCreate(userDevDepsObj, userDepsObj, userDirs);

var fs = require('fs');
const child_process = require('child_process');

exports.mvcCreate=function(){

console.log(`
//=================================================
// MVC Create - Simple Create MVC Structure Script
// by Dan Guinn
//=================================================
`);

  //Create default MVC directory pattern:
  let dirs=[
    "public",
    "public/images",
    "public/js",
    "public/css",
    "views",
    "controllers",
    "models"
  ];

  for(let i=0;i<dirs.length;i++){
    fs.mkdir(dirs[i], function(error){
      if(error){
        return console.error(error.message);
      }
      console.log("The directory,'"+dirs[0]
      +"', was successfully created.");
    });
  }

  //Create default MVC files:
  let files=[
    "main.js",
    "router.js",
    "views/index.html",
    "controllers/homeController.js",
    "package.json",
    "README.md"
  ];

  for(let i=0;i<files.length;i++){
    fs.writeFile(files[i],'',function(error){
    if(error){
      return console.error(error.message);
    }
    console.log("The file, "+ files[i]+", was successfully created.");
    });
  }

  let appendStmts=[
    {
      name: "package.json",
      path: "package.json",
      stmt:
`{
  "name": "mvc_prog",
  "version": "1.0.0",
  "description": "MVC Program",
  "main": "main.js",
  "scripts": {
    "start": "nodemon main.js"
  },
  "keywords": [
    "express"
  ],
  "author": "YOUR NAME",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.4"
  }
}
`
    },
    {
      name: "main",
      path: "main.js",
      stmt:
`
/*
//Sample Code:
const port=3000;
const express=require("express");
const app=express();
const homeController = require('./controllers/homeController');
console.log(homeController);
*/
`
    },
    {
      name: "homeController require",
      path: "main.js",
      stmt: "const homeController = require('./controllers/homeController')"
    }

  ];

  for(let i=0;i<appendStmts.length;i++){
    fs.appendFile(appendStmts[i].path,appendStmts[i].stmt,function(error){
      if(error){
        return  console.log(error);
      }
      console.log("The file, "+appendStmts[i].name+" was successfully appended.");
    });
  }

  //Execute node commands (This is a "generator" pattern, note function* syntax):
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
  //https://stackoverflow.com/questions/36959253/how-can-i-execute-shell-commands-in-sequence
  var buildCommands = (function* () {
    var rl = require('readline').createInterface({
      input: process.stdin, output: process.stdout
    });
    a = yield rl.question('Install dependencies? [y,n] ', r=>buildCommands.next(r));
    b = yield rl.question('Are you sure? [y,n] ', r=>buildCommands.next(r))

    if(a=='y' && b=='y'){
      child_process.execSync('npm install');
    }else{
      rl.close();
    }

    rl.close()
    console.log(a,b)
  })()

  //Trigger initial node command run:
  setTimeout(function(){
    buildCommands.next()
  }, 1500);



}//end function

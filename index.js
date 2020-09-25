const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

exports.mvcCreate=function(userDevDepsObj, userDepsObj, userDirs, userFiles, test){

process.stdout.write('\u001B[2J\u001B[0;0f');

console.log(`
//==================================================
// MVC Create - An MVC Structure Builder
// by Dan Guinn (danguinn.com)
// https://www.npmjs.com/package/mvccreate
// https://github.com/nuntius-rex/node-mvc-create
//==================================================
`);

closeMSG=`
Thank you for using MVC Create! Happy coding! ~Dan
`;
//console.log(userDevDepsObj);
//console.log(userDepsObj);
//console.log(userDirs);


const base_folder = path.basename(path.resolve());

var pkg={
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


var defaultDeps={
  "express": "^4.16.3",
  "express-es6-template-engine": "^2.2.3"
}

if(userDepsObj!==undefined && userDepsObj!==""){
  pkg.dependencies=userDepsObj;
}else{
  pkg.dependencies=defaultDeps;
}


var defaultDevDeps={
  "mvccreate": "*",
  "nodemon": "^2.0.4"
}

if(userDevDepsObj!==undefined && userDevDepsObj!==""){
  pkg.devDependencies=userDevDepsObj;
}else{
  pkg.devDependencies=defaultDevDeps;
}




//Execute node commands (This is a "generator" pattern, note function* syntax):
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
  //https://stackoverflow.com/questions/36959253/how-can-i-execute-shell-commands-in-sequence

var buildCommands = (function* () {

console.log(`Welcome to mvcCreate!
The next steps will guide you through your project setup.
(Note: The pattern used is one possible basic MVC pattern.
See the doc page to learn how to customize for your needs!)
`);

      var rl = require('readline').createInterface({
        input: process.stdin, output: process.stdout
      });

      //=================================
      // 1) MVC directory pattern:
      //=================================
      var dirs=[
        "config",
        "public",
        "public/images",
        "public/js",
        "public/css",
        "views",
        "controllers",
        "models"
      ];

      if(userDirs!==undefined && userDirs!==""){
        dirs=userDirs;
      }

      let directories=dirs.join().replace(/,/g, '\n');
      dir = yield rl.question(
`Create the following directories?
${directories}
[y,n] `, r=>buildCommands.next(r));

      if(dir=='y'){
          for(i=0;i<dirs.length;i++){
            var hasError=false;
            try{
              fs.mkdirSync(dirs[i]);
              console.log(`The '${dirs[i]}' directory was successfully created.`);
              hasError=false;
            }catch(error){
              hasError=true;
              if (error && error.code === 'EEXIST') {
                console.log(`The '${dirs[i]}' directory already exist.`);
              }
            }
          }
      }

      //=================================
      // 2) MVC files pattern:
      //=================================

      var filesMVC=[
        "main.js",
        "router.js",
        "views/index.html",
        "models/homeModel.js",
        "controllers/homeController.js",
        "README.md",
        ".gitignore"
      ];

      if(userFiles!==undefined  && userFiles!==""){
        filesMVC=userFiles;
      }

      filesDisplay=filesMVC.join().replace(/,/g, '\n');
      files = yield rl.question(
`
Create the following files?
${filesDisplay}
[y,n] `, r=>buildCommands.next(r));
      if(files=='y'){
            console.log('Creating files:');
            for(let i=0;i<filesMVC.length;i++){

                try{
                  fs.writeFileSync(filesMVC[i],'', { flag: "wx" });
                  console.log("The file '"+ filesMVC[i]+"' was successfully created.");
                }catch(error){
                  if (error && error.code === 'EEXIST') {
                    console.log(`The file '${filesMVC[i]}' directory already exist.`);
                  }
                }

            }//End for

      }else{
        console.log('Skipping MVC file creation.');
      }


      package = yield rl.question(`
Would you like to create a package.json? (like running 'npm init') [y,n] `, r=>buildCommands.next(r));

      if(package=='y'){
          a = yield rl.question(`name: (${pkg.name}) `, r=>buildCommands.next(r));
          if(a!=""){
            pkg.name=a;
          }
          b = yield rl.question(`version: (${pkg.version}) `, r=>buildCommands.next(r));
          if(b!=""){
            pkg.version=b;
          }
          c = yield rl.question(`description: (${pkg.description}) `, r=>buildCommands.next(r));
          if(c!=""){
            pkg.description=c;
          }
          d = yield rl.question(`main file: (${pkg.main}) `, r=>buildCommands.next(r));
          if(d!=""){
            pkg.main=d;
          }
          e = yield rl.question(`start script: (${pkg.scripts.start}) `, r=>buildCommands.next(r));
          if(e!=""){
            pkg.scripts.start=e;
          }
          f = yield rl.question(`test script: (${pkg.scripts.test}) `, r=>buildCommands.next(r));
          if(f!=""){
            pkg.scripts.test=f;
          }else{
            pkg.scripts.test="echo \"Error: no test specified\" && exit 1";
          }
          g = yield rl.question(`keywords: (${pkg.keywords}) `, r=>buildCommands.next(r));
          if(g!=""){
            let keywordsString=g.split(/[\s,]+/).join();
            let keywordsArray=keywordsString.split(",");
            pkg.keywords=keywordsArray;
          }
          h = yield rl.question(`author: (${pkg.author}) `, r=>buildCommands.next(r));
          if(h!=""){
            pkg.author=h;
          }
          repoType = yield rl.question(`repository type: (${pkg.repository.type}) `, r=>buildCommands.next(r));
          if(repoType!=""){
            pkg.repository.type=repoType;
          }

          repoURL = yield rl.question(`repository url: (${pkg.repository.url}) `, r=>buildCommands.next(r));
          if(repoURL!=""){
            pkg.repository.url=repoURL;
          }

      let devDependencies = Object.keys(pkg.devDependencies);
      i = yield rl.question(`
Dev Dependencies:  (${devDependencies})
Choose from the following options for dev dependencies.
1) If you provided a dev dependencies object at start, these should be listed. Press enter to use them.
2) You may type 'default' to just use the mvcCreate dev defaults:
    (mvcCreate, nodemon)
3) You may type 'none' to install no dev dependencies at all.
4) You may type your dev dependencies as a comma separated list (note this will overwrite ALL defaults).
NOTE: OPTIONS 3 & 4 REMOVES mvcCreate WHEN DEPENDENCIES ARE INSTALLED!!!

[<enter>, default, none, or <type your options>]: `, r=>buildCommands.next(r));

      if(i=="default" || i=="defaults"){
        pkg.devDependencies=defaultDevDeps;
      }else if(i=="none"){
        pkg.dependencies={}
      }else{
          if(i!=""){
            let devDepsString=i.split(/[\s,]+/).join();
            let devDepsArray=devDepsString.split(",")
            pkg.devDependencies=devDepsArray.reduce((a,b)=> (a[b]='*',a),{});
          }
      }

      let dependencies = Object.keys(pkg.dependencies);
      j = yield rl.question(`
Dependencies: (${dependencies})
Choose from the following options for dependencies.
1) If you provided a dependencies object at start (recommended), these should be listed. Press enter to use them.
2) You may type 'default' to just use the mvcCreate defaults:
    (express, espress-es6-template-engine)
3) You may type 'none' to install no dependencies at all.
4) You may type your dependencies as a comma separated list (note this will overwrite ALL defaults).

[<enter>, default, none, or <type your options>]: `, r=>buildCommands.next(r));
          if(j=="default" || j=="defaults"){
            pkg.dependencies=defaultDeps;
          }else if(j=="none"){
            pkg.dependencies={}
          }else{
            if(j!==""){
              let depsString=j.split(/[\s,]+/).join();
              let depsArray=depsString.split(",")
              pkg.dependencies=depsArray.reduce((a,b)=> (a[b]='*',a),{});
            }
          }

          let pkgJSON=JSON.stringify(pkg);
          pkgJSONDisplay=pkgJSON.replace(/,/g, ',\n').replace(/{/g, '{\n').replace(/}/g, '\n}\n');
          k = yield rl.question(
`
Would you like to write this package.json now?
${pkgJSONDisplay}
[y,n] `, r=>buildCommands.next(r));

          if(k=='y'){

            var pkgFile="package.json";
            if(test==1){
              pkgFile="packageTEST.json";
            }

            fs.writeFileSync(pkgFile,pkgJSON,function(error){
              if(error){
                return  console.log(error);
              }else{

                console.log("The package.json file was successfully created. The content was written in raw JSON to insure integrity.");
              }
            });

          }//end "write this package.json now?"

        }// End "like to create a package.json?"

          try {
            if (fs.existsSync("package.json")) {
              //only ask this question if package.json exist:
              l = yield rl.question(`Would you like to install dependencies now? (npm install)
Note: This process also formats the package.json if newly created: [y,n] `, r=>buildCommands.next(r));
              if(l=='y'){
                child_process.execSync('npm install');
                console.log(closeMSG);
                rl.close();
              }else{
                //All other entries, end process:
                console.log(closeMSG);
                rl.close();
              }
            }
          } catch(err) {
            console.error(err)
          }









    })()

    //Trigger initial node command run:
    setTimeout(function(){
      buildCommands.next()
    }, 1000);

}//end function

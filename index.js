const fs = require('fs');
const child_process = require('child_process');
const config=require('./lib/config');
const defaults=require('./lib/defaults');
const questions=require('./lib/questions');
//console.log(defaults);

exports.mvcCreate=function(userDevDepsObj, userDepsObj, userDirs, userFiles, test){

  //Clear console:
  process.stdout.write('\u001B[2J\u001B[0;0f');

  //General console heading:
  console.log(config.headingMSG);

  //Set default varaibles:
  var pkg=defaults.pkg;
  var defaultDeps=defaults.defaultDeps;
  var defaultDevDeps=defaults.defaultDevDeps;
  var dirsMVC=defaults.dirsMVC;
  var filesMVC=defaults.filesMVC;

  //Set user overrides for defaults:
  if(userDepsObj!==undefined && userDepsObj!==""){
    pkg.dependencies=userDepsObj;
  }else{
    pkg.dependencies=defaultDeps;
  }

  if(userDevDepsObj!==undefined && userDevDepsObj!==""){
    pkg.devDependencies=userDevDepsObj;
  }else{
    pkg.devDependencies=defaultDevDeps;
  }

  if(userDirs!==undefined && userDirs!==""){
    dirsMVC=userDirs;
  }

  if(userFiles!==undefined  && userFiles!==""){
    filesMVC=userFiles;
  }

  //Execute node commands (This is a "generator" pattern, note function* syntax):
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
  //https://stackoverflow.com/questions/36959253/how-can-i-execute-shell-commands-in-sequence

  var buildCommands = (function* () {

      console.log(config.welcomeMSG);

      var rl = require('readline').createInterface({
        input: process.stdin, output: process.stdout
      });

      //=================================
      // 1) MVC directory pattern:
      //=================================

      dir = yield rl.question( questions.getQuestion("directories"), r=>buildCommands.next(r));

      if(dir=='y'){
          for(i=0;i<dirsMVC.length;i++){
            var hasError=false;
            try{
              fs.mkdirSync(dirsMVC[i]);
              console.log(`The '${dirsMVC[i]}' directory was successfully created.`);
              hasError=false;
            }catch(error){
              hasError=true;
              if (error && error.code === 'EEXIST') {
                console.log(`The '${dirsMVC[i]}' directory already exist.`);
              }
            }
          }
      }

      //=================================
      // 2) MVC files pattern:
      //=================================

      files = yield rl.question( questions.getQuestion("files"), r=>buildCommands.next(r));
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

      //=================================
      // 3) Package Creation:
      //=================================

      package = yield rl.question(questions.getQuestion("package.json"), r=>buildCommands.next(r));

      if(package=='y'){

          pName = yield rl.question(`name: (${pkg.name}) `, r=>buildCommands.next(r));
          pName=pName.substring(0,214);
          //console.log("1) "+pName);
          pName=pName.toLowerCase();
          //console.log("2) "+pName);
          pName=pName.replace(/^_/,'');
          //console.log("3) "+pName);
          pName=pName.replace(/^\./,'');
          //console.log("4) "+pName);
          pName=pName.replace(/[^a-z_]+/g,'');
          //console.log("5) "+pName);

          console.log("Note: Your name may have been reformatted: "+pName);

          if(pName!=""){
              pkg.name=pName;
          }

          pVersion = yield rl.question(`version: (${pkg.version}) `, r=>buildCommands.next(r));
          //pVersion.^\d+(\.\d+){0,2}$


          if(pVersion!=""){
            pkg.version=pVersion;
          }

          pDesc = yield rl.question(`description: (${pkg.description}) `, r=>buildCommands.next(r));
          if(pDesc!=""){
            pkg.description=pDesc;
          }

          pMain = yield rl.question(`main file: (${pkg.main}) `, r=>buildCommands.next(r));
          if(pMain!=""){
            pkg.main=pMain;
          }

          pStart = yield rl.question(`start script: (${pkg.scripts.start}) `, r=>buildCommands.next(r));
          if(pStart!=""){
            pkg.scripts.start=pStart;
          }

          pTest = yield rl.question(`test script: (${pkg.scripts.test}) `, r=>buildCommands.next(r));
          if(pTest!=""){
            pkg.scripts.test=pTest;
          }else{
            pkg.scripts.test="echo \"Error: no test specified\" && exit 1";
          }

          pKeywords = yield rl.question(`keywords: (${pkg.keywords}) `, r=>buildCommands.next(r));
          if(pKeywords!=""){
            let keywordsString=pKeywords.split(/[\s,]+/).join();
            let keywordsArray=keywordsString.split(",");
            pkg.keywords=keywordsArray;
          }

          pAuthor = yield rl.question(`author: (${pkg.author}) `, r=>buildCommands.next(r));
          if(pAuthor!=""){
            pkg.author=pAuthor;
          }

          pRepoType = yield rl.question(`repository type: (${pkg.repository.type}) `, r=>buildCommands.next(r));
          if(pRepoType!=""){
            pkg.repository.type=pRepoType;
          }

          pRepoURL = yield rl.question(`repository url: (${pkg.repository.url}) `, r=>buildCommands.next(r));
          if(pRepoURL!=""){
            pkg.repository.url=pRepoURL;
          }

          pDevDep = yield rl.question( questions.getQuestion("dev_dependencies") , r=>buildCommands.next(r));

          if(pDevDep=="default" || pDevDep=="defaults"){
            pkg.devDependencies=defaultDevDeps;
          }else if(pDevDep=="none"){
            pkg.dependencies={}
          }else{
              if(pDevDep!=""){
                let devDepsString=pDevDep.split(/[\s,]+/).join();
                let devDepsArray=devDepsString.split(",")
                pkg.devDependencies=devDepsArray.reduce((a,b)=> (a[b]='*',a),{});
              }
          }


          pDeps = yield rl.question( questions.getQuestion("dependencies"), r=>buildCommands.next(r));
              if(pDeps=="default" || pDeps=="defaults"){
                pkg.dependencies=defaultDeps;
              }else if(pDeps=="none"){
                pkg.dependencies={}
              }else{
                if(pDeps!==""){
                  let depsString=pDeps.split(/[\s,]+/).join();
                  let depsArray=depsString.split(",")
                  pkg.dependencies=depsArray.reduce((a,b)=> (a[b]='*',a),{});
                }
              }

              let pkgJSON=JSON.stringify(pkg);
              pkgJSONDisplay=pkgJSON.replace(/,/g, ',\n').replace(/{/g, '{\n').replace(/}/g, '\n}\n');

          pWritePJSON = yield rl.question(
            questions.getQuestion("write_package.json", pkgJSONDisplay)
            , r=>buildCommands.next(r));

          if(pWritePJSON=='y'){

            var pkgFile="package.json";
            if(test==1){
              pkgFile="packageTEST.json";
            }

            fs.writeFileSync(pkgFile,pkgJSON,function(error){
              if(error){
                return  console.log(error);
              }else{

                console.log("The package.json file was successfully created. "
                +"The content was written in raw JSON to insure integrity.");
              }
            });


          }//end "write this package.json now?"

        }// End "like to create a package.json?"

          try {
            if (fs.existsSync("package.json")) {
              //only ask this question if package.json exist:
              pInstall = yield rl.question(
                questions.getQuestion("install_dependencies")
                , r=>buildCommands.next(r));
              if(pInstall=='y'){
                child_process.execSync('npm install');
                console.log(config.closeMSG);
                rl.close();
              }else{
                //All other entries, end process:
                console.log(config.closeMSG);
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

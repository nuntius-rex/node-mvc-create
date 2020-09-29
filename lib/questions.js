const defaults=require(__dirname+'/defaults');

let directoryDisplay=defaults.dirsMVC.join().replace(/,/g, '\n');
let fileDisplay=defaults.filesMVC.join().replace(/,/g, '\n');
let devDependenciesDisplay = Object.keys(defaults.pkg.devDependencies);
let dependenciesDisplay = Object.keys(defaults.pkg.dependencies);

let questions=[
{
  name:"directories",
  question:

`Create the following directories?
${directoryDisplay}
[y,n] `

},
{
  name:"files",
  question:

`
Create the following files?
${fileDisplay}
[y,n] `

},
{
  name:"package.json",
  question:

`
Would you like to create a package.json? (like running 'npm init')
Note: Not all entries are not validated at this time.
Please match your entries to the package.json requirements:
https://docs.npmjs.com/files/package.json  [y,n] `
},
{
  name:"dev_dependencies",
  question:

`
Dev Dependencies:  (${devDependenciesDisplay})
Choose from the following options for dev dependencies:
1) If you provided a dev dependencies object at start, or wish to use the defaults, these should be listed. Press enter to use them.
2) You may type 'none' to install no dev dependencies at all.
3) You may type your dev dependencies as a comma separated list (note this will overwrite ALL defaults).
NOTE: OPTIONS 3 & 4 REMOVES mvcCreate WHEN DEPENDENCIES ARE INSTALLED!!!

[<enter>, none, or <type your options>]: `

},
{
  name:"dependencies",
  question:
`
Dependencies: (${dependenciesDisplay})
Choose from the following options for dependencies.
1) If you provided a dependencies object at start or wish to use the defaults, these should be listed. Press enter to use them.
2) You may type 'none' to install no dependencies at all.
3) You may type your dependencies as a comma separated list (note this will overwrite ALL defaults).

[<enter>, default, none, or <type your options>]: `

},
{
  name:"write_package.json",
  question:
`
[[replacement_value]]
Would you like to write the above package.json now? [y,n] `
},
{
  name:"install_dependencies",
  question:
`Would you like to install dependencies now? (npm install)
Note: This process also formats the package.json if newly created: [y,n] `
}

];


module.exports.getQuestion=function(name, rval){
  let result=questions.filter(function(item){
    if(item.name==name){
      //console.log(rval);
      if(rval!=""){
        var question=item.question;
        item.question=question.replace("[[replacement_value]]",rval)
        //console.log(item.question);
      }
      return item;
    }
  });
  return result[0].question;
}

module.exports.questions=questions;

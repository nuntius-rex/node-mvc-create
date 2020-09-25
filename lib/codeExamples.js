
codeExamples=[
{
  "name":"homeController.js",
  "code":`
const router = require('../router');
const appModel = require('../models/appModel');

exports.processReq=(req,res)=>{
  //Some important variables at your disposal:
  let page=req.path;
  let params=req.query;
  let routeObj=router.getCurRouteObj("Home");
  let template=routeObj.template;
  //console.log(routeObj);

  //OPTIONS FOR RETURN:
  //1) Normal Express Send()
  //res.send(`This is the ${page} page. You sent the following parameters: ${JSON. stringify(params)}`);

  //2) Express Send File: You may want to include path
  //var path = require('path');
  //res.sendFile(path.join(__dirname + '../../views/'+template));

  //=== Data Model call here = Get Model for Home:
  //3)
  //console.log(appModel.getAppContent("Home"));
  var homeBodyContent=appModel.getBodyContent("Home");


  //4) es6Renderer
  res.render(template, {locals: {title: 'Home Page!', body_content:homeBodyContent}});
}`
},
{
  "name":"aboutController.js",
  "code":``
},
{
  "name":"appModel.js",
  "code":``
},

];

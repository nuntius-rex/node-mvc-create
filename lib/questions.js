let questions=[
  {
    name:"directories",
    question:
`Create the following directories?
${directories}
[y,n] `
  }
];

module.exports.getQuestion=function(name){
  let result=questions.filter(function(item){
    if(item.name==name){
      return item;
    }
  });
  return result[0];
}

module.exports.questions=questions;

// var module = {
//     exports: {}
//   };
  
// module.exports = function(x) {
//   console.log(x);
// };
alert("加载成功！");
define(function (){

    　　　　var add = function (x,y){
    
    　　　　　　return x+y;
    
    　　　　};
    
    　　　　return {
    
    　　　　　　add: add
    　　　　};
    
    　　});
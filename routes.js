//second set of parantheses means that the require statement returns a function, that function will be invoked as soon as it is required
const routes = require("next-routes")();

routes
  .add("/campaigns/new", "/campaigns/new") //NO SEMICOLON ADDED!!
  
  //colon with 'address' states that section of route will be a varible
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/requests","/campaigns/requests/index")
  .add("/campaigns/:address/requests/new", "/campaigns/requests/new");

module.exports = routes;

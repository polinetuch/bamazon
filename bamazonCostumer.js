var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_DB"
});

connection.connect(function(error) {
  if (error) throw error;
  console.log("connected " + connection.threadId);
  //   askCostumer();
});

// function askCostumer() {
//   inquirer.createPromptModule([
//     {
//       name: "product-ID",
//       type: "input",
//       message: "Which product ID would you like to purchase?"
//     }
//   ]);
// }

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(error) {
  if (error) throw error;
  // console.log("connected " + connection.threadId);
  askCostumer();
});

var askCostumer = function() {
  inquirer.prompt([
    {
      name: "productID",
      type: "input",
      message: "Enter product ID you'd like to purchase: ",
      validate: function(value) {
        if (isNaN(value) && value < 11) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

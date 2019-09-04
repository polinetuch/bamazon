var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

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

function askCostumer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "ID",
        message: "Enter product ID you'd like to purchase:\n",
        validate: function(value) {
          if (!isNaN(value) && value < 11) {
            return true;
          } else {
            return false;
          }
        }
      },

      {
        type: "input",
        name: "quantity",
        message: "How many would you like to buy?\n",
        validate: function(value) {
          if (!isNaN(value)) {
            return true;
          } else {
            return false;
          }
        }
      }
    ])
    .then(function(answer) {
      var selectedItemId = answer.ID;
      console.log("Your purchase item ID: " + selectedItemId);

      var chosenQuantity = answer.quantity;
      console.log("Your purchase quantity: " + chosenQuantity);

      console.log(answer);
      proceedOrder(selectedItemId, chosenQuantity);
    });
}

function proceedOrder(userSelectedID, userChosenQuantity) {
  connection.query(
    "SELECT * FROM products WHERE id= " + userSelectedID,
    function(resp, err) {
      if (err) throw err;
      if (userChosenQuantity <= resp[0].stock_quantity) {
        console.log(userChosenQuantity);
        console.log(resp[0].stock_quantity);
      } else {
        console.log("insufficient amount");
      }
    }
  );
}

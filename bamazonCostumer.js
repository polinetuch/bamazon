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
  console.log("connected");
  console.log(connection.threadId);
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

      connection.query(
        "SELECT * FROM products WHERE ?",
        [{ item_id: selectedItemId }],
        function(err, response) {
          if (err) throw err;

          console.table(response);
          var currentquantity = response;
          console.log(currentquantity);
          console.log(selectedItemId);
        }
      );
    });
}

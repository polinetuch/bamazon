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
  // console.log(connection.threadId);
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
      console.log("Your selected item ID: " + selectedItemId);

      var chosenQuantity = answer.quantity;
      console.log("Your selected quantity: " + chosenQuantity);
      proceedOrder(selectedItemId, chosenQuantity);
    });
}

function proceedOrder(selectedItemId, chosenQuantity) {
  connection.query(
    "SELECT * FROM products WHERE ?",
    [{ item_id: selectedItemId }],
    function(err, response) {
      if (err) throw err;

      if (chosenQuantity <= response[0].stock_quantity) {
        var totalprice = response[0].price * chosenQuantity;
        var remainingQuantity = response[0].stock_quantity - chosenQuantity;
        console.log(
          "Here is Your order\n" +
            chosenQuantity +
            "x " +
            response[0].product_name +
            "\nYour total price is: $" +
            totalprice +
            "\nThank your for your order!"
        );
        connection.query(
          "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
          [remainingQuantity, selectedItemId]
        );
        console.log(
          "\n--------------Updated Database--------------\n" +
            "\nRemaining Quantity of the item " +
            response[0].product_name +
            " x" +
            remainingQuantity
        );
      } else {
        console.log(
          "Sorry there is an insufficient amount to proceed your order."
        );
      }
    }
  );
}

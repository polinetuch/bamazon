DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (50),
department_name VARCHAR(50),
price INT NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (id) 
);

SELECT * FROM `products`;
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Tank top", "Clothes", 15, 20)


drop database if exists bamazon;
create database bamazon;
use bamazon;

create table products(
item_id int auto_increment,
product varchar(100),
dept varchar(100),
price int,
stock int,
primary key (item_id)
);

INSERT INTO products (product, dept, price, stocK)
values ("Beanie Babies", "Toys", 10, 200), ("MTG cards", "TCG", 50, 200), ("1954 Stamp Set", "Historical", 25, 100), ("Mint Shadowless Charizard", "TCG", 75, 50), ("1960 Chevy Corvette Pristine", "Historical", 2000, 10), ("Lego sets you'll spend a year on", "Toys", 150, 50);
 
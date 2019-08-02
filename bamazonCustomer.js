var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// label our connection
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "snow7436",
    database: "bamazon"
});

// initiate connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("Your line # is: " + connection.threadId);
    storeFront();
    // connection.end();
});


// function to list inventory
function storeFront() {
    var query = "SELECT item_id, product, price FROM bamazon.products;"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        pickStuff(res);
    })
};



function pickStuff(stuff) {

    inquirer.prompt(
        [
            {
                name: "thisOne",
                type: "input",      //TODO inquirer types
                message: "What is the ID of your desired item?",

            }, {
                type: "input",
                name: "howMany",
                message: "How many of these are you taking?"
            }
        ]
    ).then(function (value) {
        // checkInventory(value, stuff);

        var query = "SELECT stock FROM bamazon.products WHERE ?"
        connection.query(query, [{ item_id: value.thisOne }], function (err, res) {
            if (err) throw err;

            var currentStock = res[0].stock;
            var gimmeThis = value.thisOne;

            if (value.howMany <= currentStock) {

                var newStock = currentStock - value.howMany;
            
                makeSale(newStock, gimmeThis);
                payUp(gimmeThis, value.howMany);
                connection.end();
            } else {


                console.log("Oh S***!, I don't have enough of that!");
                connection.end();

            };

        });



    });
};


var makeSale = function (quantity, thisItem) {
    var query = "UPDATE bamazon.products SET ? WHERE ?"
    connection.query(query, [{ stock: quantity },{item_id: thisItem}], function (err, res) {
        if (err) throw err;
    
    
    })
};



var payUp = function (variable, amount){

    var query = "Select price FROM bamazon.products WHERE ?"
    connection.query(query, [{ item_id: variable }], function (err, res) {
        if (err) throw err;

        var indAmnt= res[0].price;
    var finalTot = indAmnt * amount;
    console.log("Your total is: " + finalTot +". Thank you for your business!")
})};
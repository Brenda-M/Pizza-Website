$(document).ready(function(){
    function Pizza (size, crustType, toppings, quantity, isDelivery){
        this.size = size;
        this.crustType = crustType;
        this.toppings = toppings;
        this.quantity = quantity;
    }

    Pizza.prototype.deliveryPrice = 200;

    Pizza.prototype.orderTotal = 0;

    Pizza.prototype.pizzaSizePrices = [
        { size: "small", price: 550 }, 
        { size: "medium", price: 850 },
        { size: "large", price: 1050 },
        { size: "extralarge", price: 1200 },
    ];

    Pizza.prototype.toppings = [
        { name: "pepperoni", price: 60 },
        { name: "mushrooms", price: 70 },
        { name: "onions", price: 50 },
        { name: "sausage", price: 60 },
        { name: "extraCheese", price: 100 },
        { name: "blackOlives", price: 80 },
        { name: "greenPeppers", price: 50 }
    ];


})
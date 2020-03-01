$(document).ready(function(){
    function Pizza (size, crustType, toppings, quantity, isDelivery){
        this.size = size;
        this.crustType = crustType;
        this.toppings = toppings;
        this.quantity = quantity;
    }

    Pizza.prototype.deliveryPrice = 150;

    Pizza.prototype.orderTotal = 0;

    Pizza.prototype.pizzaSizePrices = [
        { size: "small", price: 550 }, 
        { size: "medium", price: 850 },
        { size: "large", price: 1050 },
        { size: "extralarge", price: 1200 },
    ];

    


})
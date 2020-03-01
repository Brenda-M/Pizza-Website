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

    Pizza.prototype.getTotal = function () {
        let total = 0;

        if (this.size) {
            const pizzaSize = this.size;

            const cost = Pizza.prototype.pizzaSizePrices.find(function (p) {
                return p.size === pizzaSize;
            });

            total = total + cost.price;
        }
    }

    if (this.toppings) {     
        let toppingsTotal = 0;
        const pizzaToppings = this.toppings;
  
        for (let i = 0; i < pizzaToppings.length; i++) {
            const topping = Pizza.prototype.toppingsPrices.find(function (p) {
                return p.name === pizzaToppings[i].trim();
            });
            
            toppingsTotal = toppingsTotal + topping.price;
        }
  
        total = total + toppingsTotal;
    }

    total = total * this.quantity;

    if (this.isDelivery === "yes") {
        total = total + Pizza.prototype.deliveryPrice;
      } else {
        total = total + 0;
      }
  
      Pizza.prototype.orderTotal = total;
  
      return total;
    }


})
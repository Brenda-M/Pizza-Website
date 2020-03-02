$(document).ready(function () {
    function Pizza(size, crustType, toppings, quantity, isDelivery) {
        this.size = size;
        this.crustType = crustType;
        this.toppings = toppings;
        this.quantity = quantity;
        this.isDelivery = isDelivery;
    }

    Pizza.prototype.deliveryPrice = 150;

    Pizza.prototype.orderTotal = 0;

    Pizza.prototype.pizzaSizePrices = [
        { size: "small", price: 550 },
        { size: "medium", price: 850 },
        { size: "large", price: 1050 },
        { size: "extraLarge", price: 1200 }
    ];

    Pizza.prototype.toppingsPrices = [
        { name: "pepperoni", price: 60 },
        { name: "mushrooms", price: 80 },
        { name: "onions", price: 50 },
        { name: "sausage", price: 70 },
        { name: "extraCheese", price: 100 },
        { name: "blackOlives", price: 80 },
        { name: "greenPeppers", price: 80 }
    ];

    Pizza.prototype.getTotal = function () {
        let total = 0;

        if (this.size) {
            const pizzaSize = this.size;

            const size = Pizza.prototype.pizzaSizePrices.find(function (p) {
                return p.size === pizzaSize;
            });

            total = total + size.price;
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

    // Get pizza name from url
    const urlParams = new URLSearchParams(window.location.search);
    const pizzaName = urlParams.get("pizza");

    // Add pizza name to html
    $("#pizza-name").html(pizzaName);
    $("#summary-name").html(pizzaName);

    // Hide delivery address input
    $("#yes-delivery").hide();

    // Get input references
    let pizzaSize = "";
    let crustType = "";
    let delivery = "";
    let quantity = 1;
    let toppings = [];

    function totalHelper() {
        const newPizza = new Pizza(pizzaSize, crustType, toppings, quantity, delivery);
        const newTotal = newPizza.getTotal();

        $("#summary-total").html(`Total - Ksh. ${newTotal}`);
    }

    // Populate order summary
    // Update pizza size on summary section
    $("input[name=pizzaSizes]").change(function () {
        pizzaSize = $('input[name=pizzaSizes]:checked').val();

        $("#summary-size").html(`Size - ${pizzaSize}`);

        // Get new total
        totalHelper();
    });

    // Update crust type on summary section
    $("input[name=crustType]").change(function () {
        crustType = $('input[name=crustType]:checked').val();

        $("#summary-crust").html(`Crust - ${crustType}`);

        // Get new total
        totalHelper();
    });

    // Update toppings on summary section
    $("input[name=toppings]").change(function () {
        const newToppings = [];

        $.each($("input[name='toppings']:checked"), function () {
            // Add a space before the array item to allow for text wrapping
            newToppings.push(` ${$(this).val()}`);
        });

        toppings = newToppings;

        $("#summary-toppings").html(`Toppings - ${toppings}`);

        // Get new total
        totalHelper();
    });

    // Update delivery on summary section
    $("input[name=delivery]").change(function () {
        delivery = $('input[name=delivery]:checked').val();

        if (delivery === "no") {
            $("#yes-delivery").hide();
            $("#summary-delivery").html(`Delivery fee - Ksh. 0`);

            // Get new total
            totalHelper();
        } else if (delivery === "yes") {
            $("#yes-delivery").show();
            $("#summary-delivery").html(`Delivery fee - Ksh. ${Pizza.prototype.deliveryPrice}`);

            // Get new total
            totalHelper();
        }
    });

    // Update quantity
    $("#quantity").change(function () {
        const newQuantity = $('#quantity').val();

        if (newQuantity < 1) {
            quantity = 1;
            $('#quantity').val(1);
        } else {
            quantity = newQuantity;
        }

        // Get new total
        totalHelper();
    });

    function showError(message) {
        $(".error-container").fadeIn();

        $(".error-container").html(`
      <div class="alert alert-danger" role="alert">
        ${message}
      </div>
    `);

        setTimeout(function () {
            $(".error-container").fadeOut();
        }, 5000);
    }


    function placeOrder() {
        if (!pizzaSize) {
            return showError("You must select a pizza size");
        }

        if (!crustType) {
            return showError("You must select a crust type");
        }

        if (!delivery) {
            return showError("You must select a delivery option");
        }

        const newToppings = [];

        $.each($("input[name='toppings']:checked"), function () {
            newToppings.push($(this).val());
        });

        toppings = newToppings;

        // Get new total
        totalHelper();

        // Build out the order modal content
        const deliveryAddress = $("#delivery-address").val();

        $("#order-summary-name").html(pizzaName);
        $("#order-summary-size").html(`<b>Size</b> <br/> ${pizzaSize}`);
        $("#order-summary-crust").html(`<b>Crust Type</b> <br/> ${crustType}`);
        $("#order-summary-toppings").html(`<b>Toppings</b> <br/> ${toppings}`);
        $("#order-summary-quantity").html(`<b>Quantity</b> <br/> ${quantity}`);
        $("#order-summary-total").html(`<b>Total</b> <br/> Ksh. ${Pizza.prototype.orderTotal}`);

        if (delivery === "yes") {
            $("#order-summary-delivery-fee").html(`<b>Delivery Fee</b> <br/> Ksh. ${Pizza.prototype.deliveryPrice}`);
        } else {
            $("#order-summary-delivery-fee").html(`<b>Delivery Fee</b> <br/> Ksh. 0`);
        }

        $("#order-summary-delivery-address").html(`<b>Delivery Address</b> <br/> ${deliveryAddress}`);

        // Show order modal
        $('#orderModal').modal('show');
    }

    $("#order-btn").click(function () {
        placeOrder();
    });
});
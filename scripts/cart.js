/**
 * Created by Mohamed on 1/28/2017.
 */
(function () {
    window.shoppingCart = {
        updateCartCount: function () {
            var cart = shoppingCart.getCart();
            $("#cart-count").text(cart.length);
        },
        saveCart: function (cart) {
            localStorage.setItem("shopping_cart", JSON.stringify(cart));
        },
        getCart: function () {
            var cart = localStorage.getItem("shopping_cart");

            if (cart) {
                return JSON.parse(cart);
            }
            else {
                return [];
            }
        }
    };

    window.onAddToCart = function (event) {
        var product = {
            id: $("form[name='product-details'] input[name='id']").val(),
            ship_from: $("form[name='product-details'] input[name='ship_from']:checked").val()
        };

        var cartArray = shoppingCart.getCart();
        cartArray.push(product);
        shoppingCart.saveCart(cartArray);
        shoppingCart.updateCartCount();

        // To stop form submit
        return false;
    };
})();
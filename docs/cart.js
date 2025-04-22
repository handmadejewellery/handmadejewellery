document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    displayCartItems();
});

// Function to add items to cart
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name: productName, price: price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(productName + " added to cart!");
}

// Update cart count in navbar
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

// Display cart items in cart page
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cart-list");
    let total = 0;

    if (cartList) {
        cartList.innerHTML = "";
        cart.forEach((item, index) => {
            let li = document.createElement("li");
            li.textContent = `${item.name} - ₹${item.price}`;
            
            let removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.onclick = function () {
                removeItem(index);
            };
            
            li.appendChild(removeBtn);
            cartList.appendChild(li);
            total += item.price;
        });

        document.getElementById("cart-total").textContent = total;
    }
}

// Remove item from cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Checkout function with WhatsApp contact
function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Construct order details message
    let orderDetails = cart.map(item => `${item.name} - ₹${item.price}`).join('\n');
    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    let message = `Hello, I want to place an order:\n\n${orderDetails}\n\nTotal: ₹${totalPrice}\nPlease confirm.`;
    
    // Properly encode the message for URL
    let encodedMessage = encodeURIComponent(message);

    // Replace with your actual WhatsApp number (country code + number, no + or dashes)
    let whatsappNumber = "919492308024";
    let whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Optional: Confirm before redirecting
    if (confirm("You will be redirected to WhatsApp to complete your order.")) {
        // Clear cart and redirect
        localStorage.removeItem("cart");
        window.location.href = whatsappURL;
    }
}


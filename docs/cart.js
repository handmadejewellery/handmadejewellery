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
    let orderDetails = cart.map(item => `${item.name} - ₹${item.price}`).join("\n");
    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    let message = encodeURIComponent(`Hello, I want to place an order:\n\n${orderDetails}\n\nTotal: ₹${totalPrice}\nPlease confirm.`);

    // Replace 'YOUR_PHONE_NUMBER' with the actual WhatsApp number (include country code)
    let whatsappNumber = "919492308024";  // Example: +91 for India, followed by the number
    let whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Clear cart and redirect to WhatsApp
    localStorage.removeItem("cart");
    window.location.href = whatsappURL;
}

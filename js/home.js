const cart = [];
const cartElement = document.getElementById("cart");
const totalPriceElement = document.getElementById("total-price");

// Add to Cart Functionality
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));

        // Add item to cart
        cart.push({ name, price });
        renderCart();
    });
});

// Render Cart
function renderCart() {
    cartElement.innerHTML = ""; // Clear previous cart items

    if (cart.length === 0) {
        cartElement.innerHTML = "<p>The cart is empty.</p>";
        totalPriceElement.textContent = "Total: $0";
        return;
    }

    // Display cart items
    let total = 0;
    cart.forEach((item, index) => {
        const cartItem = document.createElement("p");
        cartItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartElement.appendChild(cartItem);

        total += item.price;
    });

    // Update total price
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;

    // Add Remove Item Functionality
    document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", () => {
            const index = parseInt(button.getAttribute("data-index"));
            cart.splice(index, 1); // Remove item from cart
            renderCart(); // Re-render cart
        });
    });
}

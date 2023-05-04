// define cart variable and get cart element
let cart = [];
const cartElement = document.getElementById("cart");

// add click event listeners to all 'Add to Cart' buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = {
      name: button.parentElement.querySelector("h3").innerText,
      price: parseFloat(button.dataset.price),
    };
    cart.push(item);
    updateCart();
  });
});

// function to update cart element with current cart items
function updateCart() {
  calculateTotal();

  cartElement.innerHTML = "";
  cart.forEach((item) => {
    const cartItemElement = document.createElement("li");
    cartItemElement.innerText = `${item.name}: $${item.price.toFixed(2)}`;
    cartElement.appendChild(cartItemElement);
  });
}

// function to calculate and display total cart value
function calculateTotal() {
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
  });
  const totalElement = document.getElementById("cart-total");
  console.log(total);
  totalElement.innerText = total;
}

// call calculateTotal function initially

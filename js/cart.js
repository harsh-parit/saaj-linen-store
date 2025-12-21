const summaryItemsEl = document.getElementById("cart-summary-items");
const cartItemsContainer = document.getElementById("cart-items");
const subtotalEl = document.getElementById("subtotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  summaryItemsEl.innerHTML = "";
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    subtotalEl.textContent = "0";
    localStorage.setItem("cart", JSON.stringify([]));
    return;
  }

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    const summaryRow = document.createElement("div");
summaryRow.className = "summary-item";

summaryRow.innerHTML = `
  <span>${item.name} × ${item.quantity}</span>
  <span>₹${item.price * item.quantity}</span>
`;

summaryItemsEl.appendChild(summaryRow);

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br/>
        ₹${item.price}
      </div>
      <div class="cart-actions">
        <button data-index="${index}" class="increase">+</button>
        <span class="qty">${item.quantity}</span>
        <button data-index="${index}" class="decrease">−</button>
        <button data-index="${index}" class="remove">✕</button>
      </div>
    `;

    cartItemsContainer.appendChild(div);
  });

  subtotalEl.textContent = subtotal;
  localStorage.setItem("cart", JSON.stringify(cart));
}

cartItemsContainer.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (index === undefined) return;

  if (e.target.classList.contains("increase")) {
    cart[index].quantity += 1;
  }

  if (e.target.classList.contains("decrease")) {
    cart[index].quantity -= 1;
    if (cart[index].quantity === 0) cart.splice(index, 1);
  }

  if (e.target.classList.contains("remove")) {
    cart.splice(index, 1);
  }

  renderCart();
});

renderCart();

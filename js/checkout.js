const isLoggedIn = localStorage.getItem("isLoggedIn");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (!isLoggedIn) {
  window.location.href = "login.html";
}

const totalEl = document.getElementById("checkout-total");
const itemsEl = document.getElementById("checkout-items");
const placeOrderBtn = document.getElementById("place-order");

let total = 0;
itemsEl.innerHTML = "";

cart.forEach(item => {
  const itemTotal = item.price * item.quantity;
  total += itemTotal;

  const row = document.createElement("div");
  row.className = "summary-item";

  row.innerHTML = `
    <span>${item.name} × ${item.quantity}</span>
    <span>₹${itemTotal}</span>
  `;

  itemsEl.appendChild(row);
});

totalEl.textContent = total;

placeOrderBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const pincode = document.getElementById("pincode").value.trim();

  if (!name || !address || !pincode) {
    alert("Please fill all delivery details");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  localStorage.removeItem("cart");
  window.location.href = "success.html";
});

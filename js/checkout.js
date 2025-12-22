/* =====================================================
   LOGIN GUARD (REDIRECT AFTER LOGIN)
===================================================== */
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (!isLoggedIn) {
  // Save intended page
  localStorage.setItem("redirectAfterLogin", window.location.pathname);
  window.location.href = "login.html";
}

/* =====================================================
   LOAD CART & ELEMENTS
===================================================== */
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const totalEl = document.getElementById("checkout-total");
const itemsEl = document.getElementById("checkout-items");
const placeOrderBtn = document.getElementById("place-order");

/* =====================================================
   RENDER ORDER SUMMARY
===================================================== */
let total = 0;
itemsEl.innerHTML = "";

cart.forEach((item) => {
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

/* =====================================================
   PLACE ORDER
===================================================== */
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

  // Clear cart after successful order
  localStorage.removeItem("cart");

  // Redirect to success page
  window.location.href = "success.html";
});

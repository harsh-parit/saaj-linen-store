document.addEventListener("DOMContentLoaded", () => {
  const countEl = document.getElementById("cart-count");
  if (!countEl) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalQty = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

if (totalQty > 0) {
  countEl.textContent = totalQty;
  countEl.style.display = "inline-flex";
} else {
  countEl.style.display = "none";
}
});
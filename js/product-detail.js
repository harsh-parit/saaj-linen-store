// Read product id from URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"), 10);

const container = document.getElementById("product-detail");

if (!productId || typeof products === "undefined") {
  container.innerHTML = "<p>Product not found.</p>";
} else {
  const product = products.find(p => p.id === productId);

  if (!product) {
    container.innerHTML = "<p>Product not found.</p>";
  } else {
    container.innerHTML = `
      <div class="product-detail-image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="product-detail-info">
        <h1>${product.name}</h1>
        <p class="price">₹${product.price}</p>
        <p class="description">
          Crafted from breathable natural linen for everyday comfort.
        </p>
        <button class="btn-primary" id="add-to-cart">Add to Cart</button>
      </div>
    `;

    // Add to cart
    document.getElementById("add-to-cart").addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(item => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    });
  }
}

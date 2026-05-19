const grid = document.getElementById("products-grid");

if (!grid) {
  console.error("products-grid not found in HTML");
}

/* ===============================
   LOAD PRODUCTS
================================ */
async function loadProducts() {
  try {
    const response = await fetch("./data/products.json");

    if (!response.ok) {
      throw new Error("Failed to load products");
    }

    const products = await response.json();

    // Show only active products
    const activeProducts = products.filter(
      (p) => p.is_active
    );

    renderProducts(activeProducts);

  } catch (error) {
    console.error("Error loading products:", error);

    grid.innerHTML = `
      <p style="text-align:center;">
        Failed to load products.
      </p>
    `;
  }
}

/* ===============================
   RENDER PRODUCTS
================================ */
function renderProducts(products) {
  grid.innerHTML = "";

  if (!products.length) {
    grid.innerHTML = "<p>No products available</p>";
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-img">
        <img
          src="${product.image_url || "assets/images/placeholder.png"}"
          alt="${product.name}"
        />
      </div>

      <h3>${product.name}</h3>

      <p>₹${product.price}</p>

      <button class="btn-primary add-to-cart">
        Add to Cart
      </button>
    `;

    // Open PDP
    card.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    // Add to cart
    const button = card.querySelector(".add-to-cart");

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(product);
    });

    grid.appendChild(card);
  });
}

/* ===============================
   ADD TO CART
================================ */
function addToCart(product) {
  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(
    (item) => item.id === product.id
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
      quantity: 1,
    });
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
}

/* ===============================
   INIT
================================ */
loadProducts();
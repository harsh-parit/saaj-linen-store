const grid = document.getElementById(
  "featured-products"
);

/* ===============================
   LOAD FEATURED PRODUCTS
================================ */
async function loadFeaturedProducts() {
  try {
    const response = await fetch(
      "./data/products.json"
    );

    if (!response.ok) {
      throw new Error(
        "Failed to load featured products"
      );
    }

    const products = await response.json();

    // Active only + limit 4
    const featuredProducts = products
      .filter((p) => p.is_active)
      .slice(0, 4);

    renderFeaturedProducts(featuredProducts);

  } catch (error) {
    console.error(error);

    grid.innerHTML = `
      <p style="text-align:center;">
        Failed to load featured products.
      </p>
    `;
  }
}

/* ===============================
   RENDER PRODUCTS
================================ */
function renderFeaturedProducts(products) {
  grid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `
      <div class="product-img">
        <img
          src="${product.image_url || "assets/images/placeholder.png"}"
          alt="${product.name}"
        >
      </div>

      <h3>${product.name}</h3>

      <p>₹${product.price}</p>

      <button class="btn-primary add-to-cart">
        Add to Cart
      </button>
    `;

    // Open PDP
    card.addEventListener("click", () => {
      window.location.href =
        `product.html?id=${product.id}`;
    });

    // Add to cart
    const button =
      card.querySelector(".add-to-cart");

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
loadFeaturedProducts();
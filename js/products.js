import { supabase } from "./supabase.js";

const grid = document.getElementById("products-grid");

if (!grid) {
  console.error("products-grid not found in HTML");
}

/* ===============================
   LOAD PRODUCTS FROM DB
================================ */
async function loadProducts() {
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      price,
      image_url,
      is_active
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  renderProducts(products);
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
      <button class="btn-primary add-to-cart">Add to Cart</button>
    `;

    card.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    const button = card.querySelector(".add-to-cart");
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(product);
    });

    grid.appendChild(card);
  });
}

/* ===============================
   CART LOGIC
================================ */
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.id === product.id);

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

  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ===============================
   INIT
================================ */
loadProducts();
import { supabase } from "./supabase.js";

const grid = document.getElementById("featured-products");

/* ===============================
   LOAD FEATURED PRODUCTS
================================ */
async function loadFeaturedProducts() {
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      price,
      image_url
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(4); // 👈 show only 4 on home

  if (error) {
    console.error("Error loading featured products:", error);
    return;
  }

  renderFeaturedProducts(products);
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
      <button class="btn-primary add-to-cart">Add to Cart</button>
    `;

    // Card click → PDP
    card.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    // Add to cart (stop card click)
    const button = card.querySelector(".add-to-cart");
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(product);
    });

    grid.appendChild(card);
  });
}

/* ===============================
   CART LOGIC (SAME AS OTHERS)
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
loadFeaturedProducts();
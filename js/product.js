import { supabase } from "./supabase.js";

/* ===============================
   GET PRODUCT ID FROM URL
================================ */
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
  showNotFound();
}

/* ===============================
   LOAD PRODUCT FROM SUPABASE
================================ */
async function loadProduct() {
  const { data: product, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      price,
      image_url,
      description,
      is_active
    `)
    .eq("id", productId)
    .eq("is_active", true)
    .single();

  if (error || !product) {
    console.error(error);
    showNotFound();
    return;
  }

  renderProduct(product);
}

/* ===============================
   RENDER PRODUCT
================================ */
function renderProduct(product) {
  const imageEl = document.getElementById("product-image");
  const nameEl = document.getElementById("product-name");
  const priceEl = document.getElementById("product-price");
  const descEl = document.getElementById("product-description");
  const addBtn = document.getElementById("add-to-cart");

  imageEl.src = product.image_url || "assets/images/placeholder.png";
  imageEl.alt = product.name;

  nameEl.innerText = product.name;
  priceEl.innerText = `₹${product.price}`;
  descEl.innerText =
    product.description || "Premium linen crafted for everyday comfort.";

  addBtn.addEventListener("click", () => addToCart(product));
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
   ERROR STATE
================================ */
function showNotFound() {
  document.querySelector(".product-detail").innerHTML = `
    <div style="padding:80px;text-align:center">
      <h2>Product not found</h2>
      <p>This product may be unavailable.</p>
      <a href="products.html" class="btn-primary">Back to Shop</a>
    </div>
  `;
}

/* ===============================
   INIT
================================ */
loadProduct();
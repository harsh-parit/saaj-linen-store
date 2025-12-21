import { supabase } from "./supabase.js";

const tbody = document.querySelector("tbody");
const modal = document.getElementById("product-modal");

let editingProductId = null;

/* ===============================
   LOAD PRODUCTS
================================ */
async function loadProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      price,
      is_active,
      image_url,
      category_id,
      categories:category_id ( name )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  tbody.innerHTML = "";

  data.forEach((p) => {
    tbody.innerHTML += `
      <tr>
        <td>
          <img 
            src="${p.image_url || "assets/images/placeholder.png"}"
            alt="${p.name}"
            style="width:48px;height:48px;object-fit:cover;border-radius:6px;"
          />
        </td>
        <td>${p.name}</td>
        <td>${p.categories?.name || "-"}</td>
        <td>₹${p.price}</td>
        <td>
          <span class="status ${p.is_active ? "active" : "inactive"}">
            ${p.is_active ? "Active" : "Inactive"}
          </span>
        </td>
        <td>
          <button class="btn-small" onclick="editProduct('${p.id}')">Edit</button>
          <button class="btn-small danger" onclick="deleteProduct('${p.id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

/* ===============================
   LOAD CATEGORIES (MODAL)
================================ */
async function loadCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) return;

  const select = document.getElementById("product-category");
  select.innerHTML = `<option value="">Select category</option>`;

  data.forEach((c) => {
    select.innerHTML += `<option value="${c.id}">${c.name}</option>`;
  });
}

/* ===============================
   IMAGE UPLOAD (SUPABASE STORAGE)
================================ */
async function uploadImage(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  const fileName = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    alert("Image upload failed");
    return null;
  }

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

/* ===============================
   MODAL HANDLING
================================ */
window.openProductModal = function () {
  editingProductId = null;
  document.getElementById("modal-title").innerText = "Add Product";
  clearForm();
  modal.classList.remove("hidden");
};

window.closeProductModal = function () {
  modal.classList.add("hidden");
};

/* ===============================
   SAVE PRODUCT (ADD / EDIT)
================================ */
window.saveProduct = async function () {
  const name = document.getElementById("product-name").value.trim();
  const price = Number(document.getElementById("product-price").value);
  const categoryId = document.getElementById("product-category").value;
  const description = document.getElementById("product-description").value.trim();
  const isActive = document.getElementById("product-active").checked;

  const imageFile =
    document.getElementById("product-image-file")?.files[0] || null;
  const imageUrlInput =
    document.getElementById("product-image-url")?.value.trim() || "";

  if (!name || !price || !categoryId) {
    alert("Name, price and category are required");
    return;
  }

  let image_url = imageUrlInput || null;

  // ✅ Upload image if file selected
  if (imageFile) {
    image_url = await uploadImage(imageFile);
    if (!image_url) return;
  }

  const payload = {
    name,
    price,
    image_url,
    category_id: categoryId,
    description,
    is_active: isActive,
  };

  if (editingProductId) {
    await supabase.from("products").update(payload).eq("id", editingProductId);
  } else {
    await supabase.from("products").insert([payload]);
  }

  closeProductModal();
  loadProducts();
};

/* ===============================
   EDIT PRODUCT
================================ */
window.editProduct = async function (id) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) return;

  editingProductId = id;
  document.getElementById("modal-title").innerText = "Edit Product";

  document.getElementById("product-name").value = data.name;
  document.getElementById("product-price").value = data.price;
  document.getElementById("product-image-url").value = data.image_url || "";
  document.getElementById("product-category").value = data.category_id;
  document.getElementById("product-description").value = data.description || "";
  document.getElementById("product-active").checked = data.is_active;

  modal.classList.remove("hidden");
};

/* ===============================
   DELETE PRODUCT
================================ */
window.deleteProduct = async function (id) {
  if (!confirm("Delete this product?")) return;
  await supabase.from("products").delete().eq("id", id);
  loadProducts();
};

/* ===============================
   HELPERS
================================ */
function clearForm() {
  document.getElementById("product-name").value = "";
  document.getElementById("product-price").value = "";
  document.getElementById("product-image-url").value = "";
  document.getElementById("product-category").value = "";
  document.getElementById("product-description").value = "";
  document.getElementById("product-active").checked = true;

  const fileInput = document.getElementById("product-image-file");
  if (fileInput) fileInput.value = "";
}

/* ===============================
   INIT
================================ */
loadCategories();
loadProducts();
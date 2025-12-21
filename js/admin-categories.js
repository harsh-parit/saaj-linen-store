import { supabase } from "./supabase.js";

const tbody = document.querySelector("tbody");
const modal = document.getElementById("category-modal");

let editingCategoryId = null;

/* ===============================
   LOAD CATEGORIES
================================ */
async function loadCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error(error);
    return;
  }

  tbody.innerHTML = "";

  data.forEach((c) => {
    tbody.innerHTML += `
      <tr>
        <td>${c.name}</td>
        <td>
          <button class="btn-small" onclick="editCategory('${c.id}', '${c.name}')">
            Edit
          </button>
          <button class="btn-small danger" onclick="deleteCategory('${c.id}')">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

/* ===============================
   MODAL HANDLING
================================ */
window.openCategoryModal = function () {
  editingCategoryId = null;
  document.getElementById("category-modal-title").innerText = "Add Category";
  document.getElementById("category-name").value = "";
  modal.classList.remove("hidden");
};

window.closeCategoryModal = function () {
  modal.classList.add("hidden");
};

/* ===============================
   SAVE CATEGORY (ADD / EDIT)
================================ */
window.saveCategory = async function () {
  const name = document.getElementById("category-name").value.trim();

  if (!name) {
    alert("Category name is required");
    return;
  }

  if (editingCategoryId) {
    await supabase
      .from("categories")
      .update({ name })
      .eq("id", editingCategoryId);
  } else {
    await supabase
      .from("categories")
      .insert([{ name }]);
  }

  closeCategoryModal();
  loadCategories();
};

/* ===============================
   EDIT CATEGORY
================================ */
window.editCategory = function (id, name) {
  editingCategoryId = id;
  document.getElementById("category-modal-title").innerText = "Edit Category";
  document.getElementById("category-name").value = name;
  modal.classList.remove("hidden");
};

/* ===============================
   DELETE CATEGORY
================================ */
window.deleteCategory = async function (id) {
  if (!confirm("Delete this category?")) return;
  await supabase.from("categories").delete().eq("id", id);
  loadCategories();
};

/* ===============================
   INIT
================================ */
loadCategories();
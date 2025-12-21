import { supabase } from "./supabase.js";

async function loadDashboardStats() {
  // Total Products
  const { count: productCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  // Total Categories
  const { count: categoryCount } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true });

  // Orders (not implemented yet)
  const orderCount = 0;

  document.getElementById("total-products").innerText =
    productCount ?? 0;

  document.getElementById("total-categories").innerText =
    categoryCount ?? 0;

  document.getElementById("total-orders").innerText =
    orderCount;
}

loadDashboardStats();
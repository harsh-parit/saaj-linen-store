import { supabase } from "./supabase.js";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.querySelector("input[type='email']").value.trim();
  const password = form.querySelector("input[type='password']").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Invalid credentials");
    return;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile?.is_admin) {
    await supabase.auth.signOut();
    alert("Access denied");
    return;
  }

  // Temporary local flag (used by admin guard)
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("isAdmin", "true");

  window.location.href = "admin-dashboard.html";
});

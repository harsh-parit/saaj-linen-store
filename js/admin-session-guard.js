import { supabase } from "./supabase.js";

(async function () {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in
  if (!user) {
    window.location.href = "admin-login.html";
    return;
  }

  // Check admin flag
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (error || !profile?.is_admin) {
    await supabase.auth.signOut();
    window.location.href = "admin-login.html";
  }
})();

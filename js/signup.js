/* =====================================================
   PREVENT SIGNUP IF ALREADY LOGGED IN
===================================================== */
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn) {
  // User already logged in → send to home
  window.location.href = "index.html";
}

/* =====================================================
   SIGNUP LOGIC
===================================================== */
const form = document.querySelector(".signup-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) {
    alert("Please fill all fields");
    return;
  }

  // Mock signup (frontend-only)
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);

  // Redirect user back to intended page (if any)
  const redirectPath = localStorage.getItem("redirectAfterLogin");

  if (redirectPath) {
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = redirectPath;
  } else {
    window.location.href = "index.html";
  }
});

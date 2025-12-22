/* =====================================================
   PREVENT LOGIN IF ALREADY LOGGED IN
===================================================== */
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn) {
  // User already logged in → redirect to home
  window.location.href = "index.html";
}

/* =====================================================
   LOGIN LOGIC
===================================================== */
const form = document.querySelector(".site-login-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = document.querySelector("input[type='email']");
    const email = emailInput.value.trim();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    // Mock login (frontend-only)
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    // Redirect user to intended page if exists
    const redirectPath = localStorage.getItem("redirectAfterLogin");

    if (redirectPath) {
      localStorage.removeItem("redirectAfterLogin");
      window.location.href = redirectPath;
    } else {
      window.location.href = "index.html";
    }
  });
}

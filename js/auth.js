document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");

  if (!form) {
    console.error("Login form not found");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.querySelector('input[type="email"]').value.trim();
    const password = form.querySelector('input[type="password"]').value.trim();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // mock login
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    console.log("Login success, redirecting...");
    window.location.replace("index.html");
  });
});

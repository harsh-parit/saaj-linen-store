const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = form
    .querySelector('input[type="email"]')
    .value
    .trim();

  const password = form
    .querySelector('input[type="password"]')
    .value
    .trim();

  // Admin Credentials
  const ADMIN_EMAIL = "admin@saaj.com";
  const ADMIN_PASSWORD = "admin123";

  if (
    email === ADMIN_EMAIL &&
    password === ADMIN_PASSWORD
  ) {
    localStorage.setItem("isAdmin", "true");
    localStorage.setItem("adminEmail", email);

    window.location.href =
      "admin-dashboard.html";
  } else {
    alert("Invalid admin credentials");
  }
});
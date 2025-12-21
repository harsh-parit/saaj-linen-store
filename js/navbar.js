document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.getElementById("auth-link");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!authLink) return;

  if (isLoggedIn === "true") {
    authLink.textContent = "Logout";
    authLink.href = "#";

    authLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      window.location.reload();
    });
  } else {
    authLink.textContent = "Login";
    authLink.href = "login.html";
  }
});

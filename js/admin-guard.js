(function () {
  const isAdmin =
    localStorage.getItem("isAdmin");

  if (isAdmin !== "true") {
    window.location.href =
      "admin-login.html";
  }
})();
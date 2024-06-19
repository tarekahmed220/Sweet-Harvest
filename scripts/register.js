document.addEventListener("DOMContentLoaded", function () {
  var username = document.getElementById("U_Name");
  var password = document.getElementById("password");
  var email = document.getElementById("email");
  var registerbtn = document.getElementById("btn");

  registerbtn.addEventListener("click", function (e) {
    e.preventDefault();
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var userId = Date.now();
    users.push({
      id: userId,
      username: username.value.trim(),
      password: password.value,
      email: email.value,
    });
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "login.html";
  });
});

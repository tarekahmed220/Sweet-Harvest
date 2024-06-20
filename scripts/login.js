var email = document.getElementById("email");
var password = document.getElementById("password");

var loginBtn = document.getElementById("btn");
var admin = "admin@iti.com";
var adminPassword = "admin@123";

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    email.value.trim() === "admin@iti.com" &&
    password.value.trim() === "admin@123"
  ) {
    window.location = "./dashbord.html";
    return;
  }
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var validUser = false;
  users.forEach((user) => {
    if (
      user.email === email.value.trim() &&
      user.password === password.value.trim()
    ) {
      validUser = true;
      window.location = "home.html";
      return;
    }
  });

  if (!validUser) {
    alert("user name or password is wrong, please try again");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var username = document.getElementById("U_Name");
  var password = document.getElementById("password");
  var email = document.getElementById("email");
  var registerbtn = document.getElementById("btn");

  registerbtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (username.value == "" || password.value == "" || email.value == "") {
      alert("please complete your data");
    } else if (
      username.value.match(/[a-zA-Z_]{3,8}/i) &&
      password.value.match(/[a-zA-Z0-9]{8,}/) &&
      email.value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i)
    ) {
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
    } else {
      alert("please enter valid data");
    }
  });
});

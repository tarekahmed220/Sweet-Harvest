// show username
let user_data = document.getElementById("user_data");
let user = document.getElementById("user");
let login = document.getElementById("login");
//logout
let logout = document.getElementById("logout");
logout.addEventListener("click", function () {
  localStorage.setItem("isLogin", "false");
  localStorage.removeItem("activeUser");
  window.location = "login.html";
});

// count of cart

var count_cart = document.getElementById("count_cart");

var products = JSON.parse(localStorage.getItem("products")) || [];
function draw() {
  let product_content = document.querySelector(".product-content");
  let productsContainer = ``;
  products.map((product) => {
    productsContainer += `
          <div class="product_item ${product.category}">
            <img src="${product.img}" alt="product">
            <div class="product-layer">
              <h4>${product.category}</h4>
              <p>${product.title}</p>
              <p>${product.price} <span>$</span></p>
              <p>InStock:<span>${product.stock_Quantity}</span></p>
              <button class="add-to-cart" onclick = "cart(${product.id},this)"><i class="fa-solid fa-cart-plus" ></i></button>
              
              <button class="add-to-wishlist" onclick="wishlist(${product.id},this)"><i class="fa-solid fa-heart-circle-plus" ></i></button>
            </div>
          </div>
          `;
  });

  product_content.innerHTML = productsContainer;
}
draw();

// Search

/* let input = document.getElementById("search");
input.addEventListener('keyup',(e)=>{
  if(e)
}) */

// function search(title,products){
//   console.log(title);
//   console.log(products);
//   let products_search = products.find((object)=>object.title === title)
//     console.log(products_search)

// }

// console.log(products)
// let stock = JSON.parse(localStorage.getItem("products"))

// console.log(stock);

// search('cloves',stock);
var isLogin = localStorage.getItem("isLogin") === "true";
if (isLogin) {
  var activeUser = JSON.parse(localStorage.getItem("activeUser"));
  if (activeUser) {
    var username = activeUser.username;
    login.remove();
    user_data.style.display = "flex";
    user.innerHTML = username;
  }
}

//filter
let switcherlist = document.querySelectorAll(".switcher li");
let product_filter = document.querySelectorAll(".product_item"); // after fetch data
// console.log(product_filter);
// console.log(switcherlist);

switcherlist.forEach(function (li) {
  //function before addevenlistener mustbe anonymous function
  // console.log(li);
  li.addEventListener("click", function () {
    switcherlist.forEach((element) => {
      console.log(element);
      element.classList.remove("active");
      console.log(element);
      this.classList.add("active");
    });
  });
  li.addEventListener("click", function () {
    product_filter.forEach((element) => {
      console.log(element);
      element.style.display = "none";
    });
    document.querySelectorAll(this.dataset.cat).forEach((element) => {
      element.style.display = "block";
    });
  });
});

//cart
var productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];

// let isLogin = localStorage.getItem("isLogin") === "true";
if (isLogin) {
  count_cart.style.display = "block";
  count_cart.innerHTML = productsInCart.length;
} else {
  count_cart.style.display = "none";
  count_cart.innerHTML = "";
}

function cart(id, element) {
  let isLogin = localStorage.getItem("isLogin") === "true";
  if (isLogin) {
    //find product
    let targetProduct = products.find((element) => element.id === id); // to return object of product
    let targetProductIndex = targetProduct.id;
    console.log(targetProduct);
    targetProduct.stock_Quantity = targetProduct.stock_Quantity - 1;
    productsInCart.push(targetProduct);
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    products.splice(targetProductIndex, 1, targetProduct);
    localStorage.setItem("products", JSON.stringify(products));
    count_cart.style.display = "block"; // show count of cart
    count_cart.innerHTML = productsInCart.length;
    element.setAttribute("disabled", true);
  } else {
    console.log("please login");
    window.location = "login.html"; // to redirection to login page
  }
}

//wishlist
function wishlist(id) {
  console.log("click on add to wishlist");
  if (username) {
    console.log(id);
    const client = username[0].username;
    sessionStorage.setItem(client + " add to wishlist product " + id, id);
  }
}

//tocart
function toCart() {
  let isLogin = localStorage.getItem("isLogin") === "true";
  if (isLogin) {
    window.location = "cart.html";
  } else {
    window.location = "login.html";
  }
}

// contact form
var contactEmail = document.querySelector(".email");
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;
var validContainer = document.querySelector(".validContainer");
var validationmsg = document.querySelector(".validationmsg");
document
  .querySelector(".submit")
  .addEventListener("click", function handleClick(e) {
    e.preventDefault();
    if (contactEmail.value == "") {
      validContainer.style.display = "flex";
      validationmsg.textContent = "Please enter Your Email";
      contactEmail.style.border = "2px solid red";
    } else if (!contactEmail.value.includes("@")) {
      console.log("mail not valid");
      validContainer.style.display = "flex";
      validationmsg.textContent =
        "Please enter valid Email, your Email must contains (@)";
      contactEmail.style.border = "2px solid red";
    } else if (!regex.test(contactEmail.value)) {
      console.log("mail not valid");
      validContainer.style.display = "flex";
      validationmsg.textContent = "Your email is not a valid email!";
      contactEmail.style.border = "2px solid red";
    } else {
      validContainer.style.display = "none";
      contactEmail.style.border = "#eac500 2px solid";
      contactEmail.value = "";
    }
  });

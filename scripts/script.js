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
function insertProductToLS() {
  let products = [
    {
      id: 11,
      category: "Honey",
      title: "clover",
      img: "../assets/images/products/honey_1.jpg",
      price: 21,
      stock_Quantity: 3,
      QuantityOrdered: 1,
    },
    {
      id: 12,
      category: "Honey",
      title: "peanuts",
      img: "../assets/images/products/honey_2.jpg",
      price: 37,
      stock_Quantity: 4,
      QuantityOrdered: 1,
    },

    {
      id: 13,
      category: "Honey",
      title: "habat al Baraka",
      img: "../assets/images/products/honey_3.jpg",
      price: 27,
      stock_Quantity: 3,
      QuantityOrdered: 1,
    },

    {
      id: 14,
      category: "Honey",
      title: "Marjoram",
      img: "../assets/images/products/honey_4.jpg",
      price: 42,
      stock_Quantity: 4,
      QuantityOrdered: 1,
    },
    {
      id: 15,
      category: "Honey",
      title: "Rosemary",
      img: "../assets/images/products/honey_5.jpg",
      price: 35,
      stock_Quantity: 3,
      QuantityOrdered: 1,
    },
    {
      id: 21,
      category: "Herbs",
      title: "mint",
      img: "../assets/images/products/herbs_1.jpg",
      price: 4,
      stock_Quantity: 4,
      QuantityOrdered: 1,
    },
    {
      id: 22,
      category: "Herbs",
      title: "Anise",
      img: "../assets/images/products/herbs_2.jpg",
      price: 3,
      stock_Quantity: 3,
      QuantityOrdered: 1,
    },
    {
      id: 23,
      category: "Herbs",
      title: "Cloves",
      img: "../assets/images/products/herbs_3.jpg",
      price: 8,
      stock_Quantity: 4,
      QuantityOrdered: 1,
    },
    {
      id: 24,
      category: "Herbs",
      title: "Chamomile",
      img: "../assets/images/products/herbs_4.jpg",
      price: 13,
      stock_Quantity: 3,
      QuantityOrdered: 1,
    },
    {
      id: 25,
      category: "Herbs",
      title: "Ginger",
      img: "../assets/images/products/herbs_5.jpg",
      price: 10,
      stock_Quantity: 4,
      QuantityOrdered: 1,
    },
    {
      id: 31,
      category: "oil",
      title: "olive",
      img: "../assets/images/products/oil_4.jpg",
      price: 15,
      stock_Quantity: 3,
      QuantityOrdered: 1,
    },
    {
      id: 32,
      category: "oil",
      title: "Sweet Almond",
      img: "../assets/images/products/oil_5.jpg",
      price: 13,
      stock_Quantity: 4,
      QuantityOrdered: 1,
    },
    {
      id: 33,
      category: "oil",
      title: "lemon",
      img: "../assets/images/products/oil_2.jpg",
      price: 5,
      stock_Quantity: 3,
      QuantityOrdered: 1,
    },
    {
      id: 34,
      category: "oil",
      title: "Marjoram",
      img: "../assets/images/products/oil_3.jpg",
      price: 17,
      stock_Quantity: 4,
      QuantityOrdered: 1,
    },
    {
      id: 35,
      category: "oil",
      title: "Rosemary",
      img: "../assets/images/products/oil_1.jpg",
      price: 25,
      stock_Quantity: 3,
      QuantityOrdered: 1,
    },
  ];
  localStorage.setItem("products", JSON.stringify(products));
}
insertProductToLS();
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

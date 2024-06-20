// show username
let user_data = document.getElementById("user_data");
let user = document.getElementById("user");
let login = document.getElementById("login");
//logout
let logout = document.getElementById("logout");
logout.addEventListener("click", function () {
  setTimeout(() => {
    window.location = "register.html";
  }, 1000);
});

// count of cart

let count_cart = document.getElementById("count_cart");

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

let username = JSON.parse(localStorage.getItem("users"));

// console.log(username[0].username);
let email = username[0].email;
if (username) {
  login.remove();
  user_data.style.display = "flex";
  user.innerHTML = username[0].username;
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
let added_product = [];
function cart(id, element) {
  console.log(element);
  //check login
  if (username) {
    //find product
    let product_added = products.find((element) => element.id === id); // to return object of product
    console.log(product_added);
    product_added = {
      ...product_added,
      userEmail: { ...product_added.userEmail, email },
    };

    added_product = [...added_product, product_added]; //create array of products in cart
    count_cart.style.display = "block"; // show count of cart
    count_cart.innerHTML = added_product.length;
    product_added.stock_Quantity -= 1; //update Stock if place order done

    localStorage.setItem("productsInCart", JSON.stringify(added_product));
    element.setAttribute("disabled", true);
  } else {
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
  window.location = "cart.html"; // to redirection to cart
}

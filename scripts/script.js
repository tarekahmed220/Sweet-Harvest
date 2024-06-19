// show username
let user_data = document.getElementById("user_data");
let user = document.getElementById("user");
let login = document.getElementById("login");

//logout
let logout = document.getElementById("logout");
logout.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = "register.html";
  }, 1000);
});

// count of cart

let count_cart = document.getElementById("count_cart");

// let Quantity_count = products.stock_Quantity
//  function count_cart(e){
//   e.preventDefault
//   count++;
//   count_cart.innerHTML = count;
// }

//Quantity
/* function addtocart(){
  if(username){
    console.log(id);
    let product_added = products.find((element) => element.id === id);
    
  }
} */

//Products
let productsContainer = document.querySelector(".product-content");
let products = [
  {
    id: 11,
    category: "Honey",
    title: "clover",
    img: "../assets/images/products/honey_1.jpg",
    price: 21,
    stock_Quantity: 22,
  },
  {
    id: 12,
    category: "Honey",
    title: "peanuts",
    img: "../assets/images/products/honey_2.jpg",
    price: 37,
    stock_Quantity: 12,
  },

  {
    id: 13,
    category: "Honey",
    title: "habat al Baraka",
    img: "../assets/images/products/honey_3.jpg",
    price: 27,
    stock_Quantity: 24,
  },

  {
    id: 14,
    category: "Honey",
    title: "Marjoram",
    img: "../assets/images/products/honey_4.jpg",
    price: 42,
    stock_Quantity: 26,
  },
  {
    id: 15,
    category: "Honey",
    title: "Rosemary",
    img: "../assets/images/products/honey_5.jpg",
    price: 35,
    stock_Quantity: 24,
  },
  {
    id: 21,
    category: "Herbs",
    title: "mint",
    img: "../assets/images/products/herbs_1.jpg",
    price: 4,
    stock_Quantity: 23,
  },
  {
    id: 22,
    category: "Herbs",
    title: "Anise",
    img: "../assets/images/products/herbs_2.jpg",
    price: 3,
    stock_Quantity: 32,
  },
  {
    id: 23,
    category: "Herbs",
    title: "Cloves",
    img: "../assets/images/products/herbs_3.jpg",
    price: 8,
    stock_Quantity: 55,
  },
  {
    id: 24,
    category: "Herbs",
    title: "Chamomile",
    img: "../assets/images/products/herbs_4.jpg",
    price: 13,
    stock_Quantity: 42,
  },
  {
    id: 25,
    category: "Herbs",
    title: "Ginger",
    img: "../assets/images/products/herbs_5.jpg",
    price: 10,
    stock_Quantity: 46,
  },
  {
    id: 31,
    category: "oil",
    title: "olive",
    img: "../assets/images/products/oil_4.jpg",
    price: 15,
    stock_Quantity: 38,
  },
  {
    id: 32,
    category: "oil",
    title: "Sweet Almond",
    img: "../assets/images/products/oil_5.jpg",
    price: 13,
    stock_Quantity: 5,
  },
  {
    id: 33,
    category: "oil",
    title: "lemon",
    img: "../assets/images/products/oil_2.jpg",
    price: 5,
    stock_Quantity: 6,
  },
  {
    id: 34,
    category: "oil",
    title: "Marjoram",
    img: "../assets/images/products/oil_3.jpg",
    price: 17,
    stock_Quantity: 14,
  },
  {
    id: 35,
    category: "oil",
    title: "Rosemary",
    img: "../assets/images/products/oil_1.jpg",
    price: 25,
    stock_Quantity: 31,
  },
];

localStorage.setItem("products", JSON.stringify(products));

function draw() {
  let productsUI = products
    .map((product) => {
      return `
          <div class="product_item ${product.category}">
            <img src="${product.img}" alt="product">
            <div class="product-layer">
              <h4>${product.category}</h4>
              <p>${product.title}</p>
              <p>${product.price} <span>$</span></p>
              <p>InStock:<span>${product.stock_Quantity}</span></p>
              <a href="#"><i class="fa-solid fa-cart-plus" onclick = "cart(${product.id})"></i></a>
              
              <a href="#"><i class="fa-solid fa-heart-circle-plus" onclick="wishlist(${product.id})"></i></a>
            </div>
          </div>
          `;
    })
    .join(""); //to avoid show backticks
  productsContainer.innerHTML = productsUI;
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

console.log(username[0].username);
let email = username[0].email;
if (username) {
  login.remove();
  user_data.style.display = "flex";
  user.innerHTML = username[0].username;
}

//filter
let switcherlist = document.querySelectorAll(".switcher li");
let product_filter = document.querySelectorAll(".product_item"); // after fetch data
console.log(product_filter);
console.log(switcherlist);

switcherlist.forEach(function (li) {
  //function before addevenlistener mustbe anonymous function
  console.log(li);
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
function cart(id) {
  console.log("click on add to cart");
  //check login
  if (username) {
    console.log(id);
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
    console.log("Quantity in Stock: " + product_added.stock_Quantity);
    console.log(added_product);
    localStorage.setItem("productsInCart", JSON.stringify(added_product));
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

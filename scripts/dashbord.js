function showSection(sectionId) {
  var sections = document.querySelectorAll(".content-section");
  sections.forEach(function (section) {
    section.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "block";
}

var orders = [];
for (var i = 0; i < 11; i++) {
  var orderTest = {
    orderId: i,
    productTitle: "Honey moon" + " " + (i + 1),
    userEmain: "user@example.com",
    price: "10",
    quantity: i,
  };
  orders.push(orderTest);
  localStorage.setItem("orders", `${JSON.stringify(orders)}`);
}

document.addEventListener("DOMContentLoaded", function () {
  showSection("products");
});

// orders handle =================================================================
var ordersList = JSON.parse(localStorage.getItem("checkout")) || [];
var ordersFromCheckout = ordersList.filter((order) => {
  return order.title;
});
var orderCostFromCheckout = ordersList.filter((order) => {
  return !order.title;
})[0].endCost;
console.log(orderCostFromCheckout);
console.log(ordersFromCheckout);
var tbody = document.getElementById("tbody");
var userEmail = localStorage.getItem("user");
ordersList.map((order) => {
  if (order.id) {
    tbody.innerHTML += `
        <tr>
                  <td>${order.id}</td>
                  <td>${order.title}</td>
                 
                  <td>$${order.price}</td>
                  <td>${order.stock_Quantity}</td>
                 
          </tr>
          <tr>
           <td class="action-buttons" colspan="2">
                    <button class="accept-btn" onclick="acceptOrder(this)" >
                      <i class="fas fa-check"></i>
                    </button>
            </td>
            <td  class="action-buttons" colspan="2">
                    <button onclick="rejectOrder(this)" class="reject-btn">
                      <i class="fas fa-times"></i>
                    </button>
            </td>
          </tr>
    
    `;
  }
});
// for (var i = 0; i < ordersList.length; i++) {
//   console.log(ordersList[i]);

//   var orderContainer = ``;
//   orderContainer += `
//     <tr>
//                   <td>${ordersList[i].id}</td>
//                   <td>${ordersList[i].title}</td>

//                   <td>$${ordersList[i].price}</td>
//                   <td>${ordersList[i].stock_Quantity}</td>
//                   <td class="action-buttons">
//                     <button class="accept-btn" onclick="acceptOrder(this)" >
//                       <i class="fas fa-check"></i>
//                     </button>
//                     <button onclick="rejectOrder(this)" class="reject-btn">
//                       <i class="fas fa-times"></i>
//                     </button>
//                   </td>
//                 </tr>
//   `;

//   var tbody = (document.getElementById("tbody").innerHTML += orderContainer);
// }

// todo : remove order form local storage
function acceptOrder(ele) {
  var orderStatus = localStorage.getItem("orderStatus");
  orderStatus = "accepted";
  localStorage.setItem("orderStatus", orderStatus);
  var targetOrder = ele.closest("tr");
  targetOrder.remove();
}
function rejectOrder(ele) {
  var orderStatus = localStorage.getItem("orderStatus");
  orderStatus = "declined";
  localStorage.setItem("orderStatus", orderStatus);
  var targetOrder = ele.closest("tr");
  targetOrder.remove();
}

// products handling =================================================================

var product_list = document.querySelector(".product-list");
var productsQNY = document.querySelector("#productsQNY span");

//Products

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
var showDefaultProducts = false;
if (showDefaultProducts) {
  insertProductToLS();
}

var products = JSON.parse(localStorage.getItem("products")) || [];
productsQNY.textContent = products.length;
function displayProducts() {
  product_list.innerHTML = "";
  products.map((product, index) => {
    var productContainer = ``;
    productContainer += `
      <div class="product-item">
                <img
                  src="${product.img}"
                  alt="Product Image"
                  class="product-image"
                />
                <div class="product-info">
                  <h2>${product.title}</h2>
                  <p><strong>Product ID:</strong> ${product.id}</p>
                  <p><strong>Price:</strong><span class="targetPrice"> $${product.price}</span></p>
                  <p><strong>Quantity:</strong><span class="targetQNT"> ${product.stock_Quantity}</span></p>
                  <p><strong>Category:</strong> ${product.category}</p>
                </div>
                <div class="update">
                <input placeholder="Enter new price"/>
                <input placeholder="Enter new Quantity"/>
                <button class="updateInfo">Update Info</button>
                </div>
                <div class="product-actions">
                  <button class="update-btn" onclick="updateProduct(this,${product.id})">Update</button>
                  <button class="delete-btn" onclick="deleteproduct(this,${product.id})">Delete</button>
                </div>
              </div>
              `;
    product_list.innerHTML += productContainer;
    productsQNY.textContent = products.length;
  });
}
displayProducts();

function deleteproduct(ele, index) {
  var products = JSON.parse(localStorage.getItem("products"));

  var targetIndex = products.findIndex((product) => product.id === index);

  if (targetIndex !== -1) {
    products.splice(targetIndex, 1);
    localStorage.setItem("products", JSON.stringify(products));
    ele.closest(".product-item").remove();
    productsQNY.textContent = products.length;
  } else {
    console.error("there is no product match with this index");
  }
}
function resetProducts() {
  insertProductToLS();
  displayProducts();
}

function updateProduct(ele, index) {
  var element = ele.closest(".product-item").querySelector(".update");
  element.style.display = "flex";

  var elementBtn = ele
    .closest(".product-item")
    .querySelector(".update .updateInfo");

  elementBtn.addEventListener("click", function () {
    var newPrice = Number(
      element.querySelector("input[placeholder='Enter new price']").value
    );
    var newQuantity = Number(
      element.querySelector("input[placeholder='Enter new Quantity']").value
    );

    if (!newPrice || !newQuantity) {
      alert("Please enter both new price and new quantity.");
      return;
    }
    if (typeof newPrice == "string" || typeof newQuantity == "string") {
      alert("No, invalid input type");
      return;
    }
    console.log(typeof newPrice);

    var products = JSON.parse(localStorage.getItem("products"));
    var targetIndex = products.findIndex((product) => product.id === index);

    if (targetIndex !== -1) {
      products[targetIndex].price = parseFloat(newPrice);
      products[targetIndex].stock_Quantity = parseInt(newQuantity);

      localStorage.setItem("products", JSON.stringify(products));
      element.style.display = "none";

      ele
        .closest(".product-item")
        .querySelector(
          ".product-info .targetPrice"
        ).textContent = ` $${newPrice}`;
      ele
        .closest(".product-item")
        .querySelector(
          ".product-info .targetQNT"
        ).textContent = ` ${newQuantity}`;

      productsQNY.textContent = products.length;
      displayProducts();
    } else {
      console.error("No product found with this ID.");
    }
  });
}

var showAddForm = document.querySelector(".new-product-form");
function showNewProductForm() {
  showAddForm.style.display = "block";
}
document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const newProduct = {
      id: parseInt(document.getElementById("product-id").value),
      img: "../assets/images/products/honey_1.jpg", // Default image path or you can add a field to upload an image
      title: document.getElementById("product-title").value,
      price: document.getElementById("product-price").value,
      stock_Quantity: parseInt(
        document.getElementById("product-quantity").value
      ),
      category: document.getElementById("product-category").value,
    };

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    document.getElementById("product-form").reset();
    showAddForm.style.display = "none";
    displayProducts();
  });
// useres =================================================================
var userList = JSON.parse(localStorage.getItem("fullUsersData")) || [];
for (var i = 0; i <= userList.length; i++) {
  var userContainer = ``;
  userContainer += `
    <tr>
     
    <td>${userList[i].firstName + " " + userList[i].lastName}</td>
    <td>${userList[i].email}</td>
    <td>${userList[i].age}</td>
    <td>${userList[i].joinedDate}</td>
    <td><button class="deleteUser" onclick="deleteUser(${
      userList[i].id
    },this)">Delete</button></td>
      
      </tr>
  `;

  document.getElementById("user").innerHTML += userContainer;
}

function deleteUser(id, ele) {
  userList = userList.filter((user) => user.id !== id);
  localStorage.setItem("fullUsersData", JSON.stringify(userList));
  ele.closest("tr").remove();
}

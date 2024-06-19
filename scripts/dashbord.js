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
var ordersList = JSON.parse(localStorage.getItem("orders")) || [];
for (var i = 0; i < ordersList.length; i++) {
  var orderContainer = ``;
  orderContainer += `
    <tr>
                  <td>${ordersList[i].orderId}</td>
                  <td>${ordersList[i].productTitle}</td>
                  <td>${ordersList[i].userEmain}</td>
                  <td>$${ordersList[i].price}</td>
                  <td>${ordersList[i].quantity}</td>
                  <td class="action-buttons">
                    <button class="accept-btn" onclick="acceptOrder(this)" >
                      <i class="fas fa-check"></i>
                    </button>
                    <button onclick="rejectOrder(this)" class="reject-btn">
                      <i class="fas fa-times"></i>
                    </button>
                  </td>
                </tr>
  `;

  var tbody = (document.getElementById("tbody").innerHTML += orderContainer);
}

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

function displayProducts() {
  var products = JSON.parse(localStorage.getItem("products")) || [];
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
                  <p><strong>Order ID:</strong> ${product.id}</p>
                  <p><strong>Price:</strong> $${product.price}</p>
                  <p><strong>Quantity:</strong> ${product.stock_Quantity}</p>
                  <p><strong>Category:</strong> ${product.category}</p>
                </div>
                <div class="product-actions">
                  <button class="update-btn">Update</button>
                  <button class="delete-btn" onclick="deleteproduct(${index})">Delete</button>
                </div>
              </div>
              `;
    product_list.innerHTML += productContainer;
    productsQNY.textContent = products.length;
  });
}
displayProducts();

function deleteproduct(index) {
  var products = JSON.parse(localStorage.getItem("products"));
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
}

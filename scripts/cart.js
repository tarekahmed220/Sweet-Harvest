// fetch from cart

var productsFromStorage = JSON.parse(localStorage.getItem("productsInCart"));

//total
var total = 0;
const sumPrice = document.querySelectorAll(".cart-item-price");
sumPrice.forEach((element) => {
  // console.log(element.lastChild.data.substring(1));
  total += Number(element.lastChild.data.substring(1));
  // console.log(total)
  return total;
});
document.getElementById("total").innerHTML = `$${total}`;
document.getElementById("endCost").innerHTML = `$${total}`;

//draw

function draw() {
  let productsUI = productsFromStorage
    .map((product) => {
      return `
          <div class="cart-item" id="${product.id}">
            <div class="product-details">
              <div class="cart-item-image">
                <img src="${product.img}" alt="${product.title}" />
              </div>
              <div class="item-info">
                <div class="cart-item-title">${product.title}</div>
                <div class="cart-item-category">${product.category}</div>
                <div class="cart-item-delete" onclick="removeItem(this,${product.id})">
                  remove
                </div>
              </div>
            </div>
            <div class="cart-item-quantity">
              <button class="minus" onclick="minusQuantity(this)">-</button>
              <div class="cart-item-quantity-input">
                <input class="cart-item-input" type="text" value="1" readonly />
              </div>
              <button class="plus" onclick="addQuantity(this)">+</button>
            </div>

            <div class="cart-item-price">$${product.price}</div>

            <div class="cart-item-total">$${product.price}</div>
          </div>
          `;
    })
    .join(""); //to avoid show backticks
  document.querySelector(".product-content").innerHTML = productsUI;
}
draw();
var inputElement;
function addQuantity(ele) {
  inputElement = ele.previousElementSibling.querySelector(".cart-item-input");
  var quantity = parseInt(inputElement.value);
  var cartDiv = ele.closest(".cart-item");
  var currentPrice = cartDiv.querySelector(".cart-item-price");
  var totalPrice = cartDiv.querySelector(".cart-item-total");

  if (quantity >= 1) {
    quantity++;
    inputElement.value = quantity;
    totalPrice.textContent = `$${
      parseFloat(currentPrice.textContent.substring(1)) * quantity
    }`;
  }
  calcTotal();
  TotalCost();
}

function minusQuantity(ele) {
  inputElement = ele.nextElementSibling.querySelector(".cart-item-input");
  var quantity = parseInt(inputElement.value);
  var cartDiv = ele.closest(".cart-item");
  var currentPrice = cartDiv.querySelector(".cart-item-price");
  var totalPrice = cartDiv.querySelector(".cart-item-total");
  if (quantity > 1) {
    quantity--;
    inputElement.value = quantity;
    var newTotalPrice =
      parseFloat(currentPrice.textContent.substring(1)) * quantity;
    totalPrice.textContent = `$${newTotalPrice}`;
  }
  calcTotal();
  TotalCost();
}
function updateQuantity() {
  var xItems = document.querySelector("#orderNumbers");
  var xitems2 = document.querySelector("#numitem");
  var numberOfOrders = document.querySelectorAll(".cart-item");
  xItems.textContent = `${numberOfOrders.length} items`;
  xitems2.textContent = `ITEMS ${numberOfOrders.length}`;
}
updateQuantity();

function removeItem(el, index) {
  var targetItem = el.closest(".cart-item");
  targetItem.remove();
  // FIXME:
  let targetIndex = productsFromStorage.findIndex(
    (product) => product.id === index
  );
  productsFromStorage.splice(targetIndex, 1);
  localStorage.setItem("productsInCart", JSON.stringify(productsFromStorage));
  updateQuantity();
  calcTotal();
  TotalCost();
}

var total;
var deliveryCost = 0;
function calcTotal() {
  total = 0;
  var cartItems = document.querySelectorAll(".cart-item");

  cartItems.forEach(function (item) {
    var priceProduct = parseFloat(
      item.querySelector(".cart-item-total").textContent.substring(1)
    );

    // var quantity = parseInt(item.querySelector(".cart-item-input").value);
    total += priceProduct;
  });
  document.querySelector("#total").textContent = `$${total}`;
}
calcTotal();

// get Delivery Cost
function getDeliveryCost() {
  deliveryCost = Number(document.querySelector("#sippmethod").value);
}
getDeliveryCost();

// play all functions
function playAllFunctions() {
  getDeliveryCost();
  TotalCost();
}
var discount = 0;
var totalCost = parseFloat(
  document.querySelector("#total").textContent.substring(1)
);

document
  .querySelector(".promoCode button")
  .addEventListener("click", function handlePromoCode() {
    var promocodeBtn = document.querySelector(".promoCode button");
    var codeVerify = document.querySelector(".applied");
    span1 = codeVerify.querySelector("span.fistSpan");
    icon = codeVerify.querySelector("span.secondIcon");

    var promoInput = document.querySelector(".promoCode input");
    var promoInputValue = promoInput.value;

    codeVerify.setAttribute("data-apear", "false");

    if (promoInputValue == "eagles") {
      codeVerify.setAttribute("data-isApplied", "right");
      codeVerify.setAttribute("data-apear", "true");

      span1.textContent = "applied";
      icon.innerHTML = ` <i class="fa-solid fa-circle-check"></i>`;
      discount = totalCost <= 5 ? totalCost : 10;

      promocodeBtn.disabled = true;
      promoInput.setAttribute("readonly", "true");
    } else {
      codeVerify.setAttribute("data-isApplied", "wrong");
      codeVerify.setAttribute("data-apear", "true");

      span1.textContent = "not valid";
      icon.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
      discount = 0;
      // promocodeBtn.disabled = true;
    }
    TotalCost();
    promoInput.value = "";
  });
var endCost;
//Total Cost

function TotalCost() {
  var totalCostElement = document.querySelector("#endCost");
  var totalCost = parseFloat(
    document.querySelector("#total").textContent.substring(1)
  );

  endCost = totalCost <= 0 ? 0 : totalCost + Number(deliveryCost) - discount;
  totalCostElement.textContent = `$${endCost} `;
}
TotalCost();

function goToShopping() {
  window.location.href = "home.html";
}

//checkout
function checkout() {
  console.log(productsFromStorage);
  var checkout = [...productsFromStorage];
  localStorage.setItem("checkout", JSON.stringify(checkout));
  window.location.href = "orderStatus.html";
  localStorage.setItem("orderStatus", "pending");
}

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
    .map((product, idex) => {
      return `
          <div class="cart-item" id="${product.id}">
            <div class="product-details">
              <div class="cart-item-image">
                <img src="${product.img}" alt="${product.title}" />
              </div>
              <div class="item-info">
                <div class="cart-item-title">${product.title}</div>
                <div class="cart-item-category">${product.category}</div>
                <div class="cart-item-delete" onclick="removeItem(this,${product.id},${product.QuantityOrdered})">
                  remove
                </div>
              </div>
            </div>
            <div class="cart-item-quantity">
              <button class="minus" onclick="minusQuantity(this,${product.id})">-</button>
              <div class="cart-item-quantity-input">
                <input class="cart-item-input" type="text" value="1" readonly />
              </div>
              <button class="plus" onclick="addQuantity(this,${idex},${product.id},${product.QuantityOrdered})">+</button>
            </div>
            

            <div class="cart-item-price">$${product.price}</div>

            <div class="cart-item-total">$${product.price}</div>
              <div class="validContainer"> 
          <i class="fa-solid fa-triangle-exclamation"></i>
          <div class="validationmsg">There is not enough quantity</div>
          </div>
          </div>
        
          `;
    })
    .join(""); //to avoid show backticks
  document.querySelector(".product-content").innerHTML = productsUI;
}
draw();
var inputElement;
// var validContainer = document.querySelector(".validContainer");
function addQuantity(ele, index, productId, QuantityOrdered) {
  var products = JSON.parse(localStorage.getItem("products"));

  var targetProductInCart = productsFromStorage.find(
    (product) => product.id === productId
  );
  var targetProductIndexIncart = productsFromStorage.findIndex(
    (product) => product.id === productId
  );
  var QuantityOrderedFromCart = targetProductInCart.QuantityOrdered;

  var targetProductInProduct = products.find(
    (product) => product.id === productId
  );
  var targetProductIndex = products.findIndex(
    (product) => product.id === productId
  );
  var currentStock = targetProductInProduct.stock_Quantity;

  var stock_Quantity = productsFromStorage[index].stock_Quantity;
  inputElement = ele.previousElementSibling.querySelector(".cart-item-input");
  var quantity = parseInt(inputElement.value);

  var cartDiv = ele.closest(".cart-item");
  var minusBtn = cartDiv.querySelector(".minus");
  var validContainer = cartDiv.querySelector(".validContainer");
  var currentPrice = cartDiv.querySelector(".cart-item-price");
  var totalPrice = cartDiv.querySelector(".cart-item-total");

  if (quantity <= stock_Quantity) {
    quantity++;
    targetProductInCart.QuantityOrdered = QuantityOrderedFromCart + 1;
    productsFromStorage.splice(
      targetProductIndexIncart,
      1,
      targetProductInCart
    );
    localStorage.setItem("productsInCart", JSON.stringify(productsFromStorage));
    // update stock quantity in the target product
    var updateStock = currentStock - 1;
    inputElement.value = quantity;
    // console.log(quantity);
    // console.log(currentStock);
    // console.log(updateStock);
    targetProductInProduct.stock_Quantity = updateStock;
    products.splice(targetProductIndex, 1, targetProductInProduct);
    localStorage.setItem("products", JSON.stringify(products));

    minusBtn.removeAttribute("disabled");

    totalPrice.textContent = `$${
      parseFloat(currentPrice.textContent.substring(1)) * quantity
    }`;
  } else {
    validContainer.style.display = "flex";
    ele.setAttribute("disabled", "true");
  }
  calcTotal();
  TotalCost();
}

function minusQuantity(ele, productId) {
  var targetProductInCart = productsFromStorage.find(
    (product) => product.id === productId
  );
  var targetProductIndexIncart = productsFromStorage.findIndex(
    (product) => product.id === productId
  );
  var QuantityOrderedFromCart = targetProductInCart.QuantityOrdered;

  var products = JSON.parse(localStorage.getItem("products"));
  var targetProductInProduct = products.find(
    (product) => product.id === productId
  );
  var targetProductIndex = products.findIndex(
    (product) => product.id === productId
  );
  var currentStock = targetProductInProduct.stock_Quantity;

  inputElement = ele.nextElementSibling.querySelector(".cart-item-input");
  var quantity = parseInt(inputElement.value);

  var cartDiv = ele.closest(".cart-item");
  var plusBtn = cartDiv.querySelector(".plus");
  var validContainer = cartDiv.querySelector(".validContainer");
  var currentPrice = cartDiv.querySelector(".cart-item-price");
  var totalPrice = cartDiv.querySelector(".cart-item-total");
  if (quantity > 1) {
    quantity--;
    inputElement.value = quantity;
    targetProductInCart.QuantityOrdered = QuantityOrderedFromCart - 1;
    productsFromStorage.splice(
      targetProductIndexIncart,
      1,
      targetProductInCart
    );
    localStorage.setItem("productsInCart", JSON.stringify(productsFromStorage));

    // update stock quantity in the target product
    var updateStock = currentStock + 1;
    console.log(quantity);
    console.log(currentStock);
    console.log(updateStock);
    targetProductInProduct.stock_Quantity = updateStock;
    products.splice(targetProductIndex, 1, targetProductInProduct);
    localStorage.setItem("products", JSON.stringify(products));

    var newTotalPrice =
      parseFloat(currentPrice.textContent.substring(1)) * quantity;
    totalPrice.textContent = `$${newTotalPrice}`;
    validContainer.style.display = "none";
    plusBtn.removeAttribute("disabled");
  } else if ((quantity = 1)) {
    inputElement.value = 1;
  } else {
    ele.setAttribute("disabled", "true");
  }
  calcTotal();
  TotalCost();
}
function resetOrderedQuantity() {
  var newProductInCart = productsFromStorage.map((product) => {
    product.QuantityOrdered = 1;
    return product;
  });
  localStorage.setItem("productsInCart", JSON.stringify(newProductInCart));
}
resetOrderedQuantity();

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
  var checkout = [...productsFromStorage, { endCost: endCost }];
  console.log(checkout);
  localStorage.setItem("checkout", JSON.stringify(checkout));
  window.location.href = "orderStatus.html";
  localStorage.setItem("orderStatus", "accepted");
}

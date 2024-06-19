// fetch from cart

let productsFromStorage = localStorage.getItem("productsInCart");
console.log(productsFromStorage);
if(productsFromStorage){
  productsFromStorage = JSON.parse(productsFromStorage);
  
  draw(productsFromStorage);
}



//total
var total = 0;
const sumPrice = document.querySelectorAll(".cart-item-price")
sumPrice.forEach((element)=>{console.log(element.lastChild.data.substring(1))
 total += Number(element.lastChild.data.substring(1))
console.log(total)
return total})
document.getElementById('total').innerHTML = `$${total}`;
document.getElementById('endCost').innerHTML = `$${total}`;




//draw

function draw(productsFromStorage){
  console.log(productsFromStorage)
  let productsUI = productsFromStorage.map((product)=>{
    return `
          <div class="cart-item" id="${product.id}">
            <div class="product-details">
              <div class="cart-item-image">
                <img src="${product.img}" alt="${product.title}" />
              </div>
              <div class="item-info">
                <div class="cart-item-title">${product.title}</div>
                <div class="cart-item-category">${product.category}</div>
                <div class="cart-item-delete" onclick="removeItem(this)">
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
    }).join("")//to avoid show backticks 
    document.querySelector('.product-content').innerHTML = productsUI;
}
draw();
 



function addQuantity(ele) {
  var inputElement =
    ele.previousElementSibling.querySelector(".cart-item-input");
  var quantity = parseInt(inputElement.value);
  var cartDiv = ele.closest(".cart-item");
  var currentPrice = cartDiv.querySelector(".cart-item-price");
  var totalPrice = cartDiv.querySelector(".cart-item-total");

  if (quantity >= 1) {
    quantity++;
    inputElement.value = quantity;
    console.log(cartDiv)
    totalPrice.textContent = `$${parseFloat(currentPrice.textContent.substring(1)) * quantity}`;  
  }
  calcTotal();
  TotalCost();
}

function minusQuantity(ele) {
  var inputElement = ele.nextElementSibling.querySelector(".cart-item-input");
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

function removeItem(el) {
  var targetItem = el.closest(".cart-item");
  console.log(targetItem);
  targetItem.remove();
  updateQuantity();
  calcTotal();
  TotalCost();
}


var total;
var deliveryCost = 0;
function calcTotal() {
  total = 0;
  var cartItems = document.querySelectorAll(".cart-item");
  console.log(cartItems)
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
  
  deliveryCost = document.querySelector("#sippmethod").value;

  console.log(deliveryCost)
  return Number(deliveryCost);
}
getDeliveryCost();

// play all functions
function playAllFunctions() {
  getDeliveryCost();
  TotalCost();
}

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
      discount = 10;
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

var discount ;
var endCost;
//Total Cost
function TotalCost() {
  var totalCostElement = document.querySelector("#endCost");
  var totalCost = parseFloat(
    document.querySelector("#total").textContent.substring(1)
  );
  console.log(totalCost)
  
   endCost = totalCost == 0 ? 0 : totalCost + Number(deliveryCost);
   // totalCost == 0 ? 0 : totalCost + Number(deliveryCost) - discount;
  totalCostElement.textContent = `$${endCost} `;
  console.log(deliveryCost)
}
TotalCost();

function goToShopping() {
  window.location.href = "home.html";
}


//checkout
console.log(endCost)
function checkout(){
  var checkout = [...productsFromStorage,{"total price":endCost}]
  console.log(checkout);
  localStorage.setItem('checkout', JSON.stringify(checkout));
  
}
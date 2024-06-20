var orderCheck = localStorage.getItem("orderStatus");

var headerOfOrderStatus = document.getElementById("headerOfOrderStatus");

if (orderCheck == "accepted") {
  console.log("donee");
  document.body.innerHTML = `  <div class="status-container">
     
      <div class="approve-animation bounce">
        <i class="fa-solid fa-thumbs-up" id="correct"></i>
      </div>

    
      <h1 id="headerOfOrderStatus">🎉 Congrats, Your Orders Have been approved 🎉</h1>
      <p>
        Thank you for your order. Your order will be arrive within 24 hours.
      </p>
      <p class="order-id">Order ID: #123456789</p>
    </div>`;
} else if (orderCheck == "declined") {
  document.body.innerHTML = `  <div class="status-container">
     <div class="wrong-animation shake"></div> 
    
    <h1 id="headerOfOrderStatus">Sorry, Your Order Is Declined !</h1>
    <p>
      Thank you for your order. Please be patient and try again later ❤️
    </p>
    <p class="order-id">Order ID: #123456789</p>
  </div>`;
} else {
  document.body.innerHTML = `  <div class="status-container">
    <div class="spinner"></div> 
    <h1 id="headerOfOrderStatus">Your Orders is under review</h1>
    <p>
      Thank you for your order. Your order is currently being reviewed. Please
      wait a moment.
    </p>
    <p class="order-id">Order ID: #123456789</p>
  </div>`;
}

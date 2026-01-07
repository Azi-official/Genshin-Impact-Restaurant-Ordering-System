/* ===============================
   GLOBAL CART (STORED)
================================ */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ===============================
   FILTER MENU
================================ */
function filterItems(category){
  document.querySelectorAll('.menu-card').forEach(card=>{
    card.style.display =
      category === 'all' || card.classList.contains(category)
      ? 'block'
      : 'none';
  });
}

/* ===============================
   ADD ITEM TO CART
================================ */
function addItem(button){
  const card = button.closest(".menu-card");

  const name = card.dataset.name;
  const price = Number(card.dataset.price);

  let existing = cart.find(item => item.name === name);

  if(existing){
    existing.qty++;
  } else {
    cart.push({
      name: name,
      price: price,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

/* ===============================
   UPDATE CART DISPLAY (MENU)
================================ */
function updateCartUI(){
  let total = 0;
  let count = 0;

  cart.forEach(item=>{
    total += item.price * item.qty;
    count += item.qty;
  });

  const cartInfo = document.getElementById("cart-info");
  if(cartInfo){
    cartInfo.innerText = `${count} items | ₱${total}`;
  }
}

/* ===============================
   CHECKOUT
================================ */
function checkout(){
  localStorage.setItem("cart", JSON.stringify(cart));
  location.href = "review.html";
}

/* ===============================
   LOAD REVIEW PAGE
================================ */
function loadReview(){
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("reviewList");
  let total = 0;

  container.innerHTML = "";

  cart.forEach((item,index)=>{
    total += item.price * item.qty;

    container.innerHTML += `
      <div class="review-item">
        <span>${item.name}</span>

        <div class="qty-controls">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <span>₱${item.price * item.qty}</span>
      </div>
    `;
  });

  document.getElementById("reviewTotal").innerText = `₱${total}`;
}

/* ===============================
   CHANGE QUANTITY
================================ */
function changeQty(index, change){
  cart[index].qty += change;

  if(cart[index].qty <= 0){
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadReview();
}

/* ===============================
   NAVIGATION
================================ */
function goToPayment(){
  location.href = "payment.html";
}

/* ===============================
   AUTO LOAD CART UI
================================ */
window.onload = () => {
  updateCartUI();
};
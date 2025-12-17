// ===== PRODUCTOS =====
const products = [
  {
    id: 1,
    name: "Laptop Gamer",
    price: 900,
    images: [
      "./images/products/laptop/1.webp",
      "./images/products/laptop/2.webp"
    ]
  }
];

// ===== ELEMENTOS DOM =====
const grid = document.getElementById("productsGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartPanel = document.getElementById("cart");
const checkoutModal = document.getElementById("checkoutModal");

let cart = [];

// ===== RENDER =====
function renderProducts() {
  if (!grid) {
    console.error("❌ productsGrid no existe en el HTML");
    return;
  }

  grid.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.images[0]}"
           alt="${p.name}"
           loading="lazy"
           onerror="this.src='./images/products/fallback.webp'">
      <img src="${p.images[1] || p.images[0]}"
           class="hover"
           alt="">
      <div class="body">
        <h4>${p.name}</h4>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Agregar</button>
      </div>
    </div>
  `).join("");
}

// ===== CARRITO =====
function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  cart.push(p);
  updateCart();
}

function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = cart.map(i => `
    <p>${i.name} - $${i.price}</p>
  `).join("");
  cartTotal.textContent = cart.reduce((s, i) => s + i.price, 0);
}

// ===== EVENTOS =====
document.getElementById("cartToggle").onclick = () => {
  cartPanel.classList.toggle("hidden");
};

document.getElementById("checkoutBtn").onclick = () => {
  checkoutModal.classList.remove("hidden");
};

document.getElementById("checkoutForm").onsubmit = e => {
  e.preventDefault();
  window.location.href = "https://buy.stripe.com/test_TU_LINK_AQUI";
};

// ===== INIT =====
renderProducts();
updateCart();


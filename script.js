// Vos photos de produits intégrées
const products = [
  {
    id: 1,
    name: "Ensemble Survêtement Nike NOCTA Bleu Ciel",
    category: "ensemble",
    price: 35000,
    rating: "5.0 ★ (24 avis)",
    description: "Ensemble veste zippée à capuche et pantalon assorti Nike NOCTA bleu ciel. Tissu molletonné ultra confort et coupe moderne.",
    image: "45ff8ce59d6a3ff97f220bec7836fc05.jpg"
  },
  {
    id: 2,
    name: "Pantalon Cargo Streetwear 3 Bandes",
    category: "pantalons",
    price: 18000,
    rating: "4.8 ★ (18 avis)",
    description: "Pantalon de survêtement style cargo oversized disponible en Gris et Noir. Finitions ajustables avec bandes latérales.",
    image: "54d5a5dd35b39425ce680533f3d1583d.jpg"
  },
  {
    id: 3,
    name: "Veste Hoodie Cagoule Streetwear Marine & Blanc",
    category: "vestes",
    price: 28000,
    rating: "4.9 ★ (31 avis)",
    description: "Veste bicolore zippée avec capuche intégrée style cagoule balaclava. Coupe oversize tendance et design futuriste.",
    image: "17f54f8ca90d6de060f02e606c4eec9c.jpg"
  },
  {
    id: 4,
    name: "Sweatshirt Brooklyn New York Oversize Noir",
    category: "sweats",
    price: 15000,
    rating: "4.7 ★ (12 avis)",
    description: "Sweat sans capuche col rond avec impression rétro 'Brooklyn New York'. Tissu épais doux et confortable.",
    image: "5f20a4ef2d732d4e4df62680cf042499.jpg"
  }
];

let cart = [];
let favorites = [];

// Éléments du DOM
const productGrid = document.getElementById('productGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const favCount = document.getElementById('favCount');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

// Affichage des produits
function displayProducts(items) {
  productGrid.innerHTML = items.map(product => {
    const isFav = favorites.includes(product.id);
    return `
      <div class="product-card">
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${product.name}" onclick="openProductModal(${product.id})">
          <div class="fav-icon ${isFav ? 'active' : ''}" onclick="toggleFavorite(${product.id})">
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
          </div>
        </div>
        <div class="product-info">
          <span class="category">${product.category}</span>
          <h3 onclick="openProductModal(${product.id})" style="cursor:pointer;">${product.name}</h3>
          <div class="rating">${product.rating}</div>
          <div class="price-row">
            <span class="price">${product.price.toLocaleString()} FCFA</span>
            <button class="btn-add-cart" onclick="addToCart(${product.id})">
              <i class="fa-solid fa-plus"></i> Ajouter
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Favoris
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
  } else {
    favorites.push(id);
  }
  favCount.textContent = favorites.length;
  displayProducts(products);
}

// Ajouter au Panier
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1, size: 'M' });
  }

  updateCart();
  openCart();
}

// Mise à jour du panier UI
function updateCart() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details" style="flex:1;">
        <h4>${item.name}</h4>
        <p>${item.price.toLocaleString()} FCFA (x${item.quantity})</p>
      </div>
      <button onclick="removeFromCart(${item.id})" style="border:none; background:none; color:#ef4444; cursor:pointer;">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = `${total.toLocaleString()} FCFA`;
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Panier Sidebar
function openCart() {
  cartSidebar.classList.add('active');
  overlay.classList.add('active');
}

function closeCart() {
  cartSidebar.classList.remove('active');
  overlay.classList.remove('active');
}

cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

// Fiche Produit Modal
function openProductModal(id) {
  const p = products.find(item => item.id === id);
  const modal = document.getElementById('productModal');
  const modalBody = document.getElementById('modalBody');

  modalBody.innerHTML = `
    <div>
      <img src="${p.image}" alt="${p.name}">
    </div>
    <div>
      <span class="category" style="color:var(--primary); font-weight:bold;">${p.category.toUpperCase()}</span>
      <h2>${p.name}</h2>
      <p style="color:#f59e0b; margin: 5px 0;">${p.rating}</p>
      <h3 style="color:var(--primary); font-size:1.5rem; margin:10px 0;">${p.price.toLocaleString()} FCFA</h3>
      <p style="color:#64748b; font-size:0.9rem; margin-bottom:15px;">${p.description}</p>
      
      <div class="size-selector" style="margin-bottom:15px;">
        <label><b>Taille :</b></label><br>
        <button>S</button><button style="background:var(--primary); color:white;">M</button><button>L</button><button>XL</button>
      </div>

      <button class="btn-primary" style="width:100%; border:none; cursor:pointer;" onclick="addToCart(${p.id}); closeModal();">
        Ajouter au panier
      </button>
    </div>
  `;

  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal() {
  document.getElementById('productModal').classList.remove('active');
  overlay.classList.remove('active');
}

document.getElementById('closeModal').addEventListener('click', closeModal);

// Espace Admin
function openAdminModal() {
  document.getElementById('adminModal').classList.add('active');
  overlay.classList.add('active');
}
function closeAdminModal() {
  document.getElementById('adminModal').classList.remove('active');
  overlay.classList.remove('active');
}

// Filtres et Recherche
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    const cat = btn.dataset.category;
    if (cat === 'all') displayProducts(products);
    else displayProducts(products.filter(p => p.category === cat));
  });
});

searchInput.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  displayProducts(products.filter(p => p.name.toLowerCase().includes(term)));
});

sortSelect.addEventListener('change', (e) => {
  let sorted = [...products];
  if (e.target.value === 'low-high') sorted.sort((a,b) => a.price - b.price);
  if (e.target.value === 'high-low') sorted.sort((a,b) => b.price - a.price);
  displayProducts(sorted);
});

// Checkout Simulation
function checkout() {
  if (cart.length === 0) return alert('Votre panier est vide.');
  const method = document.getElementById('paymentMethod').value;
  alert(`Merci pour votre commande chez DIFREIND !\nMode de règlement sélectionné : ${method.toUpperCase()}.\nUn SMS de confirmation vous a été envoyé.`);
  cart = [];
  updateCart();
  closeCart();
}

// Initialisation
displayProducts(products);
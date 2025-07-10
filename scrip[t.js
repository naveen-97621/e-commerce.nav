// Sample product data
const products = [
  {
    id: 1,
    name: "Monster Energy",
    price: 130,
    image: "Monster Energy Drink Zero Ultra 500ml.jpeg",
    category: "Energy Drinks",
    featured: true
  },
  {
    id: 2,
    name: "Red Bull",
    price: 110,
    image: "Red Bull Energy Drinks_ Vitalizes Body and Mind_® _ Red Bull.jpeg",
    category: "Energy Drinks",
    featured: true
  },
  {
    id: 3,
    name: "AdrenaX",
    price: 150,
    image: "ChatGPT Image Jul 10, 2025, 01_21_32 PM.png",
    category: "Energy Drinks",
    featured: true
  },
  {
    id: 4,
    name: "PowerFury",
    price: 165,
    image: "ChatGPT Image Jul 10, 2025, 01_24_54 PM.png",
    category: "Energy Drinks",
    featured: true
  },
  {
    id: 5,
    name: "ProFusion Whey",
    price: 3000,
    image: "Best Protein Powder of 2020_ What’s Best of ALL Proteins_.jpeg",
    category: "Supplements"
  },
  {
    id: 6,
    name: "IsoForge",
    price: 4000,
    image: "El mejor suero de proteínas WHEY - Elige la mejor del TOP 7.jpeg",
    category: "Supplements"
  },
  {
    id: 7,
    name: "MuscleTech",
    price: 4500,
    image: "download.jpeg",
    category: "Supplements"
  },
  {
    id: 8,
    name: "GNCCre",
    price: 800,
    image: "Pro Performance Creatine Monohydrate Unflavoured.jpeg",
    category: "Supplements"
  }
];

let cart = [];

// Display featured products on home page
function displayFeaturedProducts() {
  const featuredContainer = document.getElementById('featured-products');
  if (!featuredContainer) return;

  const featuredProducts = products.filter(product => product.featured);
  
  featuredContainer.innerHTML = '';
  
  featuredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">₹${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    featuredContainer.appendChild(productCard);
  });

  addCartEventListeners();
}

// Display all products on products page
function displayAllProducts() {
  const productContainer = document.getElementById('product-container');
  if (!productContainer) return;

  productContainer.innerHTML = '';
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">₹${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    productContainer.appendChild(productCard);
  });

  addCartEventListeners();
}

// Add to cart function
function addToCart(e) {
  const productId = parseInt(e.target.getAttribute('data-id'));
  const product = products.find(p => p.id === productId);
  
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({...product, quantity: 1});
  }
  
  updateCartCount();
}

// Update cart count
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll('#cart-count').forEach(element => {
    element.textContent = count;
  });
}

// Add event listeners to cart buttons
function addCartEventListeners() {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

// Initialize category filter
function initCategoryFilter() {
  const filter = document.getElementById('category-filter');
  if (!filter) return;

  filter.addEventListener('change', function() {
    const category = this.value;
    const productContainer = document.getElementById('product-container');
    
    productContainer.innerHTML = '';
    
    const filteredProducts = category === 'all' 
      ? products 
      : products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">₹${product.price.toFixed(2)}</p>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      `;
      productContainer.appendChild(productCard);
    });

    addCartEventListeners();
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  displayFeaturedProducts();
  displayAllProducts();
  initCategoryFilter();
});

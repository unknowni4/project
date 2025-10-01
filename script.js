const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value);

const products = [
  { id: 1, title: "Smartphone", category: "electronics", price: 24999, image: "Images/mobile.jpg", description: "Latest 5G smartphone with powerful features and long-lasting battery." },
  { id: 22, title: "Smartphone", category: "electronics", price: 35999, image: "Images/mobile_1.jpg", description: "Latest 5G smartphone with powerful Processor." },
  { id: 2, title: "Laptop", category: "electronics", price: 85999, image: "Images/laptop.jpg", description: "High-performance laptop perfect for work, gaming, and creative tasks." },
  { id: 3, title: "Smartwatch", category: "electronics", price: 2349, image: "Images/smartwatch.jpg", description: "Track your health and fitness with this stylish and feature-rich smartwatch." },
  { id: 4, title: "Headphones", category: "electronics", price: 1469, image: "Images/Headphone.jpg", description: "Premium wireless headphones with active noise cancellation technology." },
  { id: 5, title: "LED TV", category: "electronics", price: 35999, image: "Images/TV.jpg", description: "Ultra HD 50-inch LED TV with smart features and stunning picture quality." },
  { id: 24, title: "Smartwatch", category: "electronics", price: 1629, image: "Images/smartwatch_1.jpg", description: "stylish and Social Media Integration." },
  { id: 6, title: "Tablet", category: "electronics", price: 18999, image: "Images/tablet.jpg", description: "Portable tablet perfect for entertainment, productivity, and digital art." },
  { id: 7, title: "Bluetooth Speaker", category: "electronics", price: 1879, image: "Images/Speaker.jpg", description: "Compact wireless speaker with deep bass and crystal-clear sound quality." },
  { id: 8, title: "Camera", category: "electronics", price: 54999, image: "Images/camera.jpg", description: "Professional DSLR camera for stunning photography and videography." },
  { id: 9, title: "T-Shirt", category: "clothing", price: 379, image: "Images/shirt.jpg", description: "Comfortable premium cotton T-shirt available in multiple colors and sizes." },
  { id: 10, title: "Jeans", category: "clothing", price: 1299, image: "Images/jeans.jpg", description: "Trendy denim jeans with perfect fit and all-day comfort." },
  { id: 11, title: "Sneakers", category: "clothing", price: 2199, image: "Images/sneakers.jpg", description: "Comfortable and stylish sneakers perfect for casual wear and light exercise." },
  { id: 12, title: "Jacket", category: "clothing", price: 2999, image: "Images/jacket.jpg", description: "Warm and stylish winter jacket with modern design and premium materials." },
  { id: 13, title: "Formal Shirt", category: "clothing", price: 1399, image: "Images/formal_shirt.jpg", description: "Elegant formal shirt perfect for office wear and special occasions." },
  { id: 14, title: "Formal Shirt", category: "clothing", price: 789, image: "Images/formal_shirt_1.jpg", description: "Traditional elegant saree with beautiful silk finish and intricate designs." },
  { id: 15, title: "Shoes", category: "clothing", price: 649, image: "Images/shoes.jpg", description: "Comfortable cotton kurta perfect for festive occasions and casual wear." },
  { id: 16, title: "Mixer Grinder", category: "home", price: 2799, image: "Images/mixer_grinder.jpg", description: "Durable mixer grinder with multiple jars for all your kitchen needs." },
  { id: 17, title: "Coffee Maker", category: "home", price: 3199, image: "Images/coffee_maker.jpg", description: "Automatic coffee maker that brews fresh, delicious coffee instantly at home." },
  { id: 18, title: "Microwave Oven", category: "home", price: 8819, image: "Images/microwave_oven.jpg", description: "Compact microwave oven with auto cook menu and multiple power settings." },
  { id: 19, title: "washing Machine", category: "home", price: 48999, image: "Images/washing_machine.jpg", description: "Energy-efficient double door refrigerator with large capacity and smart features." },
  { id: 20, title: "Washing Machine", category: "home", price: 26329, image: "Images/washing_machine_1.jpg", description: "Fully automatic washing machine with multiple wash modes and energy efficiency." },
  { id: 21, title: "Vacuum Cleaner", category: "home", price: 7499, image: "Images/vacuum_cleaner.jpg", description: "High suction vacuum cleaner with HEPA filter for thorough cleaning." },
  { id: 23, title: "Novel Book", category: "books", price: 499, image: "Images/novel.jpg", description: "Bestselling novel with an engaging story that will keep you hooked till the end." },
  { id: 25, title: "Self-Help Book", category: "books", price: 699, image: "Images/self-help_book.jpg", description: "Motivational self-help book with practical tips to improve your life." },
  { id: 26, title: "Science Fiction", category: "books", price: 899, image: "Images/science_fiction.jpg", description: "Thrilling science fiction novel with futuristic adventure and amazing world-building." },
  { id: 27, title: "Children's Story", category: "books", price: 399, image: "Images/children.jpg", description: "Beautiful illustrated story book that will delight children and spark imagination." },
  { id: 28, title: "Biography", category: "books", price: 799, image: "Images/bio.jpg", description: "Inspiring biography of a famous personality with life lessons and achievements." },
  { id: 29, title: "History Book", category: "books", price: 2879, image: "Images/history.jpg", description: "Fascinating history book that explores important events and historical stories." }
];

let cart = [];
let filteredProducts = [...products];
let currentProduct = null;

document.addEventListener('DOMContentLoaded', function() {
  displayProducts(filteredProducts);
  setupEventListeners();
  updateCartCount();
  updatePriceValue();
});

function setupEventListeners() {
  const searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('input', handleSearch);

  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.addEventListener('change', handleCategoryFilter);

  const priceRange = document.getElementById('priceRange');
  priceRange.addEventListener('input', handlePriceFilter);

  const modal = document.getElementById('productModal');
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
      if (document.getElementById('cartSidebar').classList.contains('open')) {
        toggleCart();
      }
    }
  });
}

function displayProducts(productsToShow) {
  const productList = document.getElementById('productList');
  
  if (productsToShow.length === 0) {
    productList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 2rem;">No products found matching your criteria.</p>';
    return;
  }

  productList.innerHTML = productsToShow.map(product => `
    <div class="product fade-in" onclick="openModal(${product.id})">
      <img src="${product.image}" alt="${product.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300?text=Product+Image'">
      <h3>${product.title}</h3>
      <p>${formatPrice(product.price)}</p>
      <button onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join('');
}

function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  applyFilters();
}

function handleCategoryFilter(e) {
  applyFilters();
}

function handlePriceFilter(e) {
  const maxPrice = parseInt(e.target.value);
  updatePriceValue(maxPrice);
  applyFilters();
}

function applyFilters() {
  const searchTerm = document.getElementById('searchBar').value.toLowerCase();
  const selectedCategory = document.getElementById('categoryFilter').value;
  const maxPrice = parseInt(document.getElementById('priceRange').value);

  let filtered = [...products];

  if (searchTerm) {
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  if (selectedCategory !== 'all') {
    filtered = filtered.filter(product => product.category === selectedCategory);
  }

  filtered = filtered.filter(product => product.price <= maxPrice);

  displayProducts(filtered);
}

function updatePriceValue(value = null) {
  const priceValue = document.getElementById('priceValue');
  const currentValue = value || document.getElementById('priceRange').value;
  priceValue.textContent = formatPrice(currentValue).replace('₹', '').replace('.00', '');
}

function openModal(productId) {
  currentProduct = products.find(p => p.id === productId);
  if (!currentProduct) return;

  document.getElementById('modalImage').innerHTML = `<img src="${currentProduct.image}" alt="${currentProduct.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px;" onerror="this.src='https://via.placeholder.com/400x300?text=Product+Image'">`;
  document.getElementById('modalTitle').textContent = currentProduct.title;
  document.getElementById('modalDescription').textContent = currentProduct.description;
  document.getElementById('modalPrice').textContent = formatPrice(currentProduct.price);
  document.getElementById('productModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('productModal').style.display = 'none';
  currentProduct = null;
  document.body.style.overflow = 'auto';
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartCount();
  updateCartDisplay();
  showNotification(`${product.title} added to cart!`);
  
  if (currentProduct && currentProduct.id === productId) {
    closeModal();
  }
}

function removeFromCart(productId) {
  const product = cart.find(item => item.id === productId);
  cart = cart.filter(item => item.id !== productId);
  updateCartCount();
  updateCartDisplay();
  if (product) {
    showNotification(`${product.title} removed from cart!`);
  }
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    updateCartCount();
    updateCartDisplay();
  }
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = totalItems;
  
  const cartIcon = document.querySelector('.cart-icon');
  if (totalItems > 0) {
    cartIcon.style.animation = 'pulse 0.5s ease-in-out';
    setTimeout(() => {
      cartIcon.style.animation = '';
    }, 500);
  }
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Your cart is empty<br><small>Add some amazing products to get started!</small></div>';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <h4>${item.title}</h4>
          <p>${formatPrice(item.price)} × ${item.quantity} = ${formatPrice(item.price * item.quantity)}</p>
        </div>
        <div class="cart-controls">
          <button onclick="updateQuantity(${item.id}, -1)" title="Decrease quantity">-</button>
          <span class="quantity">${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, 1)" title="Increase quantity">+</button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove from cart">Remove</button>
        </div>
      </div>
    `).join('');
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = formatPrice(total);
}

function toggleCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  cartSidebar.classList.toggle('open');
  updateCartDisplay();
  
  if (cartSidebar.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const itemList = cart.map(item => `• ${item.title} (×${item.quantity})`).join('\n');
  
  const confirmPurchase = confirm(
    `Confirm your order:\n\n${itemList}\n\nTotal Items: ${itemCount}\nTotal Amount: ${formatPrice(total)}\n\nProceed to checkout?`
  );
  
  if (confirmPurchase) {
    alert(`🎉 Thank you for your purchase!\n\nOrder Summary:\nItems: ${itemCount}\nTotal: ${formatPrice(total)}\n\nThis is a demo - no actual payment processed.\nYour order will be delivered soon!`);
    
    cart = [];
    updateCartCount();
    updateCartDisplay();
    toggleCart();
    showNotification('Order placed successfully!');
  }
}

function showNotification(message) {
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #2ecc71, #27ae60);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    z-index: 1002;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
    animation: slideInNotification 0.3s ease-out;
    max-width: 300px;
    word-wrap: break-word;
  `;
  
  const style = document.createElement('style');
  if (!document.querySelector('#notification-styles')) {
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideInNotification {
        from { 
          transform: translateX(100%); 
          opacity: 0; 
        }
        to { 
          transform: translateX(0); 
          opacity: 1; 
        }
      }
      @keyframes slideOutNotification {
        from { 
          transform: translateX(0); 
          opacity: 1; 
        }
        to { 
          transform: translateX(100%); 
          opacity: 0; 
        }
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutNotification 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

window.addEventListener('resize', function() {
  const cartSidebar = document.getElementById('cartSidebar');
  if (window.innerWidth <= 768 && cartSidebar.classList.contains('open')) {
    cartSidebar.style.width = '100vw';
  }
});

document.addEventListener('click', function(e) {
  const cartSidebar = document.getElementById('cartSidebar');
  if (cartSidebar.classList.contains('open') && !cartSidebar.contains(e.target) && !e.target.closest('.cart-icon')) {
    if (window.innerWidth > 768) {
      toggleCart();
    }
  }
});

function clearCart() {
  if (cart.length === 0) {
    showNotification('Cart is already empty!');
    return;
  }
  
  const confirmClear = confirm('Are you sure you want to clear your cart?');
  if (confirmClear) {
    cart = [];
    updateCartCount();
    updateCartDisplay();
    showNotification('Cart cleared successfully!');
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

function observeProducts() {
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    product.style.opacity = '0';
    product.style.transform = 'translateY(20px)';
    product.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(product);
  });
}

const originalDisplayProducts = displayProducts;
displayProducts = function(productsToShow) {
  originalDisplayProducts(productsToShow);
  setTimeout(() => {
    observeProducts();
  }, 100);
};
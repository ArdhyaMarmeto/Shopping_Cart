// Initial dummy products
const products = [
    { id: 1, name: "Wireless Mouse", image: "images/wireless-mouse.jpg", price: 29.99 },
    { id: 2, name: "Keyboard", image: "images/keyboard.jpg", price: 49.99 },
    { id: 3, name: "Monitor", image: "images/monitor.jpg", price: 199.99 },
    { id: 4, name: "USB Flash Drive", image: "images/usb-flash-drive.jpg", price: 15.49 }
];

// Initial empty cart
let cart = [];

// Function to render products
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="100">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick='addToCart(${product.id})'>Add to Cart</button>
        `;
        productList.appendChild(li);
    });
}

// Function to render cart
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick='removeFromCart(${item.id})'>Remove from Cart</button>
        `;
        cartItems.appendChild(li);
    });

    document.getElementById('total-price').textContent = `$${calculateTotalPrice()}`;
    document.getElementById('average-price').textContent = `$${calculateAveragePrice()}`;
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

// Calculate Total Price
function calculateTotalPrice() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}

// Calculate Average Price
function calculateAveragePrice() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (totalItems === 0) return 0;
    return (calculateTotalPrice() / totalItems).toFixed(2);
}

// Apply Filter
function applyFilter() {
    const minPrice = parseFloat(document.getElementById('filter-price').value) || 0;
    const filteredProducts = products.filter(p => p.price >= minPrice);

    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    filteredProducts.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="100">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick='addToCart(${product.id})'>Add to Cart</button>
        `;
        productList.appendChild(li);
    });
}

// Sort Cart
function sortCart() {
    const order = document.getElementById('sort-order').value;
    const sortedCart = cart.slice().sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
    cart = sortedCart;
    renderCart();
}

// Clear Cart
function clearCart() {
    cart = [];
    renderCart();
}

// Initialize page
renderProducts();
renderCart();











































































// // Initial dummy products
// const products = [
//     { id: 1, name: "Wireless Mouse", image: "images/wireless-mouse.jpg", price: 29.99 },
//     { id: 2, name: "Keyboard", image: "images/keyboard.jpg", price: 49.99 },
//     { id: 3, name: "Monitor", image: "images/monitor.jpg", price: 199.99 },
//     { id: 4, name: "USB Flash Drive", image: "images/usb-flash-drive.jpg", price: 15.49 }
// ];

// // Initial empty cart
// let cart = [];

// // Function to render products
// function renderProducts() {
//     const productList = document.getElementById('product-list');
//     productList.innerHTML = '';

//     products.forEach(product => {
//         const li = document.createElement('li');
//         li.className = 'product-item';
//         li.innerHTML = `
//             <img src="${product.image}" alt="${product.name}" width="100">
//             <div class="product-info">
//                 <h3>${product.name}</h3>
//                 <p>Price: $${product.price.toFixed(2)}</p>
//                 <div class="product-details">
//                     <p>Size: <select id="size-${product.id}">
//                         <option value="">Select Size</option>
//                         <option value="s">S</option>
//                         <option value="m">M</option>
//                         <option value="l">L</option>
//                     </select></p>
//                     <p>Quantity: <input type="number" id="quantity-${product.id}" min="1" value="1"></p>
//                     <button onclick='addToCart(${product.id})'>Add to Cart</button>
//                     <p class="error-message" id="error-${product.id}"></p>
//                 </div>
//             </div>
//         `;
//         productList.appendChild(li);
//     });
// }

// // Function to render cart
// function renderCart() {
//     const cartItems = document.getElementById('cart-items');
//     cartItems.innerHTML = '';

//     cart.forEach(item => {
//         const li = document.createElement('li');
//         li.className = 'cart-item';
//         li.innerHTML = `
//             <img src="${item.image}" alt="${item.name}" width="50">
//             <div class="cart-info">
//                 <h3>${item.name}</h3>
//                 <p>Price: $${item.price.toFixed(2)}</p>
//                 <p>Quantity: ${item.quantity}</p>
//                 <button onclick='removeFromCart(${item.id})'>Remove from Cart</button>
//             </div>
//         `;
//         cartItems.appendChild(li);
//     });

//     document.getElementById('total-price').textContent = `$${calculateTotalPrice()}`;
//     document.getElementById('average-price').textContent = `$${calculateAveragePrice()}`;
// }

// // Add to Cart
// function addToCart(productId) {
//     const product = products.find(p => p.id === productId);
//     const size = document.getElementById(`size-${productId}`).value;
//     const quantity = parseInt(document.getElementById(`quantity-${productId}`).value) || 1;
//     const errorElement = document.getElementById(`error-${productId}`);

//     if (!size) {
//         errorElement.textContent = 'Please select a size.';
//         return;
//     } else if (quantity < 1) {
//         errorElement.textContent = 'Quantity must be at least 1.';
//         return;
//     } else {
//         errorElement.textContent = '';
//     }

//     const existingItem = cart.find(item => item.id === productId);

//     if (existingItem) {
//         existingItem.quantity += quantity;
//     } else {
//         cart.push({ ...product, quantity });
//     }

//     renderCart();
// }

// // Remove from Cart
// function removeFromCart(productId) {
//     cart = cart.filter(item => item.id !== productId);
//     renderCart();
// }

// // Calculate Total Price
// function calculateTotalPrice() {
//     return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
// }

// // Calculate Average Price
// function calculateAveragePrice() {
//     const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
//     if (totalItems === 0) return 0;
//     return (calculateTotalPrice() / totalItems).toFixed(2);
// }

// // Apply Filter
// function applyFilter() {
//     const minPrice = parseFloat(document.getElementById('filter-price').value) || 0;
//     const filteredProducts = products.filter(p => p.price >= minPrice);

//     const productList = document.getElementById('product-list');
//     productList.innerHTML = '';

//     filteredProducts.forEach(product => {
//         const li = document.createElement('li');
//         li.className = 'product-item';
//         li.innerHTML = `
//             <img src="${product.image}" alt="${product.name}" width="100">
//             <div class="product-info">
//                 <h3>${product.name}</h3>
//                 <p>Price: $${product.price.toFixed(2)}</p>
//                 <div class="product-details">
//                     <p>Size: <select id="size-${product.id}">
//                         <option value="">Select Size</option>
//                         <option value="s">S</option>
//                         <option value="m">M</option>
//                         <option value="l">L</option>
//                     </select></p>
//                     <p>Quantity: <input type="number" id="quantity-${product.id}" min="1" value="1"></p>
//                     <button onclick='addToCart(${product.id})'>Add to Cart</button>
//                     <p class="error-message" id="error-${product.id}"></p>
//                 </div>
//             </div>
//         `;
//         productList.appendChild(li);
//     });
// }

// // Sort Cart
// function sortCart() {
//     const order = document.getElementById('sort-order').value;
//     const sortedCart = cart.slice().sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
//     cart = sortedCart;
//     renderCart();
// }

// // Clear Cart
// function clearCart() {
//     cart = [];
//     renderCart();
// }

// // Initialize page
// renderProducts();
// renderCart();











// Initial dummy products
const products = [
    { id: 1, name: "Wireless Mouse", image: "images/wireless-mouse.jpg", price: 29.99 },
    { id: 2, name: "Keyboard", image: "images/keyboard.jpg", price: 49.99 },
    { id: 3, name: "Monitor", image: "images/monitor.jpg", price: 199.99 },
    { id: 4, name: "USB Flash Drive", image: "images/usb-flash-drive.jpg", price: 15.49 },
    { id: 5, name: "Webcam", image: "images/webcam.jpg", price: 59.99 },
    { id: 6, name: "Laptop Stand", image: "images/laptop-stand.jpg", price: 39.99 },
    { id: 7, name: "Headphones", image: "images/headphones.jpg", price: 89.99 },
    { id: 8, name: "Smartphone", image: "images/smartphone.jpg", price: 499.99 },
    { id: 9, name: "Tablet", image: "images/tablet.jpg", price: 299.99 },
    { id: 10, name: "External Hard Drive", image: "images/external-hard-drive.jpg", price: 79.99 },
    { id: 11, name: "Printer", image: "images/printer.jpg", price: 149.99 },
    { id: 12, name: "Router", image: "images/router.jpg", price: 99.99 }
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









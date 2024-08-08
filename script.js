

// Initial dummy products
const products = [
    { id: 1, name: "Wireless Mouse", image: "https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/7/y/7ya11pa.png", price: 29.99 },
    { id: 2, name: "Keyboard", image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MK2A3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1628010471000", price: 49.99 },
    { id: 3, name: "Monitor", image: "https://5.imimg.com/data5/SELLER/Default/2023/5/309805696/PR/NQ/KT/16384543/hd-computer-monitor-1000x1000.jpg", price: 199.99 },
    { id: 4, name: "USB Flash Drive", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/SanDisk-Cruzer-USB-4GB-ThumbDrive.jpg/1920px-SanDisk-Cruzer-USB-4GB-ThumbDrive.jpg", price: 15.49 },
    { id: 5, name: "Webcam", image: "https://5.imimg.com/data5/SELLER/Default/2021/9/SW/GW/TD/32454731/enter-web-camera-1000x1000.jpg", price: 59.99 },
    { id: 6, name: "Laptop Stand", image: "https://symplify.in/cdn/shop/products/Wooden-Laptop-Stand-Opt3-3_947x947.jpg?v=1658253933", price: 39.99 },
    { id: 7, name: "Headphones", image: "https://as1.ftcdn.net/v2/jpg/05/95/78/78/1000_F_595787852_efGpIfJmAJxcof7PBsQsDmirsZ3R8o50.jpg", price: 89.99 },
    { id: 8, name: "Smartphone", image: "https://img.freepik.com/free-vector/realistic-display-smartphone-with-different-apps_52683-30241.jpg?t=st=1723093757~exp=1723097357~hmac=8a10b21c31c831ed7c3bdbeae0536df7c7f1c6c6c3bd335d6db46c9943a98990&w=740", price: 499.99 },
    { id: 9, name: "Tablet", image: "https://as2.ftcdn.net/v2/jpg/00/69/95/57/1000_F_69955782_MH7ECJHzrtJL3KK1BtcnOZU7KOs34qVH.jpg", price: 299.99 },
    { id: 10, name: "External Hard Drive", image: "https://quizizz.com/_media/quizzes/a163b5b5-c077-49cc-9b6d-f8b266c137f3_900_900", price: 79.99 },
    { id: 11, name: "Printer", image: "https://media.istockphoto.com/id/171574641/photo/inkjet-printer.jpg?s=2048x2048&w=is&k=20&c=w4VOZRYkwJ-GcButHyBJlbFFSEMH3V7xIATXxXn5l2I=", price: 149.99 },
    { id: 12, name: "Router", image: "https://st2.depositphotos.com/1187563/7649/i/950/depositphotos_76493923-stock-photo-old-style-photo-3d-modern.jpg", price: 99.99 }
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









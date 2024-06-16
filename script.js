const cartItems = [
    { id: 1, name: 'Item 1', price: 10.00, quantity: 1, liked: false },
    { id: 2, name: 'Item 2', price: 15.00, quantity: 1, liked: false },
    { id: 3, name: 'Item 3', price: 20.00, quantity: 1, liked: false },
];

function renderCart() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';

    cartItems.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <div>
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${item.id})">+</button>
                <span class="heart ${item.liked ? 'liked' : ''}" onclick="toggleLike(${item.id})">&hearts;</span>
                <button onclick="deleteItem(${item.id})">Delete</button>
            </div>
        `;
        cartItemsList.appendChild(itemElement);
    });

    updateTotalPrice();
}

function increaseQuantity(id) {
    const item = cartItems.find(item => item.id === id);
    item.quantity++;
    renderCart();
}

function decreaseQuantity(id) {
    const item = cartItems.find(item => item.id === id);
    if (item.quantity > 1) {
        item.quantity--;
        renderCart();
    }
}

function deleteItem(id) {
    const itemIndex = cartItems.findIndex(item => item.id === id);
    cartItems.splice(itemIndex, 1);
    renderCart();
}

function toggleLike(id) {
    const item = cartItems.find(item => item.id === id);
    item.liked = !item.liked;
    renderCart();
}

function updateTotalPrice() {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

// Initial render
renderCart();

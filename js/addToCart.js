function addToCart(productId, quantity, price) {
    const userId = 'user123'; // This should be dynamically set based on the logged-in user
    fetch('/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            productId,
            quantity,
            price
        })
    })
    .then(response => response.json())
    .then(cart => console.log(cart))
    .catch(error => console.error('Error adding item to cart:', error));
}

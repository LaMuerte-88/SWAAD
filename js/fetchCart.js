function fetchCart() {
    const userId =// Set based on logged-in user
    fetch(`/cart/${userId}`)
    .then(response => response.json())
    .then(cart => {
        console.log(cart);
        // Update the DOM with cart details
    })
    .catch(error => console.error('Error fetching cart:', error));
}

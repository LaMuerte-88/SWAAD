function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if(response.ok) return response.json();
        throw new Error('Login failed.');
    })
    .then(data => {
        alert("Logged in successfully");
        window.location.href = "/public/Products.html"; // Ensure this path is correct
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
}

function signup() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if(response.ok) return response.json();
        throw new Error('Signup failed.');
    })
    .then(data => {
        alert("Signup successful. Redirecting to login...");
        toggleForms(); // Switch back to login form
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
}

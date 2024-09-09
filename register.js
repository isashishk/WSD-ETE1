document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let errorMessage = '';

    if (!name || !email || !password) {
        errorMessage = 'All fields are required.';
    } else if (!email.includes('@')) {
        errorMessage = 'Please enter a valid email.';
    }

    if (errorMessage) {
        document.getElementById('error-message').innerText = errorMessage;
    } else {
        alert('Registration Successful!');
        window.location.href = "news.html"; // Redirect to news page
    }
});

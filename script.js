// Handle feedback form submission (simulated, as no backend)
document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const school = document.getElementById('school').value;
    const message = document.getElementById('message').value;
    
    if (name && email && school && message) {
        alert(`Thank you, ${name}! Your feedback has been submitted.\n\nDetails:\nEmail: ${email}\nSchool: ${school}\nMessage: ${message}`);
        // Clear form
        this.reset();
    } else {
        alert('Please fill out all fields.');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Disable button during submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                formResponse.textContent = data.message;
                formResponse.className = 'form-response ' + (data.success ? 'success' : 'error');
                formResponse.style.display = 'block';
                
                if (data.success) {
                    contactForm.reset();
                }
            })
            .catch(error => {
                formResponse.textContent = 'An error occurred. Please try again.';
                formResponse.className = 'form-response error';
                formResponse.style.display = 'block';
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                // Hide response after 5 seconds
                setTimeout(() => {
                    formResponse.style.display = 'none';
                }, 5000);
            });
        });
    }
});
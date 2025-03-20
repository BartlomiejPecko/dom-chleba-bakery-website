let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
}

window.onscroll = () => {
  navbar.classList.remove('active');
}


let slides = document.querySelectorAll('.main .slider .slide');
let index = 0;

function next() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev() {
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}


var links = document.querySelectorAll('.block');

links.forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault();
  });
});






// --------- Buttons for scrolling -------------

const produktyLink = document.querySelector('a[href="#produkty"]');

produktyLink.addEventListener('click', (event) => {
  event.preventDefault();
  const produktySection = document.querySelector('#produkty');
  const sectionTop = produktySection.getBoundingClientRect().top + window.scrollY;
  window.scroll({
    top: sectionTop - 20 * 16, //to make the block "produkty" visible
    behavior: 'smooth'
  });
});


const miejscaLink = document.querySelector('a[href="#miejsca-sprzedazy"]');

miejscaLink.addEventListener('click', (event) => {
  event.preventDefault();
  const miejscaSection = document.querySelector('#miejsca-sprzedazy');
  const offset = 340; 
  const miejscaSectionPosition = miejscaSection.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: miejscaSectionPosition, behavior: 'smooth' });
});


const onasLink = document.querySelector('a[href="#onas"]');

onasLink.addEventListener('click', (event) => {
  event.preventDefault();
  const onasSection = document.querySelector('#onas');
  const offset = 320;
  const onasSectionPosition = onasSection.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: onasSectionPosition, behavior: 'smooth' });
});


const kontaktLink = document.querySelector('a[href="#kontakt"]');

kontaktLink.addEventListener('click', (event) => {
  event.preventDefault();
  const kontaktSection = document.querySelector('#kontakt');
  const offset = 100;
  const kontaktSectionPosition = kontaktSection.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: kontaktSectionPosition, behavior: 'smooth' });
});

// --------- Email ------------

document.addEventListener('DOMContentLoaded', function() {
  // Form elements
  const emailContact = document.getElementById('email-contact');
  const contactForm = document.getElementById('contact-form');
  const form = document.getElementById('email-form');
  const resultDiv = document.getElementById('result');
  const submitBtn = document.getElementById('submit-btn');
  let formVisible = false;
  
  // Form visibility toggle function
  function toggleContactForm() {
    formVisible = !formVisible;
    
    if (formVisible) {
      contactForm.style.display = 'block';
      // Animation for form appearance
      contactForm.style.opacity = '0';
      contactForm.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        contactForm.style.opacity = '1';
        contactForm.style.transform = 'translateY(0)';
      }, 10);
    } else {
      // Animation for form disappearance
      contactForm.style.opacity = '0';
      contactForm.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        contactForm.style.display = 'none';
        // Reset form and result message
        if (form) form.reset();
        if (resultDiv) resultDiv.style.display = 'none';
      }, 300);
    }
  }
  
  // Click handler for email contact section
  if (emailContact) {
    emailContact.addEventListener('click', function(event) {
      // Prevent closing when clicking form elements
      if (!event.target.closest('#contact-form') || event.target.closest('#contact-form') === contactForm) {
        event.preventDefault();
        toggleContactForm();
      }
    });
  }
  
  // Form submission handler
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Update button state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wysyłanie...';
      
      // Prepare form data
      const formData = new FormData(form);
      
      // Submit form using fetch API
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(async (response) => {
        let data = await response.json();
        
        if (response.status == 200) {
          // Success message
          resultDiv.innerHTML = '<p class="success-message">Dziękujemy! Wiadomość została wysłana.</p>';
          form.reset();
        } else {
          // Error message with details if available
          resultDiv.innerHTML = `<p class="error-message">${data.message || 'Wystąpił błąd. Spróbuj ponownie później.'}</p>`;
          console.error(data);
        }
      })
      .catch((error) => {
        // Network or other error
        resultDiv.innerHTML = '<p class="error-message">Wystąpił błąd połączenia. Spróbuj ponownie później.</p>';
        console.error(error);
      })
      .finally(() => {
        // Reset button state and show result
        submitBtn.disabled = false;
        submitBtn.textContent = 'Wyślij wiadomość';
        resultDiv.style.display = 'block';
        
        // Auto-hide form after successful submission
        setTimeout(() => {
          if (resultDiv.querySelector('.success-message')) {
            toggleContactForm();
          }
        }, 3000);
      });
    });
  }
  
  // Prevent event propagation from form
  if (contactForm) {
    contactForm.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  }
});


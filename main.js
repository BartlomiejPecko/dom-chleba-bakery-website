let navbar = document.querySelector('.navbar');
let menuBtn = document.querySelector('#menu-btn');
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
  const headerHeight = document.querySelector('.header').offsetHeight;
  const offset = 20; // Additional offset if needed
  const miejscaSectionPosition = miejscaSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;
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
      contactForm.style.opacity = '0';
      contactForm.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        contactForm.style.opacity = '1';
        contactForm.style.transform = 'translateY(0)';
      }, 10);
    } else {
      contactForm.style.opacity = '0';
      contactForm.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        contactForm.style.display = 'none';
        if (form) form.reset();
        if (resultDiv) resultDiv.style.display = 'none';
      }, 300);
    }
  }
  
  // Handle email contact section clicks
  if (emailContact) {
    emailContact.addEventListener('click', function(event) {
      if (!event.target.closest('#contact-form') || event.target.closest('#contact-form') === contactForm) {
        event.preventDefault();
        toggleContactForm();
      }
    });
  }
  
  // Link detection functionality
  function containsLinks(text) {
    if (!text) return false;
    
    const urlPatterns = [
      /(https?:\/\/[^\s]+)/i,
      /(www\.[^\s]+\.[a-z]{2,})/i,
      /([a-z0-9][-a-z0-9]*\.(com|org|net|edu|gov|mil|io|co|biz|info|online|app))/i,
      /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/i
    ];
    
    return urlPatterns.some(pattern => pattern.test(text));
  }
  
  // Real-time message field validation
  const messageField = form ? form.querySelector('textarea[name="message"]') : null;
  if (messageField) {
    messageField.addEventListener('input', function() {
      if (containsLinks(this.value)) {
        this.classList.add('invalid-input');
        resultDiv.innerHTML = '<p class="warning-message">Twoja wiadomość zawiera linki, które nie są dozwolone.</p>';
        resultDiv.style.display = 'block';
      } else {
        this.classList.remove('invalid-input');
        resultDiv.style.display = 'none';
      }
    });
  }
  
  // Integrated form submission handler
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous messages
      resultDiv.innerHTML = '';
      
      // Check for links in the message
      const messageContent = messageField ? messageField.value : '';
      if (containsLinks(messageContent)) {
        resultDiv.innerHTML = '<p class="error-message">Wiadomość zawiera niedozwolone linki. Usuń linki i spróbuj ponownie.</p>';
        resultDiv.style.display = 'block';
        return;
      }
      
      // Proceed with form submission if no links were found
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wysyłanie...';
      
      const formData = new FormData(form);
      
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(Object.fromEntries(formData))
      })
      .then(async (response) => {
        let data;
        try {
          data = await response.json();
        } catch (error) {
          if (response.status === 200) {
            resultDiv.innerHTML = '<p class="success-message">Dziękujemy! Wiadomość została wysłana.</p>';
            form.reset();
            return;
          }
          throw new Error('Invalid response format');
        }
        
        if (response.status === 200 || (data && data.success)) {
          resultDiv.innerHTML = '<p class="success-message">Dziękujemy! Wiadomość została wysłana.</p>';
          form.reset();
        } else {
          throw new Error(data && data.message ? data.message : 'Wystąpił błąd podczas wysyłania wiadomości.');
        }
      })
      .catch((error) => {
        console.error('Submission error:', error);
        resultDiv.innerHTML = '<p class="error-message">Wystąpił błąd. Spróbuj ponownie później.</p>';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Wyślij wiadomość';
        resultDiv.style.display = 'block';
        
        // Auto-hide form after successful submission
        if (resultDiv.querySelector('.success-message')) {
          setTimeout(() => {
            toggleContactForm();
          }, 3000);
        }
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



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

// 3. Kod JavaScript do dodania na końcu pliku main.js

// Kod obsługujący formularz kontaktowy
document.addEventListener('DOMContentLoaded', function() {
  // Znajdź elementy formularza
  const emailContact = document.getElementById('email-contact');
  const contactForm = document.getElementById('contact-form');
  let formVisible = false;
  
  // Funkcja przełączająca widoczność formularza
  function toggleContactForm() {
    formVisible = !formVisible;
    
    if (formVisible) {
      contactForm.style.display = 'block';
      // Animacja pojawienia się formularza
      contactForm.style.opacity = '0';
      contactForm.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        contactForm.style.opacity = '1';
        contactForm.style.transform = 'translateY(0)';
      }, 10);
    } else {
      // Animacja znikania formularza
      contactForm.style.opacity = '0';
      contactForm.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        contactForm.style.display = 'none';
      }, 300);
    }
  }
  
  // Dodaj obsługę kliknięcia na cały element "Napisz do nas"
  emailContact.addEventListener('click', function(event) {
    // Sprawdź, czy kliknięcie nie było na formularzu (aby uniknąć zamykania przy kliknięciu w formularz)
    if (!event.target.closest('#contact-form') || event.target.closest('#contact-form') === contactForm) {
      event.preventDefault();
      toggleContactForm();
    }
  });
  
  // Obsługa wysyłania formularza
  document.getElementById('email-form').addEventListener('submit', function(e) {
    // Zapobieganie domyślnej akcji formularza
    e.preventDefault();
    
    // Tutaj normalnie byłaby obsługa wysyłki formularza
    // Dla demonstracji pokazujemy alert
    alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
    toggleContactForm(); // Ukryj formularz po wysłaniu
    
    // Resetuj pola formularza
    this.reset();
  });
  
  // Zapobiegaj rozprzestrzenianiu się zdarzeń z formularza
  contactForm.addEventListener('click', function(event) {
    event.stopPropagation();
  });
});
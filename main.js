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


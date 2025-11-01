const navbar = document.getElementById('navbar');
let handsnavbar = document.getElementById('handsnavbar');
let arrowBtn = document.querySelector('.boton');
let arrowImg = arrowBtn.querySelector('img');
const homeb = document.getElementById('home');
const productsb = document.getElementById('products');
const contactb = document.getElementById('contact');
const searchBar = document.getElementById('searchbar');

// Botones navbar para redireccionar a los otros HTML 

homeb.addEventListener('click', () => (window.location.href = 'index.html'));
productsb.addEventListener('click', () => (window.location.href = 'products.html'));
contactb.addEventListener('click', () => (window.location.href = 'contact.html'));

// Eliminar barra de búsqueda en contact

if (window.location.pathname.includes('contact.html') || window.location.pathname.includes('contact/')) {
  if (searchBar) searchBar.remove();
}


// "Toggle" navbar

function showNavbar() {
  navbar.classList.add('visible');
  arrowImg.style.transform = 'rotate(0deg)';
}

function hideNavbar() {
  navbar.classList.remove('visible');
  arrowImg.style.transform = 'rotate(180deg)';
}


// Detectar si es PC o Mobile para cambiar funcionamiento

function isMobile() {
  return window.innerWidth <= 900;
}


// Ocultar con tiempo de retardo
function delayedHide() {
  setTimeout(() => {
    if (!navbar.matches(':hover') && !handsnavbar.matches(':hover')) hideNavbar();
  }, 200);
}

function setNavbarBehavior() {
  const newHandsnavbar = handsnavbar.cloneNode(true);
  handsnavbar.parentNode.replaceChild(newHandsnavbar, handsnavbar);
  handsnavbar = newHandsnavbar;
  arrowBtn = handsnavbar.querySelector('.boton');
  arrowImg = arrowBtn.querySelector('img');

  if (!isMobile()) {
    handsnavbar.addEventListener('mouseenter', showNavbar);
    navbar.addEventListener('mouseenter', showNavbar);
    handsnavbar.addEventListener('mouseleave', delayedHide);
    navbar.addEventListener('mouseleave', delayedHide);
  } else {
    arrowBtn.addEventListener('click', () => {
      navbar.classList.toggle('visible');
      const isVisible = navbar.classList.contains('visible');
      arrowImg.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  }
}

window.addEventListener('resize', setNavbarBehavior);


// Mostrar automáticamente al cargar la página
function autoShowNavbar() {
  showNavbar();

  // Temporizador que se puede cancelar si el mouse entra
  const hideTimeout = setTimeout(() => {
    if (!isMobile() && !navbar.matches(':hover') && !handsnavbar.matches(':hover')) {
      hideNavbar();
    }
  }, 1500); // 1.5 segundos visibles

  // Si el usuario pasa el mouse, cancelamos el cierre
  navbar.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
  handsnavbar.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
}

setNavbarBehavior();
autoShowNavbar();




if (window.location.pathname.includes('products.html') || window.location.pathname.includes('products/')) {
  document.querySelectorAll('.itemofproducts').forEach(button => {
    const targetId = button.getAttribute('data-target'); // toma el valor del data-target
    const div = document.getElementById(targetId);
    const arrow = button.querySelector('img');

    if (div) {
      // Solo mostrar Nike (o el primero) al inicio
      if (targetId !== 'nike') {
        div.classList.add('d-none');
        arrow.style.transform = 'rotate(90deg)';
      } else {
        arrow.style.transform = 'rotate(180deg)';
      }

      // Mostrar/ocultar la marca
      button.addEventListener('click', () => {
        div.classList.toggle('d-none');
        arrow.style.transform = div.classList.contains('d-none')
          ? 'rotate(90deg)'
          : 'rotate(180deg)';
      });

      // ---- Carrusel interno ----
      const cardContainer = div.querySelector('.cards-wrapper');
      const btnLeft = div.querySelector('.arrow-btn.left');
      const btnRight = div.querySelector('.arrow-btn.right');

      if (cardContainer && btnLeft && btnRight) {
        // Mover a la izquierda
        btnLeft.addEventListener('click', () => {
          cardContainer.scrollBy({ left: -250, behavior: 'smooth' });
        });

        // Mover a la derecha
        btnRight.addEventListener('click', () => {
          cardContainer.scrollBy({ left: 250, behavior: 'smooth' });
        });
      }
    }
  });
}

if (
  window.location.pathname.includes('index.html') || 
  window.location.pathname === '/' // También cubre cuando se carga directamente la raíz
) {

  const carrusel = document.querySelector('.carrusel');
  const cardContainer = carrusel?.querySelector('.cards-wrapper');
  const btnLeft = carrusel?.querySelector('.arrow-btn.left');
  const btnRight = carrusel?.querySelector('.arrow-btn.right');

  if (cardContainer && btnLeft && btnRight) {
    const scrollStep = 250;

    btnLeft.addEventListener('click', () => {
      if (cardContainer.scrollLeft <= 0) {
        cardContainer.scrollTo({ left: cardContainer.scrollWidth, behavior: 'smooth' });
      } else {
        cardContainer.scrollBy({ left: -scrollStep, behavior: 'smooth' });
      }
    });

    btnRight.addEventListener('click', () => {
      if (cardContainer.scrollLeft + cardContainer.clientWidth >= cardContainer.scrollWidth - 1) {
        cardContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        cardContainer.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    });
  }
}

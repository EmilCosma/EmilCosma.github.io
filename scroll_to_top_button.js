// Când utilizatorul face scroll, execută funcția
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  // Dacă pagina este derulată mai mult de 20px de la partea de sus, arată butonul
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrollToTop").style.display = "block";
  } else {
    // Altfel, ascunde butonul
    document.getElementById("scrollToTop").style.display = "none";
  }
}

// Când utilizatorul face clic pe buton, derulează la partea de sus a documentului
document.getElementById("scrollToTop").onclick = function() {
  // Folosim window.scrollTo cu un obiect de opțiuni pentru smooth scroll
  window.scrollTo({
    top: 0, // Derulează înapoi la partea de sus a paginii
    behavior: 'smooth' // Efectuează derularea în mod treptat
  });
}
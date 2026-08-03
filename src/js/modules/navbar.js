// src/js/modules/navbar.js

/**
 * Controla o comportamento do menu de navegação mobile:
 * abre/fecha o drawer ao clicar no botão hambúrguer,
 * fecha automaticamente ao clicar em um link ou fora do menu.
 */
export function initNavbar() {
  const toggleButton = document.querySelector('.navbar__toggle');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');

  if (!toggleButton || !mobileMenu) return;

  const closeMenu = () => {
    toggleButton.classList.remove('navbar__toggle--open');
    mobileMenu.classList.remove('navbar__mobile-menu--open');
    toggleButton.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    toggleButton.classList.add('navbar__toggle--open');
    mobileMenu.classList.add('navbar__mobile-menu--open');
    toggleButton.setAttribute('aria-expanded', 'true');
  };

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.contains('navbar__mobile-menu--open');
    isOpen ? closeMenu() : openMenu();
  };

  toggleButton.addEventListener('click', toggleMenu);

  // Fecha o menu ao clicar em qualquer link dentro dele
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha o menu ao clicar fora dele (mas não no próprio botão toggle)
  document.addEventListener('click', (event) => {
    const clickedOutside =
      !mobileMenu.contains(event.target) && !toggleButton.contains(event.target);

    if (clickedOutside && mobileMenu.classList.contains('navbar__mobile-menu--open')) {
      closeMenu();
    }
  });

  // Fecha o menu ao pressionar Esc (acessibilidade via teclado)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}
// src/main.js

import './css/main.css';

import { initContactForm } from './js/modules/contact-form.js';
import { initNavbar } from './js/modules/navbar.js';

// Inicializa módulos assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initContactForm();
});
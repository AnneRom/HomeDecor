console.log("Hello!");

import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

const menuToggle = document.querySelector('.sideMenu__icon');
const sideMenu = document.querySelector('.header__nav');

document.addEventListener('DOMContentLoaded', () => {
    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('active_sideMenu');
        menuToggle.classList.toggle('open');
    })
    window.addEventListener('resize', () => {
        if (window.innerWidth > 850) {
            sideMenu.classList.remove('active_sideMenu');
            menuToggle.classList.remove('open');
        }
    });
});
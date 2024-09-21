import { handleNavList } from "./navigation-list.js";

export const handleNavScreenSizes = () => {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth <= 800) {
            document.querySelector('.nav__list').style.display = 'none';
            handleNavList();
        };
    });

    let widthMatch800px = window.matchMedia("(max-width: 800px)")
    widthMatch800px.addEventListener('change', (e) => {
        if (e.matches) {
            document.querySelector('.nav__list').style.display = 'none';
            handleNavList();
        } else {
            document.querySelector('.nav__list').style.display = 'flex';
            handleNavList();
        };
    });
};
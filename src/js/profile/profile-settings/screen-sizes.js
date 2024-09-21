import { handleDropdownList } from "./profile-dropdown.js";

export const handleScreenSizes = () => {
    let widthMatch920px = window.matchMedia("(max-width: 920px)");
    let widthMatch450px = window.matchMedia("(max-width: 450px)");

    document.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth <= 920) {
            document.querySelector('.nav__list').style.display = 'none';
            handleDropdownList();
        };
        if (window.innerWidth <= 450) {
            document.querySelector('#search__submit').value = '';
        };
        document.querySelectorAll('.nav__list li a').forEach((evento) => {
            evento.addEventListener('click', () => {
                let item_href = evento.getAttribute("href");
                document.querySelector(`${item_href}`).click();
            })
        });
    });

    widthMatch920px.addEventListener('change', (e) => {
        if (e.matches) {
            document.querySelector('.nav__list').style.display = 'none';
            handleDropdownList();
        } else {
            document.querySelector('.nav__list').style.display = 'none';
            handleDropdownList();
        }
    });

    widthMatch450px.addEventListener('change', (e) => {
        if (e.matches) {
            document.querySelector('#search__submit').value = '';
        } else {
            document.querySelector('#search__submit').value = 'Buscar';
        }
    });
};
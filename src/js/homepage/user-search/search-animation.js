export const handleSearchInput = () => {
    document.querySelector('#input__search').addEventListener('keyup', () => {
        const searchInput = document.querySelector('#input__search');
        const searchButton = document.querySelector('#input__submit');

        if (searchInput.value.length === 0) {
            searchButton.disabled = true;
            searchButton.style.cursor = 'not-allowed';
        } else {
            searchButton.disabled = false;
            searchButton.style.cursor = 'pointer';
        }
    });
};

export const disableButton = () => {
    document.addEventListener("DOMContentLoaded", () => {
        const searchButton = document.querySelector('#input__submit');
        searchButton.disabled = true;
    })
};

export const handleSearchAnimation = () => {
    const abaixoBusca = document.querySelector('.content__display');
    const resultado = document.querySelector('.result__wrapper');

    document.addEventListener('click', (e) => {
        if (e.target.id == 'infos__close') {
            abaixoBusca.classList.remove('focused__opacity');
            resultado.classList.add('remove__animation');
            resultado.classList.remove('show__search');
        } else {
            if (document.querySelector('.results__container').classList.contains('searched')) {
                if (abaixoBusca.classList.contains('focused__opacity')) {
                    resultado.classList.add('show__search');
                    resultado.classList.remove('remove__animation');
                } else {
                    resultado.classList.add('remove__animation');
                    resultado.classList.remove('show__search');
                };
            };
        };
    });

    document.querySelector('#infos__close').addEventListener('click', () => {
        document.querySelector('.content__display').classList.remove('focused__opacity');
        resultado.classList.add('remove__animation');
        resultado.classList.remove('show__search');
    });
};

export const handleSearchField = () => {
    const abaixoBusca = document.querySelector('.content__display');
    const resultado = document.querySelector('.result__wrapper');
    const tituloBusca = document.querySelector(".header__wrapper");
    const buscaInputs = document.querySelectorAll('input');

    // Opacidade
    for (let input of buscaInputs) {
        input.addEventListener('focusin', () => {
            abaixoBusca.classList.add('focused__opacity');
        });
    };

    document.querySelector('.form__fixer').addEventListener('click', () => {
        abaixoBusca.classList.remove('focused__opacity');
    });
    tituloBusca.addEventListener('click', () => {
        abaixoBusca.classList.remove('focused__opacity');
    });
    resultado.addEventListener('click', () => {
        abaixoBusca.classList.add('focused__opacity');
    });
    abaixoBusca.addEventListener('click', () => {
        abaixoBusca.classList.remove('focused__opacity');
    });
    document.querySelector('#infos__close').addEventListener('click', () => {
        resultado.classList.remove('show__search');
    });

};

export const handleFormAnimation = () => {
    const resultado = document.querySelector('.result__wrapper');
    document.querySelector('#search__form').addEventListener('submit', (e) => {
        resultado.classList.add('show__search');
        if (window.getComputedStyle(resultado, null).display == 'none') {
            resultado.classList.add('search__animation');
        };
    });
}
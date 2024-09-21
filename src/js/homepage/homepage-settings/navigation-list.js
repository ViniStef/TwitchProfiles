export const handleLinks = () => {
    document.querySelector('#info__link').addEventListener('click', () => {
        document.querySelector('#services__description').focus();
    });

    document.querySelector('#bttv__link').addEventListener('click', () => {
        document.querySelector('#bttv__description').focus();
    });

    document.querySelector('#ffz__link').addEventListener('click', () => {
        document.querySelector('#ffz__description').focus();
    });

    document.querySelector('#twitch__link').addEventListener('click', () => {
        document.querySelector('#twitch__description').focus();
    });

    document.querySelector('.nav__fixer').addEventListener('click', () => {
        document.querySelector('.nav__list').style.display = 'none';
    });
};

export const handleNavList = () => {
    document.addEventListener('click', (itemClick) => {
        if (window.innerWidth <= 800) {
            if (itemClick.target.id == 'nav__toggle') {
                if (document.querySelector('.nav__list').style.display == 'flex') {
                    document.querySelector('.nav__list').style.display = 'none';
                } else {
                    document.querySelector('.nav__list').style.display = 'flex';
                    document.querySelectorAll('.nav__list li').forEach((li) => {
                        li.style.visibility = 'visible';
                    });
                };
            } else {
                if (!['ffz__link', 'bttv__link', 'twitch__link', 'info__link'].includes(itemClick.target.id)) {
                    document.querySelector('.nav__list').style.display = 'none';
                } else {
                    document.querySelector('.nav__list').style.display = 'flex';
                };
            };
        };
    });
};
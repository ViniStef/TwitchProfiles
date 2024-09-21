export const modifyNavbarLinks = () => {
    document.querySelector('.nav__fixer').addEventListener('click', () => {
        document.querySelector('.nav__list').style.display = 'none';
    })
}

export const handleDropdownList = () => {
    document.addEventListener("click", (itemClicado) => {
        if (window.innerWidth <= 920) {
            if (itemClicado.target.id == "nav__toggle") {
                if (document.querySelector('.nav__list').style.display == 'flex') {
                    document.querySelector('.nav__list').style.display = 'none';
                } else {
                    document.querySelector('.nav__list').style.display = 'flex';
                    document.querySelectorAll('.list__item').forEach((li) => {
                        li.style.visibility = 'visible'
                    })
                }
            } else {
                if (!['twitch__anchor', 'bttv__anchor', 'ffz__anchor', 'offline__anchor'].includes(itemClicado.target.id)) {
                    document.querySelector('.nav__list').style.display = 'none';
                } else {
                    document.querySelector('.nav__list').style.display = 'flex';
                }
            }
        }

    })
}
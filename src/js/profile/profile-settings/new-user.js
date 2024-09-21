export const getNewUserFromProfile = (allInfo) => {
    const formBuscaPagUsuario = document.querySelector('#user__search');
    const twitchEmotes = document.querySelector('#display__twitch');
    const bttvEmotes = document.querySelector('#display__bttv');
    const ffzEmotes = document.querySelector('#display__ffz');
    const offIMG = document.querySelector('#display__offline');
    const buscarCanal = document.querySelector('#search__input');

    formBuscaPagUsuario.addEventListener('submit', (e) => {
        e.preventDefault();

        twitchEmotes.textContent = '';
        bttvEmotes.textContent = '';
        ffzEmotes.textContent = '';
        offIMG.textContent = '';

        allInfo(buscarCanal.value);

        window.location.pathname = buscarCanal.value;
    });
};

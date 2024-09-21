export const getAndUpdateGameInfo = async (game_id) => {
    const requestBody = { endpoint: 'games', method: 'GET', params: { id: game_id } };
    try {
        const response = await axios.post("/twitch-data", requestBody, {
            headers: { 'Content-Type': 'application/json' },
        })

        const { name, box_art_url } = response.data.data[0];
        let jogo_img1 = box_art_url.replace('{width}', '300');
        let jogo_img2 = jogo_img1.replace('{height}', '300');

        document.querySelector("#game__img").src = jogo_img2;
        document.querySelector(".game__background").style.backgroundImage =  `url(${jogo_img2})`;

        updateGameName(name);

    } catch (error) {
        updateGameName("");
    }
};

export const updateGameName = (game_name) => {
    const gameNameH3 = document.querySelector("#game__name");
    if (!game_name) {
        document.querySelector("#game__img").src = "../imgs/raccoons-games.png";
        document.querySelector("#game__img").style.filter = 'grayscale(100%)';
        document.querySelector(".game__background").style.backgroundImage =  `url(${"../imgs/raccoons-games.png"})`;
        gameNameH3.textContent = 'Nenhum jogo encontrado!';
    } else {
        gameNameH3.textContent = game_name;
    }
};

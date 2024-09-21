import { getAndUpdateGameInfo } from "./user-game.js";

export const getExtraUserInfo = async (username) => {
    const requestBody = { endpoint: 'search/channels', method: 'GET', params: { query: username } };
    try {
        let currentUserInfo;
        const response = await axios.post("/twitch-data", requestBody, {
            headers: { 'Content-Type': 'application/json' },
        })

        for (let i = 0; i < response.data.data.length; i++) {
            if (username.toLowerCase() === response.data.data[i].display_name.toLowerCase()) {
                currentUserInfo = response.data.data[i];
            }
        }

        const { broadcaster_language, game_id, is_live, title } = currentUserInfo;

        updateBroadcasterLanguage(broadcaster_language);
        updateUserTitle(title);
        updateIsLive(is_live);
        getAndUpdateGameInfo(game_id);

    } catch (error) {
        console.log("Error when trying to obtain extra info: ", error);

    }
}

const updateBroadcasterLanguage = (broadcaster_language) => {
    const language = document.querySelector("#details__language");
    
    if (broadcaster_language === "") {
        language.textContent = "";
    } else {
        language.textContent = broadcaster_language.toUpperCase();
    }
}

const updateUserTitle = (title) => {
    const streamTitle = document.querySelector("#stream__title");

    if (title === "") {
        streamTitle.textContent = "Nenhum título encontrado!";
    } else {
        streamTitle.textContent = title;
    }
}

const updateIsLive = (isLive) => {
    const isLiveSpan = document.querySelector("#is__live span");

    if (isLive) {
        isLiveSpan.textContent = 'Ao Vivo Agora!';
    } else {
        isLiveSpan.textContent = 'Offline.';
    }
}


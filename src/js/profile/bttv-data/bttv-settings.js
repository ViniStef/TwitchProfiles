export const getAndDisplayBttvEmotes = async (user_id) => {
        // Requisições para a API do Bttv quando o botão 'Emotes Bttv' é clicado.
        document.querySelector("#bttv__button").addEventListener("click", async () => {
            let bttvEmotes;
            const bttvEmotesContainer = document.querySelector("#display__bttv");
            const requestBody = { endpoint: `${user_id}`, method: 'GET' };

            if (!bttvEmotesContainer.childElementCount > 0) {
                document.querySelector('.display__loading').style.display = 'inline';
                document.querySelector('.placeholder__img').style.display = 'flex';
                try {
                    const response = await axios.post("/bttv-data", requestBody);
                    const responseData = response.data;
                    
                    try {
                        // Se o usuário for encontrado mas não tiver nenhum emote, retornará '' como resposta.
                        bttvEmotes = responseData.channelEmotes.concat(responseData.sharedEmotes);
                        
                    } catch (error) {
                        // Se o servidor responder com o código 404, significa que o usuário não foi encontrado, indicando provavelmente que o usuário nunca se conectou ao site do Bttv.
                        // Colocar o valor como "" para não ter código extra exibindo o mesmo conteúdo.
                        bttvEmotes = "";
                        
                    } finally {
                        updateBttvEmotes(bttvEmotes);
                    }
                    
                } catch (error) {
                    
                    const loadingField = document.querySelector(".display__loading");
                    bttvEmotesContainer.style.display = 'inline';
                    loadingField.style.display = 'none';
                    const h3 = document.createElement("h3");
                    h3.textContent = 'Não foi possível encontrar nenhum emote do BetterTTV!';
                    document.querySelector('.placeholder__img').style.display = 'flex';
                    bttvEmotesContainer.append(h3);
                    console.log("Something went wrong while trying to request data from BetterTwitchTV's API: ", error);
                } 
            }
        });
};

const updateBttvEmotes = (emotes_list) => {
    const loadingField = document.querySelector(".display__loading");
    const bttvEmotesContainer = document.querySelector("#display__bttv");
    if (!emotes_list.length > 0) {
        
        loadingField.style.display = 'none';
        bttvEmotesContainer.style.display = 'inline';
        const h3 = document.createElement("h3");
        h3.innerText = 'Este canal ainda não possui emotes do BetterTTV!'
        bttvEmotesContainer.append(h3);
        document.querySelector('.placeholder__img').style.display = 'flex';
    } else {
        bttvEmotesContainer.style.display = 'none';
        loadingField.style.display = 'inline';
        emotes_list.forEach((emote, index) => {
            const img = document.createElement("img");
            img.src = `https://cdn.betterttv.net/emote/${emote.id}/3x`;
            img.classList.add('emote__img');
            img.setAttribute('name', emote.code);
            img.title = emote.code;

            if (index == emotes_list.length - 1) {
                img.addEventListener('load', () => {
                    document.querySelector('.placeholder__img').style.display = 'none';
                    bttvEmotesContainer.style.display = 'inline';
                    loadingField.style.display = 'none';
                })
            }

            bttvEmotesContainer.append(img);
        })
    }
}
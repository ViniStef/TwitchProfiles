export const getAndDisplayFfzEmotes = async (user_id) => {
    // Requições efetuadas para o API do FFZ ao clicar no botão 'FrankerFZ Emotes'.
    document.querySelector("#ffz__button").addEventListener("click", async () => {
        let ffzEmotes;
        const ffzEmotesSelect = document.querySelector('#display__ffz');
        const requestBody = { endpoint: `${user_id}`, method: 'GET' };

        if (!ffzEmotesSelect.childElementCount > 0) {
            document.querySelector('.display__loading').style.display = 'inline';
            document.querySelector('.placeholder__img').style.display = 'flex';
            try {
                const response = await axios.post("/ffz-data", requestBody);
                const responseData = response.data;
                
                try {
                    let numeroSet = responseData.room.set;
                    ffzEmotes = responseData.sets[numeroSet].emoticons;
    
                } catch (error) {
                    ffzEmotes = "";
    
                } finally {
                    updateFfzEmotes(ffzEmotes);
                    ffzEmotesSelect.style.display = 'inline';
                }
    
            } catch (error) {
                const loadingField = document.querySelector('.display__loading');
                loadingField.style.display = 'none';
                const h3 = document.createElement('h3');
                h3.textContent = "Não foi possível encontrar nenhum emote do FrankerFaceZ!";
                document.querySelector('.placeholder__img').style.display = 'flex';
                ffzEmotesSelect.appendChild(h3);
                console.log("Something went wrong while trying to request data from FrankerFaceZ's API: ", error);   
            };
        }
    });

};

const updateFfzEmotes = (emotes_list) => {
    const ffzEmotes = document.querySelector('#display__ffz');
    const campoImgsCarregando = document.querySelector('.display__loading');
    const semInfoImg = document.querySelector('.placeholder__img');

    if (emotes_list.length < 1) {
        campoImgsCarregando.style.display = 'none';
        ffzEmotes.style.display = 'inline';

        if (!ffzEmotes.childElementCount > 0) {
            campoImgsCarregando.style.display = 'none';
            const h3 = document.createElement('h3');
            h3.textContent = 'Este canal ainda não possui emotes do FrankerFZ!';
            document.querySelector('.placeholder__img').style.display = 'flex';
            ffzEmotes.appendChild(h3);
        }

        semInfoImg.style.display = 'flex';
    } else if (emotes_list.length === 1) {
        const img = document.createElement('img');
        img.className = 'emote__img';
        img.src = `https://cdn.frankerfacez.com/emote/${emotes_list[0].id}/2`;
        img.name = emotes_list[0].name;
        img.title = emotes_list[0].name;

        ffzEmotes.appendChild(img);

        campoImgsCarregando.style.display = 'none';
        semInfoImg.style.display = 'none';
        ffzEmotes.style.display = 'inline';
    } else {
        emotes_list.forEach((emote, index) => {
            const img = document.createElement('img');
            img.className = 'emote__img';
            img.src = `https://cdn.frankerfacez.com/emote/${emote.id}/2`;
            img.name = emote.name;
            img.title = emote.name;

            ffzEmotes.appendChild(img);

            if (index === emotes_list.length - 1) {
                img.addEventListener('load', () => {
                    campoImgsCarregando.style.display = 'none';
                    semInfoImg.style.display = 'none';
                    ffzEmotes.style.display = 'inline';
                });
            }
        });
    }
};

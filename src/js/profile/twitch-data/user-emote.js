export const getChannelEmotes = async (user_id) => {
    const requestBody = { endpoint: 'chat/emotes', method: 'GET', params: { broadcaster_id: user_id } };
    try {
        const response = await axios.post("/twitch-data", requestBody, {
            headers: { 'Content-Type': 'application/json' },
        })

        const emotes_list = response.data.data;

        displayChannelEmotes(emotes_list);
        modifyDisplayStyle();

    } catch (error) {
        console.log('Error while trying to request channel emotes: ', error)
    }
};

const displayChannelEmotes = (emotes_list) => {
    const loadingField = document.querySelector(".display__loading");
    const twitchEmotesContainer = document.querySelector("#display__twitch");
    const noInfoImg = document.querySelector(".placeholder__img");
    if (emotes_list.length <= 1) {
        loadingField.style.display = 'none';
        twitchEmotesContainer.style.display = 'inline';

        const msg = document.createElement('h3');
        msg.textContent = "Este canal ainda não possui emotes para inscritos!";
        twitchEmotesContainer.appendChild(msg);

        noInfoImg.style.display = 'flex';
    } else {
        // Os emotes para inscritos sempre serão os primeiros requisitados e mostrado,não apenas após pressionar o botão,como os emotes do BTTV e FFZ.
        twitchEmotesContainer.style.display = 'none';
        loadingField.style.display = 'inline';
        emotes_list.forEach((emote, index) => {
            const img = document.createElement("img");
            img.className = "emote__img";
            img.src = emote.images.url_2x;
            img.alt = emote.name;
            img.title = emote.name;

            if (index == emotes_list.length - 1) {
                img.addEventListener('load', () => {
                    loadingField.style.display = 'none';
                    noInfoImg.style.display = 'none';
                    twitchEmotesContainer.style.display = 'inline';
                })
            }

            twitchEmotesContainer.appendChild(img);
        });
    }
};

const modifyDisplayStyle = () => {
    const campoImgs = document.querySelector('.emotes__display');
    const currentPaddingLeft = window.getComputedStyle(campoImgs).getPropertyValue('padding-left');
    const currentOverflowY = window.getComputedStyle(campoImgs).getPropertyValue('overflow-y');

    const buttons = document.querySelectorAll('.options__buttons button');
    const twitchEmotes = document.querySelector("#display__twitch");
    const bttvEmotes = document.querySelector("#display__bttv");
    const ffzEmotes = document.querySelector("#display__ffz");
    const offImg = document.querySelector("#display__offline");
    const noOffImg = document.querySelector(".placeholder__img");

    const displayAreas = [twitchEmotes, bttvEmotes, ffzEmotes, offImg];

    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            displayAreas.forEach((area) => {
                area.style.display = 'none';
            });

            campoImgs.style.paddingLeft = currentPaddingLeft;
            campoImgs.style.overflowY = currentOverflowY;

            switch (button.id) {
                case "twitch__button":
                    handleEmotesDisplay(twitchEmotes, noOffImg);
                    break;
                case "bttv__button":
                    handleEmotesDisplay(bttvEmotes, noOffImg);
                    break;
                case "ffz__button":
                    handleEmotesDisplay(ffzEmotes, noOffImg);
                    break;
                case "offline__button":
                    handleEmotesDisplay(offImg, noOffImg);
                    
                    campoImgs.style.paddingLeft = '0';
                    campoImgs.style.overflowY = 'hidden';
                    break;
            }
        })
    })
};

const handleEmotesDisplay = (element, noOffImg) => {
    if (element.firstChild && element.firstChild.tagName == "H3") {
        noOffImg.style.display = "flex";
    } else {
        noOffImg.style.display = "none";
    }

    element.style.display = "inline";
}
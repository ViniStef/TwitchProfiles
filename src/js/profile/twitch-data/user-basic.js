export const fetchTwitchUserData = async (username) => {
    const requestBody = { endpoint: 'users', method: 'GET', params: { login: username } }

    if (username != "404") {
        try {
            const response = await axios.post('/twitch-data', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
    
            const userInfo = response.data.data[0];
            const { id, login, display_name, description, broadcaster_type, profile_image_url, offline_image_url, created_at } = userInfo;
    
            updateTitle(display_name);
            updateDisplayName(display_name);
            updateProfileImg(profile_image_url);
            updateUserTwitchLink(display_name);
            updateDescription(description, display_name);
            updateBroadcasterType(broadcaster_type);
            updateCreatedAt(created_at);
            updateOfflineImage(offline_image_url);
    
            return { id, login };
    
        } catch (error) {
            window.location.href = "/404";
            console.log('Error fetching Twitch user data:', error);
        }
    }
};

const updateTitle = (display_name) => {
    document.title = display_name;
};

const updateDisplayName = (display_name) => {
    document.querySelector("#details__name span").textContent = display_name;
};

const updateProfileImg = (profile_image_url) => {
    document.querySelector("#profile__img").src = profile_image_url;
    document.querySelector("#profile__background").src = profile_image_url;
};

const updateUserTwitchLink = (display_name) => {
    document.querySelector("#details__redirect").href = `https://twitch.tv/${display_name}`
};

const updateDescription = (description, display_name) => {
    const descricaoUsuario = document.querySelector("#info__description");

    if (description === "") {
        descricaoUsuario.textContent = `Não conhecemos ${display_name} muito bem, mas temos certeza que é gente boa.`;
    } else {
        descricaoUsuario.textContent = description;
    }
};

const updateBroadcasterType = (broadcaster_type) => {
    const channelTypeSpan = document.querySelector('#channel__type span');

    if (broadcaster_type == 'partner') {
        channelTypeSpan.textContent = "Parceiro";
    } else if (broadcaster_type == 'affiliate') {
        channelTypeSpan.textContent = "Afiliado";
    } else if (broadcaster_type == "") {
        channelTypeSpan.textContent = "Não Parceiro ou Afiliado";
    }
};

const updateCreatedAt = (created_at) => {
    let meses = { '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr', '05': 'Mai', '06': 'Jun', '07': 'Jul', '08': 'Ago', '09': 'Set', '10': 'Out', '11': 'Nov', '12': 'Dez' }
    let criadaEm = created_at.substring(0, 10);
    document.querySelector("#created__at span").textContent = `${meses[criadaEm.substring(5, 7)]} ${criadaEm.substring(8, 10)}, ${criadaEm.substring(0, 4)}`;
};

const updateOfflineImage = (offline_image_url) => {
    const offImg = document.querySelector("#display__offline");
    const noInfoImg = document.querySelector(".placeholder__img");
    offImg.style.display = 'none';

    // No offline image or a rare case where the image sent through the API is not sent properly.
    const formats = ["png", "jpeg", "jpg"];
    const endFormat = formats.some(format => offline_image_url.endsWith(format));
    if (offline_image_url == "" || !endFormat) {
        const msg = document.createElement('h3');
        msg.textContent = "Este canal não possui uma imagem quando está offline!";
        offImg.appendChild(msg);
        noInfoImg.style.display = 'flex';
        
    } else {
        offImg.style.width = '100%';
        offImg.style.height = '100%';
        noInfoImg.style.display = 'none';

        const img = document.createElement("img");
        img.src = offline_image_url;
        img.className = 'offline__img';
        offImg.appendChild(img);
    }
};
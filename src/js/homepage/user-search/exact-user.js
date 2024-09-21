export const getExactUser = async (username) => {
    const requestBody = { endpoint: 'users', method: 'GET', params: { login: username } };

    try {
        const response = await axios.post('/twitch-data', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.data.data.length >= 1) {
            const userInfo = response.data.data[0];
            const { display_name, profile_image_url } = userInfo;
        
            const img = document.createElement('img');
            img.classList.add('profile__image');
            img.src = profile_image_url;
            img.alt = 'Imagem do perfil';
        
            const nome = document.createElement('p');
            nome.title = display_name;
            nome.textContent = display_name;
        
            const ver = document.createElement('a');
            ver.href = `/${display_name}`;
            ver.target = '_blank';
            ver.textContent = 'Ver';
        
            const div = document.createElement('div');
            div.classList.add('match__details');
            div.appendChild(img);
            div.appendChild(nome);
            div.appendChild(ver);
        
            document.getElementById('infos__match').appendChild(div);
        
            return display_name;
             
        } else {
            const div = document.createElement('div');
            div.classList.add('match__details');
        
            const naoEncontrado = document.createElement('h4');
            naoEncontrado.textContent = 'Nenhum Usuário Encontrado.';
        
            div.appendChild(naoEncontrado);
        
            document.getElementById('infos__match').appendChild(div);
        }
        
    } catch (error) {
        console.log('Error fetching Twitch user data:', error);
    }
};
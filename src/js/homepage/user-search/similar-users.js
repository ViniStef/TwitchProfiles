export const getSimilarUsers = async (username, exact_user) => {
    const requestBody = { endpoint: 'search/channels', method: 'GET', params: { query: username } };

    try {
        const response = await axios.post('/twitch-data', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const usersInfo = response.data.data;

        if (usersInfo.length > 1) {
            document.querySelector('.result__loading').style.display = 'inline';

            if (document.querySelector('#infos__match').children.length > 0) {
                document.querySelector('.result__loading').style.display = 'none';
            }

            usersInfo.forEach((userInfo, index) => {
                const { broadcaster_login: usuarioLogin, display_name: nomeExibido, thumbnail_url: imgPerfil } = userInfo;

                if (nomeExibido !== exact_user) {
                    const img = document.createElement('img');
                    img.className = 'profile__image';
                    img.src = imgPerfil;
                    img.alt = 'Imagem do perfil';

                    const nome = document.createElement('p');
                    nome.title = nomeExibido;
                    nome.textContent = nomeExibido;

                    const ver = document.createElement('a');
                    ver.href = `/${usuarioLogin}`;
                    ver.target = '_blank';
                    ver.textContent = 'Ver';

                    const div = document.createElement('div');
                    div.className = 'match__details';
                    div.append(img, nome, ver);

                    document.querySelector('#infos__similar').appendChild(div);

                    if (index === usersInfo.length - 1) {
                        img.onload = () => {
                            document.querySelector('.result__loading').style.display = 'none';
                            document.querySelector('.result__infos').style.display = 'inline';
                        };
                    }
                }
            });
            
        } else {
            const resultExatoChildren = document.querySelector('#infos__match').children;
            if (resultExatoChildren.length > 0) {
                document.querySelector('.result__loading').style.display = 'none';

                const div = document.createElement('div');
                div.className = 'match__details';

                const naoEncontrado = document.createElement('h4');
                naoEncontrado.textContent = 'Nenhum Outro Resultado Encontrado.';

                document.querySelector('.result__infos').style.display = 'inline';

                div.appendChild(naoEncontrado);
                document.querySelector('#infos__similar').appendChild(div);
            }
        }

    } catch (error) {
        console.log("Something went wrong.", error);
    };
};
class req_bttv_Api {

    emotesInfo(usuarioID) {
        bttvEmotes = 'EXEC CODIGO'
        document.querySelector('.campo_imgs_carregando').style.display = 'inline'
        document.querySelector('.sem_info_IMG').style.display = 'flex'
        fetch(`https://api.betterttv.net/3/cached/users/twitch/${usuarioID}`, {
            method: 'GET'
            
        }).then(resposta => {
            return resposta.json()
        }).then(info => {
            console.log(info, 'bttv info')
            try {
                // Se o usuário for encontrado mas não tiver nenhum emote, retornará '' como resposta.
                bttvEmotes = info['channelEmotes'].concat(info['sharedEmotes'])
            }
            catch (erro) {
                // Se o servidor responder com o código 404, significa que o usuário não foi encontrado, indicando provavelmente que o usuário nunca se conectou ao site do Bttv.
                // Colocar o valor como '' para não ter código extra exibindo o mesmo conteúdo.
                bttvEmotes = ''
                console.log(bttvEmotes, 'Todos os bttv emotes')
                console.log(erro)
            }
            if (bttvEmotes == '') {
                document.querySelector('.campo_imgs_carregando').style.display = 'none';
                document.querySelector('#bttvEmotes').style.display = 'inline';
                var h3 = document.createElement("h3")
                h3.innerText = 'Este canal ainda não possui emotes do BetterTTV!'
                document.querySelector('#bttvEmotes').append(h3)
                document.querySelector('.sem_info_IMG').style.display = 'flex';
            } else {
                console.log(bttvEmotes)
                for (i = 0; i < bttvEmotes.length; i++) {
                    if (i == bttvEmotes.length - 1) {
                        img.addEventListener('load', () => {
                            document.querySelector('.sem_info_IMG').style.display = 'none';
                            document.querySelector('#bttvEmotes').style.display = 'inline';
                            document.querySelector('.campo_imgs_carregando').style.display = 'none';
                        })

                    } else {
                        var img = document.createElement("img")
                        img.src = `https://cdn.betterttv.net/emote/${bttvEmotes[i]['id']}/3x`
                        img.classList.add('emoteIMG')
                        img.setAttribute('name', `${bttvEmotes[i]['code']}`)
                        img.title = `${bttvEmotes[i]['code']}`
                        document.querySelector('#bttvEmotes').append(img)
                    }
                }
            }
        }).catch(erro => console.log('BTTV Erro', erro))
    }
}
export class req_ffz_Api {

    emotesInfo(usuarioID) {
        let ffzEmotes = 'EXEC CODIGO'
        document.querySelector('.campo_imgs_carregando').style.display = 'inline'
        document.querySelector('.sem_info_IMG').style.display = 'flex'
        fetch(`https://api.frankerfacez.com/v1/room/id/${usuarioID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(resposta => {
            return resposta.json()
        }).then(info => {
            try {
                var numeroSet = info['room']['set']
                ffzEmotes = info['sets'][`${numeroSet}`]['emoticons']
            }
            catch (erro) {
                ffzEmotes = ''
            }
            if (ffzEmotes.length < 1) {
                $('.campo_imgs_carregando').css('display', 'none');
                $('#ffzEmotes').css('display', 'inline');
                jQuery('<h3/>', { text: 'Este canal ainda não possui emotes do FrankerFZ!' }).appendTo('#ffzEmotes')
                $('.sem_info_IMG').css('display', 'flex')
            } else if (ffzEmotes.length == 1) {
                var img = jQuery('<img/>', {
                    class: 'emoteIMG',
                    src: `https://cdn.frankerfacez.com/emote/${ffzEmotes[0]['id']}/2`,
                    name: `${ffzEmotes[0]['name']}`,
                    title: `${ffzEmotes[0]['name']}`
                })
                $('#ffzEmotes').append(img)
                $('.campo_imgs_carregando').css('display', 'none');
                $('.sem_info_IMG').css('display', 'none')
                $('#ffzEmotes').css('display', 'inline');
            } else {
                for (let i = 0; i < ffzEmotes.length; i++) {
                    if (i == ffzEmotes.length - 1) {
                        img.on('load', () => {
                            $('.campo_imgs_carregando').css('display', 'none');
                            $('.sem_info_IMG').css('display', 'none')
                            $('#ffzEmotes').css('display', 'inline');
                        })
                    } else {
                        var img = jQuery('<img/>', {
                            class: 'emoteIMG',
                            src: `https://cdn.frankerfacez.com/emote/${ffzEmotes[i]['id']}/2`,
                            name: `${ffzEmotes[i]['name']}`,
                            title: `${ffzEmotes[i]['name']}`
                        })
                        $('#ffzEmotes').append(img)
                    }
                }
            }


        }).catch(erro => {
            console.log('FFZ Erro: ', erro)
        })
    }
}
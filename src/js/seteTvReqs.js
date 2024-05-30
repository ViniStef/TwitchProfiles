// A API do 7tv não está funcionando no momento!

export class req_7TV_Api {

    emoteSetInfo(usuario) {
        // Variavel criarElemento serve pra não criar elementos 'li' extras a cada vez que o botão for clicado.
        let criarElemento = true;
        let seteTvEmotes = 'EXEC CODIGO'
        document.querySelector('.campo_imgs_carregando').style.display = 'inline'
        document.querySelector('.sem_info_IMG').style.display = 'flex'
        fetch(`https://7tv.io/v3/users/${usuario}`, {
            method: 'GET'
        }).then(resposta => {
            return resposta.json()
        }).then(info => {
            try {
                let usuario7TVID = info['id']
                fetch(`https://7tv.io/v3/users/${usuario7TVID}`, {
                    method: 'GET'
                }).then(resposta => {
                    return resposta.json()
                }).then(info => {
                    try {
                        let listaEmoteSet = {}
                        let contador = 0
                        for (let i = 0; i < info['emote_sets'].length; i++) {
                            contador++;
                            listaEmoteSet[info['emote_sets'][i]['name'].trim()] = info['emote_sets'][i]['id']
                        }
                        if (criarElemento) {
                            for (let j = 0; j < contador; j++) {
                                var li = document.createElement("li")
                                li.innerHTML = `<h1 class="setH1">${info['emote_sets'][j]['name']}</h1>`
                                if (j == 0) {
                                    li.classList.add('main_li')
                                }
                                document.querySelector('.espaco_carrosel_seteTv').appendChild(li)
                                var div = document.createElement('div')
                                div.id = `${info['emote_sets'][j]['name']}`.trim().replaceAll(' ', '_').replaceAll("'", "")
                                div.className = 'emote_set_div'
                                if (j == 0) {
                                    div.className = 'emote_set_div set_atual'

                                }
                                document.querySelector('#seteTvEmotes').appendChild(div)
                            }
                            criarElemento = false;
                        }
                        document.querySelector('#slideEsquerda').addEventListener('click', () => {
                            let emote_set = document.querySelector('.espaco_carrosel_seteTv .main_li h1').innerText
                            let mostrar_set_atual = document.querySelector(`#${emote_set.trim().replaceAll(' ', '_').replaceAll("'", "")}`)
                            if (mostrar_set_atual.children.length == 0) {
                                this.requisitarSet(listaEmoteSet[emote_set.trim()])
                            }
                        })
                        document.querySelector('#slideDireita').addEventListener('click', () => {
                            let emote_set = document.querySelector('.espaco_carrosel_seteTv .main_li h1').innerText
                            let mostrar_set_atual = document.querySelector(`#${emote_set.trim().replaceAll(' ', '_').replaceAll("'", "")}`)
                            if (mostrar_set_atual.children.length == 0) {
                                this.requisitarSet(listaEmoteSet[emote_set.trim()])
                            }
                        })
                        this.requisitarSet(listaEmoteSet[document.querySelector('.espaco_carrosel_seteTv .main_li h1').innerText])
                    } catch {
                        seteTvEmotes = ''
                        document.querySelector('.campo_imgs_carregando').style.display = 'none';
                        document.querySelector('#seteTvEmotes').style.display = 'flex';
                        var h3 = document.createElement("h3")
                        h3.innerText = 'Este canal ainda não possui emotes do 7TV!'
                        document.querySelector('#seteTvEmotes').append(h3)
                        document.querySelector('.sem_info_IMG').style.display = 'flex';
                    }
                })
            } catch {
                console.log('Erro')
            }
        })
    }


    requisitarSet(IDSet) {
        document.querySelector('.campo_imgs_carregando').style.display = 'inline';
        document.querySelector('.sem_info_IMG').style.display = 'flex';
        fetch(`https://7tv.io/v3/emote-sets/${IDSet}`, {
            method: 'GET'
        }).then(resposta => {
            return resposta.json()
        }).then(info => {
            try {
                if (info['emotes'] == undefined) {
                    // Se 'emotes' não existir ao requisitar o emote set, significa que o usuário não possui nenhum emote do 7TV.
                    seteTvEmotes = ''
                    document.querySelector('.campo_imgs_carregando').style.display = 'none';
                    document.querySelector('#seteTvEmotes').style.display = 'flex';
                    var h3 = document.createElement("h3")
                    h3.innerText = 'Este canal ainda não possui emotes do 7TV!'
                    document.querySelector('#seteTvEmotes').append(h3)
                    document.querySelector('.sem_info_IMG').style.display = 'flex';
                } else {
                    seteTvEmotes = info['emotes']
                    let nomeSet = info['name'].trim().replaceAll(' ', '_').replaceAll("'", "")
                    for (let i = 0; seteTvEmotes.length; i++) {
                        if (i == seteTvEmotes.length - 1) {
                            img.addEventListener('load', () => {
                                document.querySelector('#seteTvEmotes').style.display = 'inline';
                                document.querySelector('.campo_imgs_carregando').style.display = 'none';
                                document.querySelector('.sem_info_IMG').style.display = 'none';
                                let div_atual = document.querySelector(`#${nomeSet}`)
                                div_atual.style.opacity = '1';
                            })
                        } else {
                            let emoteUrl = seteTvEmotes[i]['data']['host']['url'] + "/2x.webp";
                            var img = document.createElement('img')
                            img.src = emoteUrl
                            img.classList.add('emoteIMG')
                            let div_atual = document.querySelector(`#${nomeSet}`)
                            div_atual.style.opacity = '0';
                            document.querySelector(`#${nomeSet}`).appendChild(img)
                        }
                    }
                }

            } catch {

                console.log('Erro ao obter emotes.')
            }
        }).catch(erro => {
            console.log('Erro ao requisitar emotes: ', erro)
        })
    }
}



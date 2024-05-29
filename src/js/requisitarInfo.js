let usuario = ""
let bttvEmotes = 'EXEC CODIGO'
let seteTvEmotes = 'EXEC CODIGO'
let ffzEmotes = 'EXEC CODIGO'
let usuarioEsqrd = ""
let meses = { '01': 'Jan', '02': 'Fev', '03': 'Mar', '04': 'Abr', '05': 'Mai', '06': 'Jun', '07': 'Jul', '08': 'Ago', '09': 'Set', '10': 'Out', '11': 'Nov', '12': 'Dez' }

function twitchRequests(linkParams, metodo, header) {
    return new Promise((resolver, rejeitar) => {
        fetch(`https://api.twitch.tv/helix/` + linkParams, {
            method: metodo,
            headers: header
        }).then(resposta => {
            return resposta.json()
        }).then(info => {
            resolver(info)
        }).catch(erro => {
            rejeitar(erro)
            console.log('Erro: ', erro)
        })
    })
}

//Editar o titulo da página caso o usuário procure por outro canal.
const usuarioPath = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
document.title = usuarioPath
let headers;

fetch(`/api/env`, {
}).then(response => {
    return response.json()
}).then(data => { 
    const authToken = data.authToken;
    const clientId = data.clientId;

    headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'Client-Id': `${clientId}`
    }

    function allInfo(Usuario) {
        // Apenas carrega o código se o usuário pesquisado for diferente do usuário que está renderizado na página.
        $('#appendUserItems').children().remove()
        usuario = Usuario
    
        twitchRequests(`users?login=${usuario}`, 'GET', headers).then(info => {
            const infoPARAM = info['data'][0]
            let usuarioID = infoPARAM['id']
    
            let nomeExibicaoUsuario = infoPARAM['display_name']
    
            document.title = nomeExibicaoUsuario
            $('#seguindoH1 span').text(`Verifique se um usuário está seguindo ${nomeExibicaoUsuario}!`)
            $('#paginaTwitch').attr('href', `https://twitch.tv/${nomeExibicaoUsuario}`)
    
            let usuarioOfflineIMG = infoPARAM['offline_image_url']
    
            $('#offIMG').css('display', 'none')
            if (usuarioOfflineIMG == "") {
                jQuery('<h3/>', {
                    text: "Este canal não possui uma imagem quando está offline!",
                }).appendTo('#offIMG')
                $('#offIMG .sem_info_IMG').css('display', 'flex')
            } else {
                $('#offIMG').css({ 'width': '100%', 'height': '100%' })
                $('#offIMG .sem_info_IMG').css('display', 'none')
                jQuery('<img/>', {
                    src: `${usuarioOfflineIMG}`,
                    class: 'offlineIMG'
                }).appendTo('#offIMG')
    
            }
    
            $('#nomeExibido span').text(`${nomeExibicaoUsuario}`)
    
            $('#perfilIMG').attr({ "src": `${infoPARAM['profile_image_url']}` })
            $('#perfilIMGFundo').attr({ "src": `${infoPARAM['profile_image_url']}` })
            $('#usuarioDireitaIMG').attr({ "src": `${infoPARAM['profile_image_url']}` })
    
            if (`${infoPARAM['description']}` === "") {
                $('#descricaoUsuario').text(`Não conhecemos ${usuario} muito bem, mas temos certeza que é gente boa.`)
            } else {
                $('#descricaoUsuario').text(`${infoPARAM['description']}`)
            }
    
    
            $('#visualizacoes span').text(`${infoPARAM['view_count']}`)
    
            let criadaEm = infoPARAM['created_at'].substring(0, 10)
            $('#criadaEm span').text(`${meses[criadaEm.substring(5, 7)]} ${criadaEm.substring(8, 10)}, ${criadaEm.substring(0, 4)}`)
    
            let tipoCanal = infoPARAM['broadcaster_type']
            if (tipoCanal == 'partner') {
                $('#tipoCanal span').text("Parceiro")
            } else if (tipoCanal == 'affiliate') {
                $('#tipoCanal span').text("Afiliado")
            } else if (tipoCanal == "") {
                $('#tipoCanal span').text("Não Parceiro ou Afiliado")
            }
    
            twitchRequests(`users/follows?to_id=${usuarioID}`, 'GET', headers).then(info => {
                // let totalFollows = document.createTextNode(info['total'])
                $('#seguidores span').text(info['total'])
            })
    
            twitchRequests(`teams/channel?broadcaster_id=${usuarioID}`, 'GET', headers).then(info => {
                let equipe = ""
                if (info['data'] == null) {
                    equipe = "Sem Equipe"
                } else {
                    equipe = info['data'][0]['team_display_name']
                }
                $('#equipeCanal span').text(equipe)
            })
    
            twitchRequests(`search/channels?query=${usuario}`, 'GET', headers).then(info => {
                for (let i = 0; i < info['data'].length; i++) {
                    if (usuario === info['data'][i]['display_name'] || usuario === info['data'][i]['broadcaster_login']) {
                        
                        if (`${info['data'][i]['broadcaster_language']}` === "") {
                            $('#linguagem').text('')
                        } else {
                            $('#linguagem').text(`${info['data'][i]['broadcaster_language']}`.toUpperCase())
                        }
    
                        if (`${info['data'][i]['game_name']}` === "") {
                            $('#nomeJogoH3').text('Nenhum jogo encontrado!')
                        } else {
                            $('#nomeJogoH3').text(`${info['data'][i]['game_name']}`)
                        }
    
                        if (`${info['data'][i]['title']}` === "") {
                            $('#tituloStream').text(`Nenhum título encontrado!`)
                        } else {
                            $('#tituloStream').text(`${info['data'][i]['title']}`)
                        }
    
                        let aoVivo = info['data'][i]['is_live']
                        if (aoVivo) {
                            $('#aoVivo span').text('Ao Vivo Agora!')
                        } else {
                            $('#aoVivo span').text('Offline.')
                        }
                        let jogoID = info['data'][i]['game_id']
                        twitchRequests(`games?id=${jogoID}`, 'GET', headers).then(info => {
                            let jogo_img = info['data'][0]['box_art_url']
                            let jogo_img1 = jogo_img.replace('{width}', '300')
                            let jogo_img2 = jogo_img1.replace('{height}', '300')
                            $('#jogoIMG').attr({ 'src': `${jogo_img2}` })
                            $('.ultm_jogo_fundo').css(`background-image`, `url(${jogo_img2})`)
                        }).catch(erro => {
                            console.log('Erro ao requisitar jogo: ', erro)
                        })
                    } else {
                        console.log('erro')
                    }
                }
            })
    
            twitchRequests(`chat/emotes?broadcaster_id=${usuarioID}`, 'GET', headers).then(info => {
                let canalEmotesInfo = info['data']
                if (canalEmotesInfo.length <= 1) {
                    $('campo_imgs_carregando').css('display', 'none')
                    
                    $('#twitchEmotes').css('display', 'inline')
                    jQuery('<h3/>', {
                        text: 'Este canal não possui emotes para inscritos!',
                    }).appendTo('#twitchEmotes')
                    $('img .sem_info_IMG').css('display', 'flex')
                } else {
                    // Os emotes para inscritos sempre serão os primeiros requisitados e mostrado,não apenas após pressionar o botão,como os emotes do BTTV e FFZ.
                    $('.campo_imgs_carregando').css('display', 'inline')
                    for (let i = 0; i < canalEmotesInfo.length; i++) {
                        if (i == canalEmotesInfo.length - 1) {
                            img.on('load', () => {
                                $('.campo_imgs_carregando').css('display', 'none')
                                $('.sem_info_IMG').css('display', 'none')
                                $('#twitchEmotes').css('display', 'inline')
                            })
                        } else {
                            var img = jQuery('<img/>', {
                                class: 'emoteIMG',
                                src: `${canalEmotesInfo[i]['images']['url_2x']}`,
                                name: `${canalEmotesInfo[i]['name']}`,
                                title: `${canalEmotesInfo[i]['name']}`
                            })
                            $('#twitchEmotes').append(img)
                        }
                    }
                }
    
    
                let CssAtual = $('.campo_imgs').css(["padding-left", "overflow-y"]);
                $('.botoes_info button').click(function () {
                    $('#twitchEmotes').css('display', 'none');
                    $('#bttvEmotes').css('display', 'none');
                    $('#seteTvEmotes').css('display', 'none');
                    $('#ffzEmotes').css('display', 'none');
                    $('#offIMG').css('display', 'none');
                    if ($(this).attr('id') == 'offlineBtn') {
                        $('.campo_imgs').css({ 'padding-left': '0', 'overflow-y': 'hidden' });
                    } else {
                        $('.campo_imgs').css({ 'padding-left': `${CssAtual['padding-left']}`, 'overflow-y': `${CssAtual['overflow-y']}` });
                    }
                })
    
                // Função para lider com o botão 'Emotes de inscrito'.
                $('#twitchBtn').click(function () {
                    $('#twitchEmotes').css('display', 'inline');
                })
    
                // Requisições para a API do Bttv quando o botão 'Emotes Bttv' é clicado.
                $('#bttvBtn').click(function () {
                    if (bttvEmotes == 'EXEC CODIGO') {
                        const req = new req_bttv_Api()
                        req.emotesInfo(usuarioID)
                    } else {
                        document.querySelector("#bttvEmotes").style.display = 'inline';
                    }
                })
    
                document.querySelector('#seteTvBtn').addEventListener('click', () => {
                    document.querySelector('.carrosel_itens').style.visibility = 'visible'
                    document.querySelectorAll('.espaco_carrosel_seteTv li').forEach((li, index) => {
                        li.classList.remove('esconder_li_direita')
                        li.classList.remove('mostrar_li_direita')
                        li.classList.remove('esconder_li_esqrd')
                        li.classList.remove('mostrar_li_esqrd')
                    })
                    if (seteTvEmotes == 'EXEC CODIGO') {
                        const req = new req_7TV_Api()
                        req.emoteSetInfo(usuario)
                    } else if (seteTvEmotes == '') {
                        document.querySelector('#seteTvEmotes').style.display = 'flex';
                    } else {
                        document.querySelector('#seteTvEmotes').style.display = 'inline';
                    }
                })
    
    
    
                // Requições efetuadas para o API do FFZ ao clicar no botão 'FrankerFZ Emotes'.
                $('#ffzBtn').click(function () {
                    if (ffzEmotes == 'EXEC CODIGO') {
                        const req = new req_ffz_Api()
                        req.emotesInfo(usuarioID)
                    } else {
                        document.querySelector("#ffzEmotes").style.display = 'inline';
                    }
                })
    
                $('#offlineBtn').click(function () {
                    $('#offIMG').css('display', 'inline');
                })
    
                $('#formSeguindo').submit(function (e) {
                    e.preventDefault()
                    if (usuarioEsqrd != $('#usuarioEsqrd').val()) {
                        $('#spanItem').children().remove()
                        usuarioEsqrd = $('#usuarioEsqrd').val()
                        twitchRequests(`users?login=${usuarioEsqrd}`, 'GET', headers).then(info => {
                            usuarioEsqrdID = info['data'][0]['id']
                            usuarioEsqrdIMG = info['data'][0]['profile_image_url']
                            twitchRequests(`users/follows?from_id=${usuarioEsqrdID}&to_id=${usuarioID}`, 'GET', headers).then(info => {
                                if (info['data'].length >= 1) {
                                    $('#respSeguindo').text(`${usuarioEsqrd} está seguindo ${usuario}!`)
                                    $('#usuarioEsqrdIMG').attr({ 'src': `${usuarioEsqrdIMG}` })
                                    $('#usuarioEsqrdIMG').css({ 'content': 'normal', 'background-color': 'transparent' })
                                    $('#resultSeguindo').attr({ 'src': 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23fff" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/></svg>' })
                                    $('#resultSeguindo').css('content', 'normal')
                                } else {
    
                                    $('#respSeguindo').text(`${usuarioEsqrd} não está seguindo ${usuario}`)
                                    $('#usuarioEsqrdIMG').css({ 'content': 'normal', 'background-color': 'transparent' })
                                    $('#usuarioEsqrdIMG').attr({ 'src': `${usuarioEsqrdIMG}` })
                                    $('#resultSeguindo').attr({ 'src': 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23fff" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/></svg>' })
                                    $('#resultSeguindo').css('content', 'normal')
                                }
                            }).catch(erro => {
                                console.log(erro)
                            })
                        }).catch(erro => {
                            console.log(erro)
                        })
                    }
                })
            })
        })
            .catch(erro => console.log('Erro: ', erro))
    }
    $('#formBuscaPagUsuario').on('submit', (e) => {
        e.preventDefault()
        $('#twitchEmotes').children().remove()
        $('#bttvEmotes').children().remove()
        $('#seteTvEmotes').children().remove()
        $('#ffzEmotes').children().remove()
        $('#offIMG').children().remove()
        allInfo($('#buscarCanal').val())
        window.location.pathname = `${document.querySelector('#buscarCanal').value}`
    })
    
    $(document).ready(() => {
        allInfo(usuarioPath)
    })
    
}).catch(erro => console.log('Erro na solicitação', erro))

document.querySelector('.nav_div').addEventListener('click', () => {
    document.querySelector('.navbar_links').style.display = 'none';
})

function navListaAlternar() {
    document.addEventListener('click', (itemClicado) => {
        if (window.innerWidth <= 920) {
            if (itemClicado.target['id'] == 'navbarLista') {
                if (document.querySelector('.navbar_links').style.display == 'flex') {
                    document.querySelector('.navbar_links').style.display = 'none';
                } else {
                    document.querySelector('.navbar_links').style.display = 'flex';
                    document.querySelectorAll('.href_li').forEach((li) => {
                        li.style.visibility = 'visible'
                    })
                }
            } else {
                if (!['followingAnchor', 'twitchAnchor', 'bttvAnchor', 'ffzAnchor', 'offlineAnchor'].includes(itemClicado.target['id'])) {
                    document.querySelector('.navbar_links').style.display = 'none';
                } else {
                    document.querySelector('.navbar_links').style.display = 'flex';
                }
            }
        }

    })
}


let widthMatch920px = window.matchMedia("(max-width: 920px)")
widthMatch920px.addEventListener('change', (e) => {
    if (e.matches) {
        document.querySelector('.navbar_links').style.display = 'none';
        navListaAlternar()
    } else {
        document.querySelector('.navbar_links').style.display = 'none';
        navListaAlternar()
    }
})

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 920) {
        document.querySelector('.navbar_links').style.display = 'none'
        navListaAlternar()
    }
    if (window.innerWidth <= 450) {
        document.querySelector('#enviar').value = '';
    }
    document.querySelectorAll('.navbar_links li a').forEach((evento) => {
        evento.addEventListener('click', () => {
            let item_href = evento.getAttribute("href")
            document.querySelector(`${item_href}`).click()
        })
    })
})

let widthMatch450px = window.matchMedia("(max-width: 450px)")
widthMatch450px.addEventListener('change', (e) => {
    if (e.matches) {
        document.querySelector('#enviar').value = '';
    } else {
        document.querySelector('#enviar').value = 'Buscar';
    }
})
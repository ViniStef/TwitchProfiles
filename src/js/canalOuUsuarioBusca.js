const token = process.env.AUTH_TOKEN;
const clientID = process.env.CLIENT_ID;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Client-Id':  `${clientID}`
}
let usuario = ""
let nomeExibido = ""

function twitchRequests(linkParams,metodo,header) {
    return new Promise((resolver, rejeitar) => {
        fetch(`https://api.twitch.tv/helix/` + linkParams, {
        method: metodo,
        headers: header
    }).then(resposta => {
        return resposta.json()
    }).then(data => {
        resolver(data)
    }).catch(err => {
        rejeitar(err)
        console.log('Erro: ',err)
    })
    })
}

$('#buscaCanalOuUsuario').prop("disabled", true)

document.querySelector('#canalOuUsuario').addEventListener('keyup', () => {
        if ($('#canalOuUsuario').val().length == 0) {
            $('#buscaCanalOuUsuario').prop("disabled", true)
            $('#buscaCanalOuUsuario').css("cursor", 'not-allowed')
    }else {
            $('#buscaCanalOuUsuario').prop("disabled", false)
            $('#buscaCanalOuUsuario').css("cursor", 'pointer')
    }
})

const abaixoBusca = document.querySelector('.abaixo_busca')
const resultado =  document.querySelector('.result_busca')

document.addEventListener('click', (e) => {
    if (e.target['id'] == 'fecharBusca') {
        abaixoBusca.classList.remove('focused-opacity')
        resultado.classList.add('remove-animation')
        resultado.classList.remove('show-search')
    }else {
        if ($('.result_busca_itens').hasClass('searched')) {
            if (abaixoBusca.classList.contains('focused-opacity')) {
                resultado.classList.add('show-search')
                resultado.classList.remove('remove-animation')
            }else {
                resultado.classList.add('remove-animation')
                resultado.classList.remove('show-search')
            }
        }
    }

})

document.querySelector('#fecharBusca').addEventListener('click', () => {
    document.querySelector('.abaixo_busca').classList.remove('focused-opacity')
    resultado.classList.add('remove-animation')
    resultado.classList.remove('show-search')
})

$('#formBusca').submit(function(e) {
    e.preventDefault()
    $('.carregando').css('display', 'inline')
    $('.campo_result_busca_itens').css('display', 'none');
    $('.result_busca_itens').addClass('searched')
    console.log(usuario)
    if (usuario == $('#canalOuUsuario').val()) {
        return stop()
    }
    usuario = ""
    if (usuario != $('#canalOuUsuario').val()) {
        $('#resultExato').children().remove()  
        $('#canaisEncontrado').children().remove()  
        usuario = $('#canalOuUsuario').val()
        $('#canalOuUsuario').val("")

        let resultExato = ""
        // Usuario exato.
        twitchRequests(`users?login=${usuario}`,'GET',headers).then(data => {
            
            if (data['data'].length >= 1) {
                let nomeExibido = data['data'][0]['display_name']
                resultExato = nomeExibido
                let imgPerfil =  data['data'][0]['profile_image_url']
                let img = $('<img/>', {class: 'img_perfil',src:`${imgPerfil}`,alt: 'Imagem do perfil'})
                let nome = $(`<p title="${nomeExibido}">${nomeExibido}</p>`)
                let ver = $(`<a href="/${nomeExibido}" target="_blank">Ver</a>`)
                let div = $("<div/>", {class: 'canal_img_nome'})
                div.append(img,nome,ver)
                div.appendTo($('#resultExato'))
            }else {
                let div = $("<div/>", {class: 'canal_img_nome'})
                naoEncontrado = $('<h4>Nenhum Usuário Encontrado.</h4>')
                div.append(naoEncontrado)
                div.appendTo($('#resultExato'))
            }
            
        }).catch(err => {
            console.error(err)
        })
        twitchRequests(`search/channels?query=${usuario}`,'GET',headers).then(data => {
            let infos = data['data']
            if (infos.length > 1) {
                $('.carregando').css('display', 'inline')
                if ($('#resultExato').children().length > 0) {
                    $('.carregando').css('display', 'none')
                }
                for (let i = 0;i < infos.length;i++) {
                    if (i == infos.length - 1) {
                        img.on('load', () => {
                            $('.carregando').css('display', 'none');
                            $('.campo_result_busca_itens').css('display', 'inline');
                        })
                    }else {
                        let usuarioID = infos[i]['id']
                        let usuarioLogin = infos[i]['broadcaster_login']
                        let nomeExibido = infos[i]['display_name']
                        let imgPerfil = infos[i]["thumbnail_url"]
                        if (nomeExibido != resultExato) {
                            var img = $('<img/>', {class: 'img_perfil',src:`${imgPerfil}`,alt: 'Imagem do perfil'})
                            let nome = $(`<p title="${nomeExibido}">${nomeExibido}</p>`)
                            let ver = $(`<a href="/${usuarioLogin}" target="_blank">Ver</a>`)
                            let div = $("<div/>", {class: 'canal_img_nome'})
                            div.append(img,nome,ver)
                            div.appendTo($('#canaisEncontrado'))
                        }    
                    }
                    
            }    
            }else {
                if ($('#resultExato').children().length > 0) {
                    $('.carregando').css('display', 'none')
                    let div = $("<div/>", {class: 'canal_img_nome'})
                    naoEncontrado = $('<h4>Nenhum Outro Resultado Encontrado.</h4>')
                    $('.campo_result_busca_itens').css('display', 'inline');
                    div.append(naoEncontrado)
                    div.appendTo($('#canaisEncontrado'))
                }
                
            }

        })
    }
})

document.querySelector('#infoLink').addEventListener('click', () => {
    document.querySelector('#infoTxt').focus()
})

document.querySelector('#bttvLink').addEventListener('click', () => {
    document.querySelector('#bttv').focus()
})

document.querySelector('#ffzLink').addEventListener('click', () => {
    document.querySelector('#ffz').focus()
})

document.querySelector('#twitchLink').addEventListener('click', () => {
    document.querySelector('#twitch').focus()
})

document.querySelector('.navbar_div').addEventListener('click', () => {
    document.querySelector('.navbar_links').style.display = 'none';
})

function navListaAlternar() {
    document.addEventListener('click', (itemClick) => {
        if (window.innerWidth <= 800) {
            if (itemClick.target['id'] == 'navbarLista') {
                if (document.querySelector('.navbar_links').style.display == 'flex') {
                    document.querySelector('.navbar_links').style.display = 'none';
                }else {
                    document.querySelector('.navbar_links').style.display = 'flex';
                    document.querySelectorAll('.navbar_links li').forEach((li) => {
                        li.style.visibility = 'visible'
                    }) 
                }
            }else {
                if (!['ffzLink','bttvLink','twitchLink','infoLink'].includes(itemClick.target['id'])) {
                document.querySelector('.navbar_links').style.display = 'none';
            }else {
                document.querySelector('.navbar_links').style.display = 'flex';
            }
        }
        
        }

    })
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 800) {
        document.querySelector('.navbar_links').style.display = 'none'
        navListaAlternar()
    }
})


let widthMatch800px = window.matchMedia("(max-width: 800px)")
widthMatch800px.addEventListener('change', (e) => {
    if (e.matches) {
        document.querySelector('.navbar_links').style.display = 'none';
        navListaAlternar()
    }else {
        document.querySelector('.navbar_links').style.display = 'flex';
        navListaAlternar()
    }
})

// Solução para o chrome rodar a pagina toda quando clicando em uma 'a' tag dentro de um 'iframe'.
document.querySelectorAll('iframe').forEach((iframe) => {
    iframe.addEventListener('click', () => {
        console.log(" ")
    })
})
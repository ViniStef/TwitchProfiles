let liItens = document.querySelectorAll('.espaco_carrosel_seteTv li')
let seteTvDivItens = document.querySelectorAll('#seteTvEmotes .emote_set_div')

// Botão Esquerdo
document.querySelector('#slideEsquerda').addEventListener('click', () => {
    let itemExibidoIndex = 0

    liItens.forEach((li, index) => {
        if (li.classList.contains('main_li')) {
            itemExibidoIndex = index
        }
    })


    if (itemExibidoIndex == 0) {
        seteTvDivItens[0].classList.remove('set_atual')
        seteTvDivItens[seteTvDivItens.length - 1].classList.add('set_atual')
        if (liItens[itemExibidoIndex].classList.contains('mostrar_li_direita')) {
            liItens[itemExibidoIndex].classList.remove('mostrar_li_direita')
        } else if (liItens[itemExibidoIndex].classList.contains('esconder_li_direita')) {
            liItens[itemExibidoIndex].classList.remove('esconder_li_direita')
        }
        liItens[0].classList.remove('mostrar_li_esqrd', 'main_li')
        liItens[0].classList.add('esconder_li_esqrd')
        liItens[liItens.length - 1].classList.remove('esconder_li_esqrd')
        liItens[liItens.length - 1].classList.remove('esconder_li_direita')
        liItens[liItens.length - 1].classList.add('mostrar_li_esqrd', 'main_li')
    } else {
        seteTvDivItens[itemExibidoIndex].classList.remove('set_atual')
        seteTvDivItens[itemExibidoIndex - 1].classList.add('set_atual')
        if (liItens[itemExibidoIndex].classList.contains('mostrar_li_direita')) {
            liItens[itemExibidoIndex].classList.remove('mostrar_li_direita')
        } else if (liItens[itemExibidoIndex].classList.contains('esconder_li_direita')) {
            liItens[itemExibidoIndex].classList.remove('esconder_li_direita')
        }
        liItens[itemExibidoIndex].classList.remove('mostrar_li_esqrd', 'main_li')
        liItens[itemExibidoIndex].classList.add('esconder_li_esqrd')
        liItens[itemExibidoIndex - 1].classList.remove('esconder_li_esqrd')
        liItens[itemExibidoIndex - 1].classList.remove('esconder_li_direita')
        liItens[itemExibidoIndex - 1].classList.add('mostrar_li_esqrd', 'main_li')
    }
})

// Botão Direito
document.querySelector('#slideDireita').addEventListener('click', () => {
    let itemExibido = document.querySelector('mostrar_li_direita')
    let itemExibidoIndex = 0
    liItens.forEach((li, index) => {
        if (li.classList.contains('main_li')) {
            itemExibidoIndex = index
        }
    })
    if (itemExibidoIndex == liItens.length - 1) {
        seteTvDivItens[itemExibidoIndex].classList.remove('set_atual')
        seteTvDivItens[0].classList.add('set_atual')
        if (liItens[itemExibidoIndex].classList.contains('mostrar_li_esqrd')) {
            liItens[itemExibidoIndex].classList.remove('mostrar_li_esqrd')
        } else if (liItens[itemExibidoIndex].classList.contains('esconder_li_esqrd')) {
            liItens[itemExibidoIndex].classList.remove('esconder_li_esqrd')
        }
        liItens[itemExibidoIndex].classList.remove('mostrar_li_direita', 'main_li')
        liItens[itemExibidoIndex].classList.add('esconder_li_direita')
        liItens[0].classList.remove('esconder_li_direita')
        liItens[0].classList.remove('esconder_li_esqrd')
        liItens[0].classList.add('mostrar_li_direita', 'main_li')
    } else {
        seteTvDivItens[itemExibidoIndex].classList.remove('set_atual')
        seteTvDivItens[itemExibidoIndex + 1].classList.add('set_atual')
        if (liItens[itemExibidoIndex].classList.contains('mostrar_li_esqrd')) {
            liItens[itemExibidoIndex].classList.remove('mostrar_li_esqrd')
        } else if (liItens[itemExibidoIndex].classList.contains('esconder_li_esqrd')) {
            liItens[itemExibidoIndex].classList.remove('esconder_li_esqrd')
        }
        liItens[itemExibidoIndex].classList.remove('mostrar_li_direita', 'main_li')
        liItens[itemExibidoIndex].classList.add('esconder_li_direita')
        liItens[itemExibidoIndex + 1].classList.remove('esconder_li_direita')
        liItens[itemExibidoIndex + 1].classList.remove('esconder_li_esqrd')
        liItens[itemExibidoIndex + 1].classList.add('mostrar_li_direita', 'main_li')
    }
})

seteTvDivItens.forEach((div, index) => {
    if (div.classList.contains('set_atual')) {
        div.style.display = 'inline';
        // div.style.display = 'none';
    } else {
        div.style.display = 'none'
    }
})
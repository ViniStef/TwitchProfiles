const abaixoBusca = document.querySelector('.abaixo_busca');
const resultado = document.querySelector('.result_busca');
const buscaInputs = document.querySelectorAll('input');
const buscando = document.querySelector('input[type="text"]');
const enviar = document.querySelector('input[type="submit"]');
const buscaTitulo = document.querySelector('#tituloBusca')

// Opacidade
for (let input of buscaInputs) {
    input.addEventListener('focusin', () => {
        abaixoBusca.classList.add('focused-opacity')
    })
}

document.querySelector('.form_div').addEventListener('click', () => {
    abaixoBusca.classList.remove('focused-opacity')
})

tituloBusca.addEventListener('click', () => {
    abaixoBusca.classList.remove('focused-opacity')
})

resultado.addEventListener('click', () => {
    abaixoBusca.classList.add('focused-opacity')
})

abaixoBusca.addEventListener('click', () => {
    abaixoBusca.classList.remove('focused-opacity')
})

document.querySelector('#fecharBusca').addEventListener('click', () => {
    resultado.classList.remove('show-search')
})

document.querySelector('#formBusca').addEventListener('submit', (e) => {
    console.log(document.querySelector('input[type="text"]').value)
    resultado.classList.add('show-search')
    if (window.getComputedStyle(resultado,null).display == 'none') {
        result.classList.add('search-animation')
    }
})


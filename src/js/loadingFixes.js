var contadorCarregados = 0;
var iframeContador = document.querySelectorAll('.carrosel_slide iframe').length
document.querySelectorAll('.carrosel_slide iframe').forEach((iframe) => {
    iframe.addEventListener('load', () => {
        contadorCarregados++;
        if (contadorCarregados == iframeContador) {
            document.querySelector('.espaco_carrosel').style.display = 'flex';
            document.querySelector('.carrosel_carregando').style.display = 'none';
            iframe.style.display = 'inline-block';
        }
        iframe.style.display = 'inline-block';
    })

})
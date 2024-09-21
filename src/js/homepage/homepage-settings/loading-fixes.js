export const handleLoading = () => {
    let contadorCarregados = 0;
    const iframes = document.querySelectorAll('.carousel__item iframe');
    let iframeContador = iframes.length;
    
    iframes.forEach((iframe) => {
        iframe.addEventListener('load', () => {
            contadorCarregados++;
            if (contadorCarregados == iframeContador) {
                document.querySelector('.carousel__list').style.display = 'flex';
                document.querySelector('.loading__carousel').style.display = 'none';
                console.log(document.querySelector('.loading__carousel'))
                iframe.style.display = 'inline-block';
            };
            iframe.style.display = 'inline-block';
        });
    });
};
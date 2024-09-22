export const handleIframe = () => {
    // Solução para o chrome rodar a pagina toda quando clicando em uma 'a' tag dentro de um 'iframe'.
    document.querySelectorAll('iframe').forEach((iframe) => {
        iframe.addEventListener('click', () => {
            console.log(" ");
        });
    });

    handleIframeRedirect();

    window.addEventListener('message', (event) => {
        if (event.origin !== 'https://https://twitchprofiles-2.onrender.com') return;
    
        const element = document.querySelector('.visit__user');
        if (!element) return;
    
        if (event.data === 'show') {
            element.style.visibility = 'visible';
        } else if (event.data === 'hide') {
            element.style.visibility = 'hidden';
        }
    });
};

const handleIframeRedirect = () => {
    const anchor = document.querySelector(".visit__user");
    const iframes = document.querySelectorAll(".iframe__item");
    const firstElement = iframes[0];

    anchor.addEventListener("click", () => {
        iframes.forEach((iframe) => {
            if (iframe == firstElement) {
                if (iframe.style.display =="inline-block" || iframe.style.cssText.startsWith("z-index: 999")) {
                    anchor.setAttribute("href", iframe.src);
                }
            } else if (iframe.style.cssText.startsWith("z-index: 999")) {
                anchor.setAttribute("href", iframe.src);
            } 
        })
    })
};
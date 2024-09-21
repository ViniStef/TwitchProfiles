export const handleInfoScreenSizes = () => {
    let itens_HtmlImg = ['#bttv__img', '#ffz__img', '#twitch__img'];

    window.addEventListener('resize', (e) => {
        let windowWidth = window.innerWidth;
    
        for (let i = 0; i < itens_HtmlImg.length; i++) {
            if (windowWidth <= 920) {
                document.querySelector(itens_HtmlImg[i]).classList.remove('fadein__animation');
                document.querySelector(itens_HtmlImg[i]).classList.add('fadein__right');
            } else {
                document.querySelector(itens_HtmlImg[i]).classList.remove('fadein__right');
                document.querySelector(itens_HtmlImg[i]).classList.add('fadein__animation');
            };
        };
    });
};
function detectar_visibilidade(itemHtml, funcao_auxiliar) {

    let calcular = (itemHtml, funcao_auxiliar) => {

        let item = document.querySelector(itemHtml);

        let item_topo_offset = item.offsetTop; //Altura desde o começo do arquivo até o começo do elemento.

        let item_inferior_offset = item.offsetHeight / 1.45 + item_topo_offset; //Altura desde o começo do arquivo até o começo do elemento somado com pouco mais da metade da altura do próprio elemento.

        let tela_topo_offset = window.scrollY; //Quantidade de scroll.
        let tela_inferior_offset = window.innerHeight + tela_topo_offset; //Altura da tela somado com a quantidade de scroll.

        if (tela_inferior_offset >= item.offsetHeight / .5 + item_topo_offset && tela_inferior_offset - (item.offsetHeight + item_topo_offset) < 900) {
            funcao_auxiliar(item);
            
        } else if (item_topo_offset > tela_topo_offset && tela_inferior_offset > item_inferior_offset) {
            funcao_auxiliar(item);
        } 
    }

    calcular(itemHtml, funcao_auxiliar)

    document.addEventListener('scroll', calcular.bind(null, itemHtml, funcao_auxiliar));
}

// let itens_Html = ['#bttv', '#ffz', '#seteTv', '#twitch']
let itens_Html = ['#bttv', '#ffz', '#twitch']
// let itens_HtmlImg = ['#bttvImg', '#ffzImg', '#seteTvImg', '#twitchImg']
let itens_HtmlImg = ['#bttvImg', '#ffzImg', '#twitchImg']

window.addEventListener('resize', (e) => {
    let windowWidth = window.innerWidth;

    for (let i = 0; i < itens_HtmlImg.length; i++) {
        if (windowWidth <= 920) {
            document.querySelector(itens_HtmlImg[i]).classList.remove('animacao_fadein');
            document.querySelector(itens_HtmlImg[i]).classList.add('animacao_direita_fadein');
        } else {
            document.querySelector(itens_HtmlImg[i]).classList.remove('animacao_direita_fadein');
            document.querySelector(itens_HtmlImg[i]).classList.add('animacao_fadein');
        }
    }
})

for (let i = 0; i < itens_Html.length; i++) {
    detectar_visibilidade(itens_Html[i], (item) => {
        let windowWidth = window.innerWidth

        if (windowWidth <= 920) {
            document.querySelector(itens_HtmlImg[i]).classList.remove('animacao_fadein');
            document.querySelector(itens_HtmlImg[i]).style.visibility = 'visible';
            document.querySelector(itens_HtmlImg[i]).classList.add('animacao_direita_fadein');
        } else {
            document.querySelector(itens_HtmlImg[i]).style.visibility = 'visible';
            document.querySelector(itens_HtmlImg[i]).classList.remove('animacao_direita_fadein');
            document.querySelector(itens_HtmlImg[i]).classList.add('animacao_fadein');
        }
    })

}

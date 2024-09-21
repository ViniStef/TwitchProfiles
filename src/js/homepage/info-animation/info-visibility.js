export const detectVisibility = (itemHtml, callbackFunction) => {
    calculate(itemHtml, callbackFunction);
    document.addEventListener('scroll', calculate.bind(null, itemHtml, callbackFunction));
};

const calculate = (itemHtml, callbackFunction) => {
    let item = document.querySelector(itemHtml);
    let item_topo_offset = item.offsetTop; //Altura desde o começo do arquivo até o começo do elemento.
    let item_inferior_offset = item.offsetHeight / 1.45 + item_topo_offset; //Altura do começo arquivo até o começo do elemento somado com um pouco mais da metade da altura do elemento em si.
    let tela_topo_offset = window.scrollY; //Quantidade de scroll.
    let tela_inferior_offset = window.innerHeight + tela_topo_offset; //Altura da tela somado com a quantidade de scroll.

    if (tela_inferior_offset >= item.offsetHeight / .5 + item_topo_offset && tela_inferior_offset - (item.offsetHeight + item_topo_offset) < 900) {
        callbackFunction(item);
    } else if (item_topo_offset > tela_topo_offset && tela_inferior_offset > item_inferior_offset) {
        callbackFunction(item);
    };
};
$(document).ready(() => {
    let iniciar = 1;
    $('#slideEsquerda').click(() => {
        if (iniciar == 0) {
            $('#slide1').css({'z-index': '999','transform': 'translate(0%) scale(1)','min-width': '17rem','filter': 'opacity(1)'});
            $('#slide2').css({'z-index': '9','transform': 'translate(40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide3').css({'z-index': '9','transform': 'translate(-40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide4').css({'z-index': '1','transform': 'translate(-72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            $('#slide5').css({'z-index': '1','transform': 'translate(72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            iniciar = 1;
        }
        else if (iniciar == 1){
            $('#slide2').css({'z-index': '999','transform': 'translate(0%) scale(1)','min-width': '17rem','filter': 'opacity(1)'});
            $('#slide5').css({'z-index': '9','transform': 'translate(40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide1').css({'z-index': '9','transform': 'translate(-40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide3').css({'z-index': '1','transform': 'translate(-72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            $('#slide4').css({'z-index': '1','transform': 'translate(72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            iniciar = 2;
        }else if (iniciar == 2) {
            $('#slide5').css({'z-index': '999','transform': 'translate(0%) scale(1)','min-width': '17rem','filter': 'opacity(1)'});
            $('#slide4').css({'z-index': '9','transform': 'translate(40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide2').css({'z-index': '9','transform': 'translate(-40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide1').css({'z-index': '1','transform': 'translate(-72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            $('#slide3').css({'z-index': '1','transform': 'translate(72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            iniciar = 3;
        }else if (iniciar == 3) {
            $('#slide4').css({'z-index': '999','transform': 'translate(0%) scale(1)','min-width': '17rem','filter': 'opacity(1)'});
            $('#slide3').css({'z-index': '9','transform': 'translate(40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide5').css({'z-index': '9','transform': 'translate(-40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide2').css({'z-index': '1','transform': 'translate(-72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            $('#slide1').css({'z-index': '1','transform': 'translate(72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            iniciar = 4;
        }else if (iniciar == 4) {
            $('#slide3').css({'z-index': '999','transform': 'translate(0%) scale(1)','min-width': '17rem','filter': 'opacity(1)'});
            $('#slide1').css({'z-index': '9','transform': 'translate(40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide4').css({'z-index': '9','transform': 'translate(-40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide5').css({'z-index': '1','transform': 'translate(-72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            $('#slide2').css({'z-index': '1','transform': 'translate(72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            iniciar = 0;
        }
    })
    $('#slideDireita').click(() => {
        if (iniciar == 0) {
            $('#slide4').css({'z-index': '999','transform': 'translate(0%) scale(1)','min-width': '17rem','filter': 'opacity(1)'});
            $('#slide3').css({'z-index': '9','transform': 'translate(40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide5').css({'z-index': '9','transform': 'translate(-40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide2').css({'z-index': '1','transform': 'translate(-72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            $('#slide1').css({'z-index': '1','transform': 'translate(72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            iniciar = 4;
        }
        else if (iniciar == 4){
            $('#slide5').css({'z-index': '999','transform': 'translate(0%) scale(1)','min-width': '17rem','filter': 'opacity(1)'});
            $('#slide4').css({'z-index': '9','transform': 'translate(40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide2').css({'z-index': '9','transform': 'translate(-40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide1').css({'z-index': '1','transform': 'translate(-72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            $('#slide3').css({'z-index': '1','transform': 'translate(72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            iniciar = 3;
        }else if (iniciar == 3) {
            $('#slide2').css({'z-index': '999','transform': 'translate(0%) scale(1)','min-width': '17rem','filter': 'opacity(1)'});
            $('#slide5').css({'z-index': '9','transform': 'translate(40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide1').css({'z-index': '9','transform': 'translate(-40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide3').css({'z-index': '1','transform': 'translate(-72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            $('#slide4').css({'z-index': '1','transform': 'translate(72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            iniciar = 2;
        }else if (iniciar == 2) {
            $('#slide1').css({'z-index': '999','transform': 'translate(0%) scale(1)','min-width': '17rem','filter': 'opacity(1)'});
            $('#slide2').css({'z-index': '9','transform': 'translate(40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide3').css({'z-index': '9','transform': 'translate(-40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide4').css({'z-index': '1','transform': 'translate(-72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            $('#slide5').css({'z-index': '1','transform': 'translate(72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            iniciar = 1;
        }else if (iniciar == 1) {
            $('#slide3').css({'z-index': '999','transform': 'translate(0%) scale(1)','min-width': '17rem','filter': 'opacity(1)'});
            $('#slide1').css({'z-index': '9','transform': 'translate(40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide4').css({'z-index': '9','transform': 'translate(-40%) scale(.7)','min-width': '0','filter': 'brightness(50%)'});
            $('#slide5').css({'z-index': '1','transform': 'translate(-72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            $('#slide2').css({'z-index': '1','transform': 'translate(72%) scale(.5)','min-width': '0','filter': 'brightness(20%)'});
            iniciar = 0;
        }
    })
})
export const profileCarousel = () => {
    const carousel = {
        initial: 0,
        slideLeft() {
            document.querySelector("#slide__left").addEventListener("click", () => {
                
                this.moveLeft();
            })
        },
        slideRight() {
            document.querySelector("#slide__right").addEventListener("click", () => {
                
                this.moveRight();
            })
        },
        moveLeft() {
            switch (this.initial) {
                case 0:
                    this.setSlideStyles(2, 5, 1, 3, 4);
                    this.initial = 1;
                    break;
                case 1:
                    this.setSlideStyles(5, 4, 2, 1, 3);
                    this.initial = 2;
                    break;
                case 2:
                    this.setSlideStyles(4, 3, 5, 2, 1);
                    this.initial = 3;
                    break;
                case 3:
                    this.setSlideStyles(3, 1, 4, 5, 2);
                    this.initial = 4;
                    break;
                case 4:
                    this.setSlideStyles(1, 2, 3, 4, 5);
                    this.initial = 0;
                    break;
            }
        },
        moveRight() {
            switch (this.initial) {
                case 0:
                    this.setSlideStyles(3, 1, 4, 5, 2);
                    this.initial = 4;
                    break;
                case 4:
                    this.setSlideStyles(4, 3, 5, 2, 1);
                    this.initial = 3;
                    break;
                case 3:
                    this.setSlideStyles(5, 4, 2, 1, 3);
                    this.initial = 2;
                    break;
                case 2:
                    this.setSlideStyles(2, 5, 1, 3, 4);
                    this.initial = 1;
                    break;
                case 1:
                    this.setSlideStyles(1, 2, 3, 4, 5);
                    this.initial = 0;
                    break;
            }
        },
        setSlideStyles(slide1, slide2, slide3, slide4, slide5) {
            document.querySelector(`#slide__${slide1}`).style.cssText = 'z-index: 999; transform: translate(0%) scale(1); min-width: 17rem; filter: opacity(1)';
            document.querySelector(`#slide__${slide2}`).style.cssText = 'z-index: 9; transform: translate(40%) scale(.7); min-width: 0; filter: brightness(50%)';
            document.querySelector(`#slide__${slide3}`).style.cssText = 'z-index: 9; transform: translate(-40%) scale(.7); min-width: 0; filter: brightness(50%)';
            document.querySelector(`#slide__${slide4}`).style.cssText = 'z-index: 1; transform: translate(-72%) scale(.5); min-width: 0; filter: brightness(20%)';
            document.querySelector(`#slide__${slide5}`).style.cssText = 'z-index: 1; transform: translate(72%) scale(.5); min-width: 0; filter: brightness(20%)';
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        carousel.slideLeft();
        carousel.slideRight();
    });
};


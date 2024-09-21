export const iframeRedirect = () => {
    const iframes = document.querySelectorAll(".iframe__item");
    const firstElement = iframes[0];

    iframes.forEach((iframe) => {
        const element = iframe.contentWindow.document.querySelector(".visit__user");

        iframe.addEventListener("mouseover", () => {
            if (iframe == firstElement) {
                if (iframe.style.display =="inline-block" || iframe.style.cssText.startsWith("z-index: 999")) {
                    element.style.visibility = "visible";
                }
            } else if (iframe.style.cssText.startsWith("z-index: 999")) {
                element.style.visibility = "visible";
            } 
        })
        iframe.addEventListener("mouseleave", () => {
            element.style.visibility = "hidden";
        })
    })
};

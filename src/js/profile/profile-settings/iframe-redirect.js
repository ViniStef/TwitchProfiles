export const iframeRedirect = () => {
    const iframes = document.querySelectorAll(".iframe__item");
    const firstElement = iframes[0];

    iframes.forEach((iframe) => {
        const element = iframe.contentWindow?.document.querySelector(".visit__user");
        
        if (!element) return;

        iframe.addEventListener("mouseover", () => {
            const computedStyle = window.getComputedStyle(iframe);

            if (iframe == firstElement) {
                if (computedStyle.display == "inline-block" || computedStyle.zIndex == "999" || iframe.style.display == "inline-block") {
                    element.style.visibility = "visible";
                }
            } else if (computedStyle.zIndex == "999") {
                element.style.visibility = "visible";
            }
        });

        iframe.addEventListener("mouseleave", () => {
            element.style.visibility = "hidden";
        });
    });
};
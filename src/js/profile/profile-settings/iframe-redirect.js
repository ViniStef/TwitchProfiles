export const iframeRedirect = () => {
    const iframes = document.querySelectorAll(".iframe__item");
    const firstElement = iframes[0];

    iframes.forEach((iframe, index) => {
        iframe.addEventListener("load", () => {
            const element = iframe.contentWindow.document.querySelector(".visit__user");

            if (!element) {
                return; 
            }

            iframe.addEventListener("mouseover", () => {
                

                if (iframe === firstElement) {
                    if (iframe.style.display === "inline-block" || iframe.style.zIndex === "999") {
                        element.style.visibility = "visible";
                    } else {
                        console.log("Conditions not met for the first iframe.");
                    }
                } else if (iframe.style.zIndex === "999") {
                    element.style.visibility = "visible";
                }
            });

            iframe.addEventListener("mouseleave", () => {
                element.style.visibility = "hidden";
            });
        });
    });
};
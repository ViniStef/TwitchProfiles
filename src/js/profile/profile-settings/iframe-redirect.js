export const iframeRedirect = () => {
    const iframes = document.querySelectorAll(".iframe__item");
    const firstElement = iframes[0];

    iframes.forEach((iframe, index) => {
        iframe.addEventListener("load", () => {
            const element = iframe.contentWindow.document.querySelector(".visit__user");

            if (!element) {
                console.log(`Iframe ${index} does not have .visit__user`);
                return;  // Exit if the element doesnt exist
            }

            iframe.addEventListener("mouseover", () => {
                const computedStyle = window.getComputedStyle(iframe);

                if (iframe === firstElement) {
                    console.log(`First iframe detected, styles: ${computedStyle.display}, z-index: ${computedStyle.zIndex}`);
                    if (computedStyle.display === "inline-block" || computedStyle.zIndex === "999") {
                        element.style.visibility = "visible";
                    } else {
                        console.log("Conditions not met for the first iframe.");
                    }
                } else if (computedStyle.zIndex === "999") {
                    element.style.visibility = "visible";
                }
            });

            iframe.addEventListener("mouseleave", () => {
                element.style.visibility = "hidden";
            });
        });
    });
};
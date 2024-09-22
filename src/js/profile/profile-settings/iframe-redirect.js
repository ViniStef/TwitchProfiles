export const iframeRedirect = () => {
    const iframes = document.querySelectorAll(".iframe__item");
    const firstIframe = iframes[0];

    iframes.forEach((iframe) => {
        iframe.addEventListener("mouseover", () => {
            let message = 'hide';

            const computedStyle = window.getComputedStyle(iframe);
            if (iframe === firstIframe) {
                if (computedStyle.display === "inline-block" || computedStyle.zIndex === "999") {
                    message = "show";
                }
            } else if (computedStyle.zIndex === "999") {
                message = "show";
            }

            iframe.contentWindow.postMessage(message, 'https://twitchprofiles-2.onrender.com');
        });

        iframe.addEventListener("mouseleave", () => {
            iframe.contentWindow.postMessage('hide', 'https://twitchprofiles-2.onrender.com');
        });
    });
};
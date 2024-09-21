import { iframeRedirect } from "../profile/profile-settings/iframe-redirect.js";
import { handleIframe } from "./homepage-settings/iframes-fixes.js";
import { handleLoading } from "./homepage-settings/loading-fixes.js";
import { handleLinks } from "./homepage-settings/navigation-list.js";
import { handleNavScreenSizes } from "./homepage-settings/screen-sizes.js";
import { handleInfoAnimation } from "./info-animation/handle-animation.js";
import { handleInfoScreenSizes } from "./info-animation/screen-sizes.js";
import { profileCarousel } from "./profile-carousel/main-carousel.js";
import { getExactUser } from "./user-search/exact-user.js";
import { disableButton, handleFormAnimation, handleSearchAnimation, handleSearchField, handleSearchInput } from "./user-search/search-animation.js";
import { handleSearch } from "./user-search/search-submit.js";
import { getSimilarUsers } from "./user-search/similar-users.js";

export const runAllHomepage = async () => {
    profileCarousel();
    handleSearchInput();
    disableButton();
    handleSearchAnimation();
    handleSearchField();
    handleFormAnimation();
    handleIframe();
    handleLinks();
    handleNavScreenSizes();
    handleInfoScreenSizes();
    handleInfoAnimation();
    handleLoading();
    iframeRedirect()

    document.querySelector('#search__form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = await handleSearch();
        const exact_user = await getExactUser(user);
        await getSimilarUsers(user, exact_user);
    })
};

await runAllHomepage();
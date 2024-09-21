import { getAndDisplayBttvEmotes } from "./bttv-data/bttv-settings.js";
import { getAndDisplayFfzEmotes } from "./ffz-data/ffz-settings.js";
import { btnFocus } from "./profile-settings/btn-focus.js";
import { getNewUserFromProfile } from "./profile-settings/new-user.js";
import { handleDropdownList, modifyNavbarLinks } from "./profile-settings/profile-dropdown.js";
import { handleScreenSizes } from "./profile-settings/screen-sizes.js";
import { getSubBadges, handleBadges } from "./twitch-data/sub-badges.js";
import { fetchTwitchUserData } from "./twitch-data/user-basic.js"
import { getChannelEmotes } from "./twitch-data/user-emote.js";
import { getExtraUserInfo } from "./twitch-data/user-extra.js";
import { getAndUpdateUserTeam } from "./twitch-data/user-team.js";

const runAllProfile = async () => {
    const usuarioPath = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
    document.title = usuarioPath;

    const basicData = await fetchTwitchUserData(usuarioPath);
    
    const { id, login } = basicData;

    btnFocus();
    
    await getExtraUserInfo(login);
    await getChannelEmotes(id);
    await getAndUpdateUserTeam(id);
    await getAndDisplayBttvEmotes(id);
    await getAndDisplayFfzEmotes(id);
    const badges = await getSubBadges(id);
    handleBadges(badges);

    getNewUserFromProfile(fetchTwitchUserData);
    modifyNavbarLinks();
    handleDropdownList();
    handleScreenSizes();

};

await runAllProfile();
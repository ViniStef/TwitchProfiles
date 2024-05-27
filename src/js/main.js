import { router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    router();
    window.addEventListener('popstate', router);
});

export default defineNuxtRouteMiddleware(async (to, from) => {

    const authStore = useAuthStore();

    if (authStore.isAuthenticated) {
        if (to.path === '/login') return navigateTo('/subjects');
        return;
    }
    else {
        if (to.path === '/login') return;
        return navigateTo('/login');
    }

});
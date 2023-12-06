import { createFetch } from '@vueuse/core'

export const useFetcher = createFetch({
    baseUrl: 'https://fbmanage.dk/api',
    combination: 'overwrite',
    options: {
        beforeFetch: (options) => {
            const authStore = useAuthStore();

            if (authStore.isAuthenticated) {
                options.options.headers = {
                    Authorization: `Bearer ${authStore.token}`
                };
            };
        },
        onFetchError: (error) => {
            if (error.response.status === 401) {
                const authStore = useAuthStore();
                authStore.logout();
                navigateTo('/login');
            }
        }
    },
    fetchOptions: {
        mode: 'cors',
    }
});
import { StorageSerializers } from '@vueuse/core'
import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'authStore',
    state: () => ({
        token: useLocalStorage('token', null, { serializer: StorageSerializers.string }),
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        setToken(token) {
            this.token = token;
        },
        logout() {
            this.token = null;
        },
    },
});
<template>
    <div class="m4 flex justify-center items-center">
        <div class="max-w-lg min-w-md bg-#fafbf9 p-10 rounded-2 shadow-lg">
            <NH1 class="text-center">Kriminalforsognen</NH1>
            <NForm class="flex-col flex gap-2">
                <NInput v-model:value="username" @keydown.enter="login" type="text" placeholder="Username" />
                <NInput v-model:value="password" @keydown.enter="login" type="password" placeholder="Password" />
                <NButton @click="login" :loading="loginReturn?.isFetching" type="primary">Login</NButton>
                <NCollapseTransition :show="loginReturn?.error != undefined">
                    <div v-if="loginReturn?.error != undefined" class="text-red-500">
                        {{ loginReturn?.error }}
                    </div>
                </NCollapseTransition>
            </NForm>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    NButton,
    NInput,
    NH1,
    NForm,
    NCollapseTransition
} from 'naive-ui'
import { type UseFetchReturn } from '@vueuse/core'
import { authLogin } from '~/api/auth'

definePageMeta({
    layout: 'login-layout'
});

const authStore = useAuthStore();

const username = ref<string>('');
const password = ref<string>('');
const loginReturn = ref<UseFetchReturn<any>>();

const login = () => {
    if (username.value.trim() == '' || password.value.trim() == '') {
        return;
    }
    loginReturn.value = authLogin(username.value.trim(), password.value.trim());
    loginReturn.value.onFetchResponse((response) => {
        authStore.setToken(loginReturn.value.data.token);
        navigateTo('/subjects');
    })
    loginReturn.value.onFetchError((error) => {
        console.log(error);
    })
}

</script>
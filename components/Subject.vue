<template>
    <div role="button" class="rounded-4 overflow-hidden cursor-pointer transition shadow-xl hover:shadow-2xl" @click="onClick">
        <div class="flex h-50 w-50 p2 transition hover:scale-125% active:scale-110% items-center justify-center bg-center bg-cover text-2xl text-white text-shadow" :style="{backgroundImage: image}">
            <h1 class="bg-#0008 rounded p1">
                <slot>
                    {{ zSubject.name }}
                </slot>
            </h1>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { ZSubject } from '~/api/types';

const image = 'url(/_nuxt/assets/image/math_image.jpg)';

const props = defineProps<{
    zSubject: ZSubject;
}>();

const onClick = () => {
    navigateTo(`/subjects/${props.zSubject.id}`);
}

</script>
<style scoped>
</style>
<template>
    <div role="button" class="rounded-4 overflow-hidden cursor-pointer transition shadow-xl hover:shadow-2xl bg-red" @click="onClick">
        <div class="flex h-40 w-60 p2 transition hover:scale-125% active:scale-110% text-center items-center justify-center bg-center bg-cover text-2xl text-white text-shadow" :style="{backgroundImage: image}">
            <h1 class="bg-#0008 rounded p1">
                <slot>
                    {{ props.zModule.name }}
                </slot>
            </h1>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { type ZModule } from '~/api/types'

const image = 'url(/_nuxt/assets/image/math.jpg)';

const route = useRoute();

const props = defineProps<{
    zModule: ZModule;
}>();

const onClick = () => {
    navigateTo(`/subjects/${route.params.subjectId}/${props.zModule.id}`);
}



</script>
<style scoped>
</style>
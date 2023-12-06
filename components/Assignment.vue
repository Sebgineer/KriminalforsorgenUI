<template>
    <div role="button" class="rounded-4 my-2 overflow-hidden cursor-pointer transition shadow bg-gray" @click="onClick">
        <div class="w-full p1 transition text-center items-center text-base text-white text-shadow">
            <p class="rounded p1">
                <slot>
                    {{ props.zAssignment.name }}
                </slot>
            </p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { type ZAssignment } from '~/api/types'

const route = useRoute();

const props = defineProps<{
    zAssignment: ZAssignment;
}>();

const onClick = () => {
    navigateTo(`/subjects/${route.params.subjectId}/${route.params.moduleId}/${props.zAssignment.id}`);
}

</script>
<style scoped>
</style>
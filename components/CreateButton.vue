<template>
   <div @click="onClick" class="flex gap-1 w-fit cursor-pointer bg-#eeb56f hover:bg-#ECAA5B active:bg-#F0BD7F  p-3 rounded-full shadow-md hover:shadow-lg transition" role="button">
        <slot name="icon">
        </slot>
        <slot>
            Create
        </slot>
   </div>
</template>
<script lang="ts" setup>

const emit = defineEmits(['click']);

const onClick = () => {
    emit('click');
}

</script>
<style>

</style>
<template>
    <div class="BG min-h-100vh">
        <div class="absolute w-full block top-1/2 translate-y--1/2">
            <slot>
            </slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
</script>
<style>
.BG {
    background-image: url('~/assets/image/school-pattern.jpg');
    background-size: 22rem;
    background-position: center;
    background-repeat: repeat;
}
</style>
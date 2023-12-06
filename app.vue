<template>
  <div class="min-h-100vh">
    <NConfigProvider :theme-overrides="theme">
      <NuxtLayout>
        <NuxtPage></NuxtPage>
      </NuxtLayout>
    </NConfigProvider>
  </div>
</template>
<script setup lang="ts">
// Supports weights 100-900
import '@fontsource-variable/outfit';
import { type GlobalThemeOverrides } from 'naive-ui'

import { NConfigProvider } from 'naive-ui'

const theme = ref<GlobalThemeOverrides>({
  common: {
    fontWeightStrong: '600',
    primaryColor: "#eeb56f",
    primaryColorHover: "#eeb56f",
  },
  Button: {
    colorPrimary: '#eeb56f',
    colorPrimaryHover: '#ECAA5B',
    colorPressedPrimary: '#F0BD7F',
    borderPressedPrimary: '#eeb56f',
    borderPrimary: '#eeb56f',
  },
});

</script>

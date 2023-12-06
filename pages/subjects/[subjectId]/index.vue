<template>
   <section v-if="!isFetching">
      <div class="flex items-center gap-2 mb-4 text-3xl">
         <NuxtLink to="/subjects" class="decoration-none hover:bg-#0002 rounded-2 p1 transition">
            <span class="text-black">
               Subjects
            </span>
         </NuxtLink>
         <h1>
            - {{ subjectId }}
         </h1>
         <NPopconfirm :show-icon="false" @positive-click="popDeleteSubject"
            :positive-button-props="{ loading: deleteSubjectReturn?.isFetching }">
            <template #trigger>
               <NIcon class="transition hover:bg-#0002 p1 rounded-2">
                  <Trash />
               </NIcon>
            </template>
            Do you want to delete this subject?
         </NPopconfirm>
      </div>
      <div class="flex flex-wrap w-full gap-4">
         <Module v-for="modul in modules" :zModule="modul"></Module>
      </div>
      <CreateButton class="fixed right-0 bottom-0 mb-10 mr-6" @click="openCreateModuleModal">
         <template #icon>
            <NIcon>
               <Add />
            </NIcon>
         </template>
         <template #default>
            Create Module
         </template>
      </CreateButton>
      <NModal v-model:show="createModuleModalOpen" close-on-esc>
         <NCard class="w-fit">
            <NForm class="flex-col flex gap-2">
               <h1>
                  New Module
               </h1>
               <NCollapseTransition :show="createModuleReturn?.error != undefined">
                  <div v-if="createModuleReturn?.error" class="text-red-500">
                     {{ createModuleReturn?.error }}
                  </div>
               </NCollapseTransition>
               <NInput v-model:value="newModuleName" placeholder="Module Name" />
               <NButton :disabled="newModuleName.trim() == ''" @click="onModalClick" type="primary">Create</NButton>
               <NButton @click="closeCreateModuleModal" type="error">Close</NButton>
            </NForm>
         </NCard>
      </NModal>
   </section>
   <section v-else>
      <div class="mb-4">
         <NSkeleton class="h-10 w-full rounded-4"></NSkeleton>
      </div>
      <div class="flex flex-wrap gap-4">
         <NSkeleton class="h-40 w-60 p-4 rounded-4"></NSkeleton>
         <NSkeleton class="h-40 w-60 p-4 rounded-4"></NSkeleton>
         <NSkeleton class="h-40 w-60 p-4 rounded-4"></NSkeleton>
      </div>
   </section>
</template>
<script lang="ts" setup>
import { Add, Trash } from '@vicons/ionicons5'
import { NIcon, NForm, NModal, NCard, NInput, NButton, NPopconfirm, NSkeleton, NCollapseTransition } from 'naive-ui'
import { getModuleList, createModule } from '~/api/module';
import { deleteSubject } from '~/api/subject';
import type { ZModule, ZSubject } from '~/api/types'
import type { UseFetchReturn } from '@vueuse/core'

const route = useRoute();

const subjectId = route.params.subjectId as string;

const { isFetching, data: modules } = getModuleList(subjectId);

const deleteSubjectReturn = ref<UseFetchReturn<ZSubject>>();

const popDeleteSubject = () => {
   deleteSubjectReturn.value = deleteSubject(subjectId);
   deleteSubjectReturn.value.onFetchResponse((response) => {
      if (response.status == 200) {
         navigateTo('/subjects');
      }
   })
}

//#region Modal

const createModuleModalOpen = ref(false)
const newModuleName = ref('')
const createModuleReturn = ref<UseFetchReturn<ZModule>>();

const openCreateModuleModal = () => {
   createModuleModalOpen.value = true
}

const closeCreateModuleModal = () => {
   createModuleModalOpen.value = false
}

const onModalClick = () => {
   if (newModuleName.value.trim() == '') return
   createModuleReturn.value = createModule(subjectId, newModuleName.value);
   createModuleReturn.value.onFetchResponse(() => {
      modules.value?.push(createModuleReturn.value.data)
      newModuleName.value = ''
      closeCreateModuleModal()
   })
}

//#endregion

</script>
<style></style>
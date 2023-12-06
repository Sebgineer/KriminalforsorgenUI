<template>
   <section v-if="!isFetching">
      <h1 class="text-3xl mb-4">
         Subjects
      </h1>
      <div class="flex w-full flex-wrap gap-4">
         <Subject v-for="subject in subjects" :zSubject="subject"></Subject>
      </div>
      <CreateButton class="fixed right-0 bottom-0 mb-10 mr-6" @click="openCreateSubjectModal">
         <template #icon>
            <NIcon class="cursor-pointer">
               <Add />
            </NIcon>
         </template>
         <template #default>
            Create Subject
         </template>
      </CreateButton>
   </section>
   <section v-else>
      <div class="mb-4">
         <NSkeleton class="h-10 w-full rounded-4"></NSkeleton>
      </div>
      <div class="flex flex-wrap gap-4">
         <NSkeleton class="h-50 w-50 p-4 rounded-4"></NSkeleton>
         <NSkeleton class="h-50 w-50 p-4 rounded-4"></NSkeleton>
         <NSkeleton class="h-50 w-50 p-4 rounded-4"></NSkeleton>
      </div>
   </section>
   <NModal v-model:show="createSubjectModalOpen" close-on-esc>
      <NCard class="w-fit">
         <NForm class="flex-col flex gap-2">
            <h1>
               new Subject
            </h1>
            <NCollapseTransition :show="createSubjectReturn?.error != undefined">
               <div v-if="createSubjectReturn?.error" class="text-red-500">
                  {{ createSubjectReturn?.error }}
               </div>
            </NCollapseTransition>
            <NInput v-model:value="newSubjectName" placeholder="Subject Name" @keydown.enter="onModalClick"/>
            <NButton :disabled="newSubjectName.trim() == ''" @click="onModalClick" :loading="createSubjectReturn?.isFetching" type="primary">Create</NButton>
            <NButton @click="closeCreateSubjectModal" type="error">Close</NButton>
         </NForm>
      </NCard>
   </NModal>
</template>
<script lang="ts" setup>
import { NIcon, NModal, NCard, NForm, NButton, NInput, NSkeleton, NCollapseTransition } from 'naive-ui'
import { Add } from '@vicons/ionicons5'
import { type UseFetchReturn } from '@vueuse/core'
import type { ZSubject } from '~/api/types';
import { getSubjectList, createSubject } from '~/api/subject';

useEventBus('navTitle').emit('Subjects')

useHead({
   title: 'Subjects'
})

onUnmounted(() => {
   canAbort && abort()
})

//#region Subject

const { isFetching, data: subjects, canAbort, abort} = getSubjectList();

//#endregion

//#region Modal

const createSubjectModalOpen = ref(false)
const newSubjectName = ref('')
const createSubjectReturn = ref<UseFetchReturn<ZSubject>>();

const openCreateSubjectModal = () => {
   createSubjectModalOpen.value = true
}

const closeCreateSubjectModal = () => {
   createSubjectReturn.value.canAbort && createSubjectReturn.value.abort()
   newSubjectName.value = ''
   createSubjectModalOpen.value = false
}

const onModalClick = () => {
   if (newSubjectName.value.trim() == '') return
   createSubjectReturn.value = createSubject(newSubjectName.value)
   createSubjectReturn.value.onFetchResponse(()=> {
      subjects.value?.push(createSubjectReturn.value.data)
      newSubjectName.value = ''
      closeCreateSubjectModal()
   })
}

//#endregion

</script>
<style></style>
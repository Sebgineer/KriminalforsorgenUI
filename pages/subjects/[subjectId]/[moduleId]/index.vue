<template>
   <section v-if="!isFetching">
      <div class="flex items-center gap-2 mb-4 text-3xl">
         <NuxtLink :to="`/subjects/${subjectId}`" class="decoration-none hover:bg-#0002 rounded-2 p1 transition">
            <span class="text-black">
               Module
            </span>
         </NuxtLink>
         <h1>
            - {{ moduleId }}
         </h1>
         <NPopconfirm :show-icon="false" @positive-click="popDeleteModule" :positive-button-props="{ loading: deleteModuleReturn?.isFetching }">
            <template #trigger>
               <NIcon class="transition hover:bg-#0002 p1 rounded-2">
                  <Trash />
               </NIcon>
            </template>
            Do you want to delete this module?
         </NPopconfirm>
      </div>
      <div class="w-full gap-4">
         <Assignment v-for="assignment in assignments" :zAssignment="assignment"></Assignment>
      </div>
      <CreateButton class="fixed right-0 bottom-0 mb-10 mr-6" @click="openCreateAssignmentModal">
         <template #icon>
            <NIcon>
               <Add />
            </NIcon>
         </template>
         <template #default>
               Create Assignment
         </template>
      </CreateButton>
      <NModal v-model:show="createAssignmentModalOpen" close-on-esc>
         <NCard class="w-fit">
            <NForm class="flex-col flex gap-2">
               <h1>
                  New Assignment
               </h1>
               <NCollapseTransition :show="createAssignmentReturn?.error != undefined">
                  <div v-if="createAssignmentReturn?.error" class="text-red-500">
                     {{ createAssignmentReturn?.error }}
                  </div>
               </NCollapseTransition>
               <NInput v-model:value="newAssignmentName" placeholder="Assignment Name" />
               <NInput v-model:value="newAssignmentQuestion" placeholder="Assignment Question" />
               <NInput v-model:value="newAssignmentAnswer" placeholder="Assignment Answer" />
               <NSelect v-model:value="newAssignmentType" :options="[{ value: 'algebra', label: 'Algebra' }]" placeholder="Assignment Type" ></NSelect>
               <NButton :disabled="newAssignmentName.trim() == ''" @click="onModalClick" type="primary">Create</NButton>
               <NButton @click="closeCreateAssignmentModal" type="error">Close</NButton>
            </NForm>
         </NCard>
      </NModal>
   </section>
   <section v-else>
      <div class="mb-4">
         <NSkeleton class="h-10 w-full rounded-4"></NSkeleton>
      </div>
      <div class="flex flex-wrap gap-4">
         <NSkeleton class="h-40 w-full p-4 rounded-4"></NSkeleton>
         <NSkeleton class="h-40 w-full p-4 rounded-4"></NSkeleton>
         <NSkeleton class="h-40 w-full p-4 rounded-4"></NSkeleton>
      </div>
   </section>
</template>
<script lang="ts" setup>
import { NIcon, NPopconfirm, NSkeleton, NModal, NCard, NForm, NCollapseTransition, NInput, NButton, NSelect } from 'naive-ui'
import { Add, Trash } from '@vicons/ionicons5'
import { getAssignmentList, createAssignment } from '~/api/assignment';
import type { ZAssignment, ZSubject } from '~/api/types';
import { type UseFetchReturn } from '@vueuse/core';
import { deleteModule } from '~/api/module';

const route = useRoute();

const subjectId = route.params.subjectId as string;
const moduleId = route.params.moduleId as string;

const { isFetching, data: assignments } = getAssignmentList(subjectId, moduleId);

const deleteModuleReturn = ref<UseFetchReturn<ZSubject>>();

const popDeleteModule = () => {
   deleteModuleReturn.value = deleteModule(subjectId, moduleId);
   deleteModuleReturn.value.onFetchResponse((response) => {
      if (response.status == 200) {
         navigateTo(`/subjects/${subjectId}`);
      }
   })
}

//#region Modal

const createAssignmentModalOpen = ref(false)
const newAssignmentName = ref('')
const newAssignmentQuestion = ref('')
const newAssignmentAnswer = ref('')
const newAssignmentType = ref('algebra')
const createAssignmentReturn = ref<UseFetchReturn<ZAssignment>>();

const openCreateAssignmentModal = () => {
   createAssignmentModalOpen.value = true
}

const closeCreateAssignmentModal = () => {
   createAssignmentModalOpen.value = false
}

const onModalClick = () => {
   if (newAssignmentName.value.trim() == '') return
   createAssignmentReturn.value = createAssignment(subjectId, moduleId, { name: newAssignmentName.value, question: newAssignmentQuestion.value, answer: newAssignmentAnswer.value, type: newAssignmentType.value });
   createAssignmentReturn.value.onFetchResponse(() => {
      assignments.value?.push(createAssignmentReturn.value.data)
      newAssignmentName.value = ''
      closeCreateAssignmentModal()
   })
}

//#endregion

</script>
<style>

</style>
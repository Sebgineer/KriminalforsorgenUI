<template>
   <section v-if="!isFetching">
      <div class="flex items-center gap-2 mb-4 text-3xl">
         <NuxtLink :to="`/subjects/${subjectId}/${moduleId}`" class="decoration-none hover:bg-#0002 rounded-2 p1 transition">
            <span class="text-black">
               Assignment
            </span>
         </NuxtLink>
         <h1>
            - {{ assignment?.name }}
         </h1>
         <NPopconfirm :show-icon="false" @positive-click="popDeleteAssignment" :positive-button-props="{ loading: deleteAssignmentReturn?.isFetching }">
            <template #trigger>
               <NIcon class="transition hover:bg-#0002 p1 rounded-2">
                  <Trash />
               </NIcon>
            </template>
            Do you want to delete this assignment?
         </NPopconfirm>
      </div>
      <div>
         <h1 class="text-xl">Name</h1>
         <p>
            <span class="text-black">{{ assignment?.name }}</span>
         </p>
         <h1 class="mt-2 text-xl">Question:</h1>
         <p>
            <span class="text-black">{{ assignment?.question }}</span>
         </p>
         <h1 class="mt-2 text-xl">Answer:</h1>
         <p>
            <span class="text-black">{{ assignment?.answer }}</span>
         </p>
         <h1 class="mt-2 text-xl">Type:</h1>
         <p>
            <span class="text-black">{{ assignment?.type }}</span>
         </p>
      </div>
   </section>
   <section v-else>
      <div class="mb-4">
         <NSkeleton class="h-10 w-full rounded-4"></NSkeleton>
      </div>
      <div class="flex flex-wrap gap-4">
         <NSkeleton class="h-10 w-full p-4 rounded-4"></NSkeleton>
         <NSkeleton class="h-10 w-full p-4 rounded-4"></NSkeleton>
         <NSkeleton class="h-10 w-full p-4 rounded-4"></NSkeleton>
         <NSkeleton class="h-10 w-full p-4 rounded-4"></NSkeleton>
      </div>
   </section>
</template>
<script lang="ts" setup>
import { getAssignment, deleteAssignment } from '~/api/assignment';
import { NIcon, NPopconfirm } from 'naive-ui';
import { Trash } from '@vicons/ionicons5';
import type { ZAssignment } from '~/api/types';
import { type UseFetchReturn } from '@vueuse/core';

const route = useRoute();

const subjectId = route.params.subjectId;
const moduleId = route.params.moduleId;
const assignmentId = route.params.assignmentId;

const { isFetching, data: assignment } = getAssignment(subjectId, moduleId, assignmentId);

const deleteAssignmentReturn = ref<UseFetchReturn<ZAssignment>>();

const popDeleteAssignment = () => {
   deleteAssignmentReturn.value = deleteAssignment(subjectId, moduleId, assignmentId);
   deleteAssignmentReturn.value.onFetchResponse((response) => {
      if (response.status == 200) {
         navigateTo(`/subjects/${subjectId}/${moduleId}`);
      }
   })
}

</script>
<style>

</style>
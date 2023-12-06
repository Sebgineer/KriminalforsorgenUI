<template>
   <div class="relative grid-cols-[20rem_auto] max-w-100vw h-full min-h-100vh grid bg-#F5F5F5">
      <aside class="pl-4 pr3 bg-#eeb56f h-full max-h-100vh text-2xl text-shadow-md shadow-lg">
         <div class="pt-2">
            Kriminalforsognen
         </div>
         <div class="hover:bg-#0001 transition rounded-2">
            <NuxtLink to="/subjects" class="decoration-none text-black">
               <span class="">
                  Subjects
               </span>
            </NuxtLink>
         </div>
         <div class="absolute bottom-0 mb-4 hover:bg-#0001 transition rounded-2">
            <span @click="logout" class="cursor-pointer" >
               Logout
            </span>  
         </div>
      </aside>
      <section class="bg-#eeb56f">
         <section class="relative flex flex-col m1 overflow-hidden bg-#F5F5F5 rounded-3 h-full max-h-[calc(100vh-0.5rem)] shadow-md shadow-inset">
            <main class="m-4 overflow-auto">
               <slot>
               </slot>
            </main>
         </section>
      </section>
   </div>
</template>
<script lang="ts" setup>

const authStore = useAuthStore();

const logout = () => {
   authStore.logout();
    navigateTo('/login');
}

</script>
<style></style>
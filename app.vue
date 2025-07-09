<template>
	<div>
    <template v-if="clientRender">
      <client-only>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </client-only>
    </template>

    <template v-else>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </template>
    
    <TheToast />
    <AppModal v-model="loginModel">
      <auth is-dialog></auth>
    </AppModal>
	</div>
</template>

<script setup lang="ts">
import auth from './pages/auth.vue'
import { useAuthStore } from '~/composables/auth/Auth.store'
import { useLoginDialog } from './composables/auth/login/useLoginDialog'
import { useAuthWrapper } from './composables/auth/useAuthWrapper'

// title
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}-acanet` : 'آکادمی لند';
  }
})

// auth
const authStore = useAuthStore()  
onMounted(() => authStore.fetchAndSetIdentityIfLoggedIn())

const { loginModel } = useLoginDialog() 

const { isAuthRoute } = useAuthWrapper();
const clientRender = ref(false)
if (import.meta.server && unref(isAuthRoute)) {
  clientRender.value = true;
}
</script>
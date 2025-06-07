<template>
	<div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <TheToast />
    <AppModal v-model="loginModel">
      <auth is-dialog></auth>
    </AppModal>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { themeChange } from 'theme-change'
import { useAuthStore } from '~/composables/auth/Auth.store'
import { useLoginDialog } from './composables/auth/login/useLoginDialog'
import auth from './pages/auth.vue'

const authStore = useAuthStore()  

onMounted(() => {
    themeChange(false)
    authStore.fetchAndSetIdentityIfLoggedIn()
})

const { loginModel } = useLoginDialog() 

</script>
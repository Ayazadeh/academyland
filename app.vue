<template>
	<div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <TheToast />
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { themeChange } from 'theme-change'
import { useAuthStore } from '~/composables/auth/Auth.store'

const authStore = useAuthStore()  

onMounted(() => {
    themeChange(false)
    authStore.fetchAndSetIdentityIfLoggedIn()
})
</script>
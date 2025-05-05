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

onMounted(() => {
    themeChange(false)
})
</script>
<template>
    <div class="text-center">
        <ThemeSelector />
        <h1>page</h1>
        <button class="btn btn-secondary">
            Secondary
            <BeakerIcon class="size-6" />
        </button>
    </div>
</template>

<script setup>
import { BeakerIcon } from '@heroicons/vue/24/solid'

definePageMeta({
    layout: 'custom'
})
</script>
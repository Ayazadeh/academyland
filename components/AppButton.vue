<template>
    <button :class="`btn btn-${variant}`">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    variant: {
        type: String,
        default: "primary"      
    }
})
</script>

<style scoped>

</style>
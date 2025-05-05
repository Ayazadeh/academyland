<template>
    <button :class="[`btn btn-soft btn-${variant}`]">
        <span v-if="loading" class="loading loading-spinner"></span>
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
interface Props {
    variant?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    variant: "primary",
    loading: false
})
</script>

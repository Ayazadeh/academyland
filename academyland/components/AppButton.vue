<template>
	<button :class="{ [`btn btn-soft btn-${variant}`]: variant !== undefined }">
		<span
			v-if="loading"
			class="loading loading-spinner"
		></span>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
import { ButtonVariantEnum } from "@/types"

interface Props {
    variant?: ButtonVariantEnum;
    loading?: boolean;
}

withDefaults(defineProps<Props>(), {
    loading: false
})
</script>

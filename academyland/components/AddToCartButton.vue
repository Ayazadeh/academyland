<template>
	<AppButton
		class="btn-sm"
		:variant="ButtonVariantEnum.PRIMARY"
		@click.stop.prevent="addToCart"
		:loading="adding"
	>
		افزودن به سبد خرید
	</AppButton>
</template>

<script setup lang="ts">
import { useAddToCart } from '~/composables/cart/useAddToCart';
import { ButtonVariantEnum } from '~/types';

const props = defineProps<{ id: number }>();

const { adding, addToCart } = useAddToCart(props.id);
</script>

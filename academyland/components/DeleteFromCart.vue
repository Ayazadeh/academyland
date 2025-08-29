<template>
	<AppButton
		class="btn-sm"
		:variant="ButtonVariantEnum.SECONDARY"
		@click.stop.prevent="deleteFromCart"
		:loading="deleting"
	>
		حذف از سبد خرید
	</AppButton>
</template>

<script setup lang="ts">
import { ButtonVariantEnum } from '~/types';
import { useDeleteFromCart } from '~/composables/cart/useDeleteFromCart';

const props = defineProps<{ id: number }>();

const { deleting, deleteFromCart } = useDeleteFromCart(props.id);
</script>

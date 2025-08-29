<template>
	<AppButton
		v-if="canBuy"
		@click="payClick"
		:variant="ButtonVariantEnum.SECONDARY"
        class="btn-block"
	>
		خرید
	</AppButton>
</template>

<script setup lang="ts">
import { ButtonVariantEnum } from "@/types"
import { BASE_URL } from "~/composables/api/api.config";
import { useAuthStore } from "~/composables/auth/Auth.store";
import { useCanBuyConsumer } from "~/composables/course/useCourseDetail";
import qs from 'qs'

const props = defineProps<{
	courseId: number;
}>()

const canBuy = useCanBuyConsumer();
const authStore = useAuthStore();

const getTarget = computed(() => {
	const query = qs.stringify({
		key: authStore.getToken,
		course_id: props.courseId
	})
	return `${BASE_URL}/site/request?${query}`
})

const payClick = () => {
	navigateTo(getTarget.value, { external: true })
}
</script>

<template>
	<Form
		:validation-schema="schema"
		@submit="submit"
	>
		<div
			class="grid grid-cols-1 sm:grid-cols-2:gap-3"
			v-if="!hasFullName"
		>
			<AppTextInput
				name="first_name"
				:label="$t('first_name')"
			/>
			<AppTextInput
				name="last_name"
				:label="$t('last_name')"
			/>
		</div>
		<AppTextInput
			name="comment"
			:label="$t('comment')"
			area
		/>

		<AppButton
			:loading="loading"
			class="btn btn-secondary btn-block"
			type="submit"
		>
			ثبت نظر
		</AppButton>
	</Form>
</template>

<script setup lang="ts">
import { useCreateCourseComment } from '~/composables/course/courseComments/useCourseComments'
import { Form } from 'vee-validate';

const props = defineProps<{
    courseId: number;
}>()

const { submit, loading, schema, hasFullName } = useCreateCourseComment(toRef(props, 'courseId'))

const { $t } = useNuxtApp();
</script>

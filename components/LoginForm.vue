<template>
	<Form :validation-schema="schema" @submit="submit">
		<AppError center :message="error"></AppError>

		<AppTextInput name="username" :label="$t('username')" />
		<AppTextInput name="password" :label="$t('password')" type="password" />
		
		<div class="w-full flex justify-end -mt-2 mb-2">
			<div
				@click="resetPasswordClick"
				role="button"
				class="text-gray-500 text-sm underline cursor-pointer"
			>
				کلمه عبور را فراموش کرده‌ام
			</div> 
		</div>

		<AppButton :loading="loading" class="btn btn-secondary btn-block" type="submit">
			{{ $t("login") }}
		</AppButton>
	</Form>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
import { useLoginValidator } from "~/composables/auth/login/login.validator";
import { useLogin } from "~/composables/auth/login/useLogin";

const emits = defineEmits(["resetPassword"]);

const { schema } = useLoginValidator();
const { loading, error, submit } = useLogin();

const resetPasswordClick = () => {
	emits("resetPassword");
};
</script>

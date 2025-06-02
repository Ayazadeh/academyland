<template>
	<AppError center :message="error"></AppError>
	<Form :validation-schema="schema" @submit="submit">
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
import { useLoginService } from "~/composables/auth/login/login.service";
import { useAuthStore } from "~/composables/auth/Auth.store";

// Emits
const emits = defineEmits(["resetPassword"]);

// Composables & Stores
const { schema } = useLoginValidator();
const { login } = useLoginService();
const store = useAuthStore();

// Data
const loading = ref(false);
const error = ref("");

// Methods
const resetPasswordClick = () => {
	emits("resetPassword");
};

const onError = () => {
	error.value = "نام کاربری یا کلمه عبور نادرست است";
};

const submit = async (values: any) => {
	loading.value = true;
	error.value = "";
	const response = await login(values, { ignoreErrors: true, onError });

	if (response != undefined) {
		store.setToken(response.tokens);
		store.setIdentity(response.identity);
	}

	loading.value = false;
};
</script>

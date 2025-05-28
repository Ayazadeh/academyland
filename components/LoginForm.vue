<template>
	<Form :validation-schema="schema" @submit="submit">
		<AppTextInput name="username" :label="$t('username')" />
		<AppTextInput name="password" :label="$t('password')" type="password" />
		<div class="w-full flex justify-end -mt-2 mb-2">
			<div @click="resetPasswordClick" role="button" class="text-gray-500 text-sm underline cursor-pointer">کلمه عبور را فراموش کرده‌ام</div>
		</div>

		<AppButton :loading="loading" class="btn btn-secondary btn-block" type="submit">
			{{ $t("login") }}
		</AppButton>
	</Form>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
import { useLogin } from "@/composables/auth/login/useLogin";
import { object, string } from "yup";

const emits = defineEmits(["resetPassword"]);

const { $t } = useNuxtApp();

const schema = object({
	username: string().required().label($t("username")),
	password: string().required().label($t("password")),
});

const resetPasswordClick = () => {
	emits("resetPassword");
};

const loading = ref(false);
const submit = (values, { setErrors }) => {
	console.log("submit login", values);
	setErrors({
		username: "نام کاربری معتبر نیست",
	});
};
</script>

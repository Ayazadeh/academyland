<template>
    <Form @submit="submit">
        <AppTextInput name="username" :label="$t('username')" />
        <AppTextInput name="password" :label="$t('password')" type="password" />
        <div class="w-full flex justify-end -mt-2 mb-2">
            <div
                @click="resetPasswordClick"
                role="button"
                class="text-gray-500 text-sm underline"
            >
                کلمه عبور را فراموش کرده‌ام
            </div>
        </div>

        <AppButton 
            :loading="loading"
            class="btn btn-secondary btn-block"
            type="submit"
        >
            {{ $t('login') }}
        </AppButton>
    </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { useLogin } from '@/composables/auth/login/useLogin'

const emits = defineEmits(['resetPassword'])

const resetPasswordClick = () => {
    emits('resetPassword')
}

const loading = ref(false)
const submit = () => {
    console.log('submit login');
}
</script>
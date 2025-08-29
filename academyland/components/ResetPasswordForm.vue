<template>
    <Form @submit="submit">
        <AppTextInput name="email" :label="$t('email')" />

        <AppButton
            :loading="loading"
            class="btn btn-secondary btn-block"
            type="submit"
        >
            ارسال ایمیل بازنشانی
        </AppButton>
    </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import { useRequestPasswordReset } from '~/composables/auth/resetPassword/useResetPassword'

const loading = ref(false);
const submit = () => {
    console.log('submit reset pass');
}
</script>
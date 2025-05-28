<template>
    <Form @submit="submit">
        <AppTextInput name="username" :label="$t('username')" />
        <AppTextInput name="email" :label="$t('email')" />
        <AppTextInput name="password" :label="$t('password')" type="password" />

        <AppButton
            :loading="loading"
            class="btn btn-secondary btn-block"
            type="submit"
        >
            {{ $t('signup') }}
        </AppButton>
    </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import { useRegister } from '~/composables/auth/register/useRegister';

const loading = ref(false);
const submit = () => {
    console.log('submit register');
}
</script>
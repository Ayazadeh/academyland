<template>
    <div
        :class="{
            'p-4 bg-white rounded-lg shadow mx-3 my-4 sm:mx-auto sm:min-w-xs lg:min-w-sm': !isDialog,
            'px-3': isDialog
        }"
    >
        <div class="mx-auto w-min">
            <UserIcon class="text-secondary" />
        </div>
        <LoginForm 
            v-if="step === LoginStep.login"
            @resetPassword="step = LoginStep.resetPassword"
        />
        <RegisterForm 
            v-else-if="step === LoginStep.register"
        />
        <ResetPasswordForm 
            v-else-if="step === LoginStep.resetPassword"
        />
        <div class="my-8"></div>
        <div 
            class="py-2.5 text-center"
            :class="{
                't-center absolute bottom-0 inset-x-0 bg-gray-100': isDialog
            }"
        >
            <div
                role="button"
                @click="toggleRegisterAndLogin"
                class="text-link underline"
            >
                {{ LoginStep.login == step ? 'ورود به حساب کاربری' : 'ثبت نام' }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UserIcon } from '@heroicons/vue/24/outline';
import { LoginStep } from '~/composables/auth/Auth.enum';

interface Props {
    isDialog?: boolean;
}

withDefaults(defineProps<Props>(), {
 isDialog: false
})

const step = ref<LoginStep>(LoginStep.login)
const toggleRegisterAndLogin = () => {
    step.value = unref(step) == LoginStep.login ? LoginStep.register : LoginStep.login;
}
</script>
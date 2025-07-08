<template>
    <div>
        <div class="min-h-6">
            <client-only>
                <template v-if="authStore.isLoggedIn">
                    <span>{{ authStore.getFullName }}</span>
                    <button @click="logout">خروج</button>
                </template>
                <button v-else @click="() => open()">ورود/ثبت نام</button>
            </client-only>
        </div>

        <main class="mb-10">
            <slot />
        </main>

        <foot>footer from default layout</foot er>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/composables/auth/Auth.store';
import { useLoginDialog } from '~/composables/auth/login/useLoginDialog';
import { useLogout } from '~/composables/auth/useLogout';

const authStore = useAuthStore()
const { open } = useLoginDialog();
const { logout } = useLogout();
</script>
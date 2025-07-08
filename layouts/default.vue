<template>
    <section class="t-col min-h-screen">
        <TheMenu />

        <main class="mb-10">
            <slot />
        </main>

        <foot>footer from default layout</foot er>
    </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/composables/auth/Auth.store';
import { useLoginDialog } from '~/composables/auth/login/useLoginDialog';
import { useLogout } from '~/composables/auth/useLogout';

const authStore = useAuthStore()
const { open } = useLoginDialog();
const { logout } = useLogout();
</script>
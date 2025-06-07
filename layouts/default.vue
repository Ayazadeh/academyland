<template>
    <div>
        <button @click="openLoginDialog">click</button>
        <main class="mb-10">
            <slot />
        </main>
        <footer>footer from default layout</footer>
    </div>
</template>

<script setup lang="ts">
import { useLoginDialog } from '~/composables/auth/login/useLoginDialog';

const { open } = useLoginDialog();

const openLoginDialog = () => {
    open(() => {
        console.log('login dialog closed!');
    })
}
</script>
<template>
    <section class="t-col min-h-screen">
        <TheMenu />

        <main class="mb-10">
            <slot />
        </main>

        <footer>footer from default layout</footer>
    </section>
</template>

<script setup lang="ts">
</script>
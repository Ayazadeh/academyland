<template>
    <div class="flex flex-col space-y-3 justify-center items-center text-center">
        <h1>my base component</h1>
        <AppButton :variant="ButtonVariantEnum.SECONDARY" loading>دکمه</AppButton>
    </div>
</template>

<script setup lang="ts">
import { ButtonVariantEnum } from "@/types";
</script>

<style lang="scss" scoped>

</style>
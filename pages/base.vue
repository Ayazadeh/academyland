<template>
    <div class="flex flex-col space-y-3 justify-center items-center text-center h-screen">
        <h1>my base component</h1>
        <AppModal v-model="isModalOpen">
            <div>
                <h2>Modal Content</h2>
                <p>This is the content of the modal.</p>
            </div>
            
        </AppModal>
        <AppButton 
            :variant="ButtonVariantEnum.SECONDARY" 
            @click="isModalOpen = true"
        >
            <span>دکمه</span>
        </AppButton>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ButtonVariantEnum } from "@/types";

const isModalOpen = ref(false);
</script>
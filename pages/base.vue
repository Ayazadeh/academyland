<template>
    <div class="flex flex-col space-y-3 justify-center items-center text-center">
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
        <AppButton @click="showMessage" :variant="ButtonVariantEnum.SECONDARY">
            show toast
        </AppButton>
        <AppTextInput v-model="title" name="title" label="title" />
        {{ title }}

        <div class="py-5 min-h-[12rem]">
            <AppCollapse>
                <template #title>title of collapse</template>
                <h2>content of collapse</h2>
            </AppCollapse>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ButtonVariantEnum, ToastEnum } from "@/types";

const isModalOpen = ref(false);

const { showToast } = useToast()
const showMessage = () => {
    showToast({ message: 'با موفقیت انجام شد', type: ToastEnum.SUCCESS })
}

const title = ref('')
</script>
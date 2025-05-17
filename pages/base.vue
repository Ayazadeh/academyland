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
        <AppTextInput v-model="textInput" name="textInput" label="title" />
        {{ textInput }}

        <div class="py-5 min-h-[12rem]">
            <AppCollapse>
                <template #title>title of collapse</template>
                <h2>content of collapse</h2>
            </AppCollapse>
        </div>

        <h2>menu</h2>
        <div class="relative">
            <button
                @click="openMenu"
                class="btn btn-primary no-animation"
            >
                open menu
            </button>
            <div class="bg-orange-200">
                <div
                    ref="target"
                    class="absolute top-14 inset-x-0 h-0 invisible rounded-box opacity-0 z-30 bg-white"
                >
                    <ul class="p-4 space-y-1">
                        <li v-for="i in 3">item {{ i }}</li>
                    </ul>
                </div>
            </div>
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

const textInput = ref('')

const { target, openMenu } = useMenu();
</script>
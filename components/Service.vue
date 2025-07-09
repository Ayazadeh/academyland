<template>
    <div 
        class="
        bg-base-100
        t-row
        border
        w-full
        lg:border-none 
        lg:shadow
        lg:max-w-[20rem]
        rounded-box
        p-3
        "
    >
        <div class="min-w-16 min-h-16 flex-shrink-0 text-secondary p-1">
            <slot name="icon" />
        </div>
        <div class="space-y-2 flex-grow p-1">
            <h6 class="font-bold block prose-sm">
                {{ title }}
            </h6>
            <p class="block text-justify prose-sm break-words">
                {{ description }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    description: string;
}>()
</script>
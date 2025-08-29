<template>
    <input 
        v-model="checkboxModel"
        type="checkbox"
        class="modal-toggle"
    />
    <div 
        class="modal"
        @click="closeModal"
    >
        <div 
            v-if="eager || modelValue"
            class="modal-box relative overflow-hidden"
            @click.stop
        >
            <section class="flex items-center justify-between">
                <span class="font-medium">{{ title }}</span>
                <span 
                    class="cursor-pointer text-xl select-none text-gray-500" 
                    @click="closeModal"
                >&#x2715;</span>
            </section>
            <div class="overflow-y-auto max-h-[85vh] lg:max-h-[80vh] scrollbar-thin"> 
                <slot />
            </div>
            <div
                v-if="$slots.actions"
                class="modal-action"
            >
                <slot name="actions" />
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    modelValue: boolean;
    eager?: boolean;
    title?: string;
}>(), {
    modelValue: false,
    eager: false,
    title: ''
})

const emits = defineEmits(['update:modelValue']);

const checkboxModel = ref(!!props.modelValue)

watch(() => props.modelValue, (val) => {
    checkboxModel.value = !!val
})

const closeModal = () => {
    emits('update:modelValue', false)
}
</script>
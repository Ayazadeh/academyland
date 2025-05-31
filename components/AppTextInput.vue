<template>
	<fieldset class="form-control" :class="{ 'has-error': !!errorMessage, success: meta.valid }">

		<label v-if="label" class="t-row justify-between pb-1.5 px-1" :for="name">
			<span class="label-text">{{ label }}</span>
			<slot name="leftLabel" />
		</label>

		<template v-if="area">
			<textarea
				class="input h-32"
				v-bind="$attrs"
				:name="name"
				:type="type"
				:value="inputValue"
				:placeholder="placeholder"
				@input="handleChange"
				@blur="handleBlur"
			></textarea>
		</template>

		<template v-else>
			<input
				autocomplete="off"
				class="input w-full"
				v-bind="$attrs"
				:name="name"
				:type="type"
				:value="inputValue"
				:placeholder="placeholder"
				@input="handleChange"
				@blur="handleBlur"
			/>
		</template>

		<label class="flex items-center min-h-[1.4rem] px-1">
			<span class="label-text-alt text-error text-2xs leading-3">
				{{ errorMessage || successMessage }}
			</span>
		</label>
	</fieldset>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

const props = withDefaults(
	defineProps<{
		type?: string;
		area?: boolean;
		modelValue?: string;
		name: string;
		label?: string;
        successMessage?: string;
		placeholder?: string;
	}>(),
	{
		type: "text",
		area: false,
		modelValue: "",
		label: "",
		successMessage: "",
		placeholder: "",
	}
);

const emits = defineEmits(['update:modelValue'])

const {
    value: inputValue,
    errorMessage,
    handleChange,
    handleBlur,
    meta,
    setValue
} = useField(props.name, undefined, {
    initialValue: props.modelValue,
    validateOnValueUpdate: false
})

watchEffect(() => {
    emits('update:modelValue', unref(inputValue))
})

watch(() => props.modelValue, (value) => {
    setValue(value)
})
</script>

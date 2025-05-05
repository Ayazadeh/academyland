<template>
	<div class="text-center">
		<ThemeSelector />
		<h1>page</h1>
		<button class="btn btn-primary">
			Primary
			<BeakerIcon class="size-6" />
		</button>
		<br />
		x: {{ x }}

		<div class="box bg-red-400 size-4"></div>
		<div class="box bg-green-400 size-4"></div>
		<form @submit="onSubmit">
			<input v-model="field" v-bind="fieldProps" class="input" />
			<span class="text-red-500">{{ errors.field }}</span>

			<button class="btn">Submit</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { BeakerIcon } from "@heroicons/vue/24/solid";
import { useMouse } from "@vueuse/core";
import { gsap } from "gsap";
import { useForm } from "vee-validate";

definePageMeta({
	layout: "custom",
});

// tracks mouse position
const { x, y } = useMouse();

onMounted(() => {
	gsap.to(".box", {
		rotation: 27,
		x: 100,
		duration: 2,
	});
});

// Validation, or use `yup` or `zod`
function required(value: string) {
	return value ? true : "This field is required";
}

// Create the form
const { defineField, handleSubmit, errors } = useForm({
	validationSchema: {
		field: required,
	},
});

// Define fields
const [field, fieldProps] = defineField("field");

// Submit handler
const onSubmit = handleSubmit((values) => {
	// Submit to API
	console.log(values);
});
</script>

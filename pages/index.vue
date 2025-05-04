<template>
	<div class="text-center">
		<ThemeSelector />
		<h1>page</h1>
		<button class="btn btn-primary">
			Primary
			<BeakerIcon class="size-6" />
		</button>
        <br>
        x: {{ x }}
	</div>
</template>

<script setup>
import { BeakerIcon } from "@heroicons/vue/24/solid";

definePageMeta({
	layout: "custom",
});

import { useLocalStorage, useMouse, usePreferredDark } from "@vueuse/core";

// tracks mouse position
const { x, y } = useMouse();

// is user prefers dark theme
const isDark = usePreferredDark();

// persist state in localStorage
const store = useLocalStorage("my-storage", {
	name: "Apple",
	color: "red",
});
</script>

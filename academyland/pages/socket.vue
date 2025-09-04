<template>
	<h1>Hi socket</h1>
	<div class="w-1/2 mx-auto">
		<AppButton @click="executeEvent" :variant="ButtonVariantEnum.SECONDARY">
			send custom event
		</AppButton>
		<br />
		{{ messageFromServer }}
	</div>
</template>

<script setup lang="ts">
import { ButtonVariantEnum } from "~/types";

const messageFromServer = ref("");

const { $socket } = useNuxtApp();

const executeEvent = () => {
	$socket.io.emit("myCustomEvent", "this is a message from nuxt app");
};

onMounted(() => {
	$socket.io.on("broadcast", (msg) => (messageFromServer.value = msg));
});
</script>

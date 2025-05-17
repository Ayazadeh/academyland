<template>
	<div>
		<h1 class="text-2xl font-bold my-5">useFetch data</h1>
		<ul>
			<li v-for="(item, index) in (data as Record<string, any>[]).slice(0, 5)" :key="index">
				{{ item.title }}
			</li>
		</ul>
		<h1 class="text-2xl font-bold my-5">mounted data</h1>
		<ul>
			<li v-for="(item, index) in (mountedData as Record<string, any>[]).slice(0, 5)" :key="index">
				{{ item.title }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
const { data, pending, error, refresh } = useFetch('https://jsonplaceholder.typicode.com/posts')

const mountedData = ref([])
onMounted(async () => {
	mountedData.value = await $fetch('https://jsonplaceholder.typicode.com/posts')
})
</script>

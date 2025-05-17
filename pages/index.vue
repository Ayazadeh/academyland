<template>
	<div>
		<ul>
			<li v-for="(item, index) in data" :key="index">
				{{ (item as Record<string, any>).title }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useFetchApi } from '~/composables/api/useFetchApi'
const $fetch = useFetchApi();
const { data, status, error, refresh, clear } = await useAsyncData(
  'mountains',
  () => $fetch('/course/index')
)
</script>

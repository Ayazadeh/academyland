<template>
	<AppCollapse>
		<template #title>
			<p class="font-medium">{{ item.chapterName }}</p>
		</template>
		<section class="divide-y">
			<template
				v-for="videoItem in item.courseVideos"
				:key="`video-item-${videoItem.id}`"
			>
				<CourseVideoItem
					:item="videoItem"
					class="py-3"
					:row-number="videoItem.rowNumber"
				/>
			</template>
		</section>
	</AppCollapse>
</template>

<script setup lang="ts">
import type { CourseChapter } from '~/composables/course/courseDetail.dto';

defineProps<{
    item: CourseChapter
}>()
</script>

<template>
	<div
		class="flex flex-col space-y-1.5 sm:space-y-0 sm:justify-between sm:flex-row"
	>
		<section class="t-row space-x-2">
			<div
				class="t-center flex-shrink-0 w-7 h-7 text-xs rounded-full bg-gray-500 text-base-100"
			>
				{{ rowNumber }}
			</div>
			<div>{{ item.videoTitle }}</div>
		</section>
		<section class="t-row">
			<span class="block ml-3 lg:ml-4 text-gray-500 prose-sm">
				{{ item.duration }}
			</span>
			<LockClosedIcon
				v-if="isLocked"
				class="block w-5 h-5 text-red-600"
			/>
			<template v-else>
				<a :href="getDownloadLink">
					<ArrowDownTrayIcon class="block w-5 h-5 text-primary" />
				</a>
			</template>
		</section>
	</div>
</template>

<script setup lang="ts">
import { LockClosedIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline';
import { CourseVideo } from '~/composables/course/courseDetail.dto';
import { useVideoItem } from '~/composables/course/useCourseDetail';

const props = defineProps<{
    rowNumber: number;
    item: CourseVideo;
}>()

const { isLocked, getDownloadLink } = useVideoItem(toRef(props, 'item'))
</script>

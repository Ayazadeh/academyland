import { CourseCommentDto } from './courseComments.dto';
import { useCourseCommentService } from './useCourseComment.service';

export const useCourseComments = (course_id: Ref<number>) => {
	const state = reactive<{ loading: boolean; comments: CourseCommentDto[] }>({
		loading: true,
		comments: [],
	});
	const $fetch = useCourseCommentService();

	onMounted(async () => {
		try {
			const response = await $fetch(unref(course_id));
			if (response) {
				state.comments = response as CourseCommentDto[];
				state.loading = false;
			}
		} catch (e) {
			console.error('Error in useCourseComments: ', e);
			throw e;
		} finally {
			state.loading = false;
		}
	});

	const isEmpty = computed(() => {
		return !state.loading && state.comments.length == 0;
	});

	return { ...toRefs(state), isEmpty };
};

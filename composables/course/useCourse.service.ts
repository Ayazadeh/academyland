import { useFetchApi } from '~/composables/api/useFetchApi';
import { CourseDto } from './course.dto';
import { CourseDetailDto } from './courseDetail.dto';

export const useCourseService = () => {
	const $fetch = useFetchApi<CourseDto[], CourseDto>(CourseDto);
	return async () => {
		try {
			const response = await $fetch('/course/index', {
				params: { expand: 'src, statusText, isRecording, percent' },
			});

			return response;
		} catch (error) {
			console.error('Error fetching courses:', error);
			throw error;
		}
	};
};

export const useCourseDetailService = () => {
	const $fetch = useFetchApi<CourseDetailDto, CourseDetailDto>(CourseDetailDto);
	return async (slug: string) => {
		try {
			const response = await $fetch('/course/view', {
				params: {
					slug,
					expand:
						'courseDuration, computedEstimateDuration, statusText, src, courseQuestions, courseChapters, courseVideos, duration',
				},
			});

			return response;
		} catch (error) {
			console.error('Error fetching courses:', error);
			throw error;
		}
	};
};

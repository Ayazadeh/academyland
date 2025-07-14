import { useFetchApi } from '~/composables/api/useFetchApi';
import { useCourseCommentsValidator } from './CourseComment.validator';
import { CourseCommentDto } from './courseComments.dto';
import type { InferType } from 'yup';
import type { FetchCustomConfig } from '../../api/FetchCustomConfig.interface';

export const useCourseCommentService = () => {
	const $fetch = useFetchApi<CourseCommentDto[], CourseCommentDto>(
		CourseCommentDto
	);

	return async (course_id: number) => {
        try {
            const response = $fetch('/course-comments/by-course', {
                params: { course_id, expand: 'children,createdDate' }
            })

            return response;
        } catch (e) {
            console.error('Error in useCourseComment.service: ', e);
            throw e;
        }
    }
};

export const useCourseCreateCommentService = () => {
	const $fetch = useFetchApi();
	const { courseCommentSchema } = useCourseCommentsValidator();
	type BODY_TYPE = InferType<typeof courseCommentSchema>;
	interface BODY extends BODY_TYPE {
		course_id: number;
	}
	return (body: BODY, customConfig: FetchCustomConfig = {}) =>
		$fetch(
			'/course-comments/create',
			{ method: 'post', body },
			{ setToken: true, ...customConfig }
		).then((response) => {
			return response;
		});
};

import { useCourseDetailService } from './useCourse.service';

export const useCourseDetail = (slug: string) => {
	const getCourseDetail = useCourseDetailService();
	const { data, pending } = useLazyAsyncData(
		'course-detail' + slug,
		() => getCourseDetail(slug)
	);

	return { data, pending };
};

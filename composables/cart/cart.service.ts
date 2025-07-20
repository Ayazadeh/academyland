import { useFetchApi } from '../api/useFetchApi';
import { CartDto } from './cart.dto';

const beforeResponse = (response: Record<string, any>) => {
	if (response) {
		return response.map((item: Record<string, any>) => item.course);
	}
};

export const useCartListService = () => {
	const fetchData = useFetchApi<CartDto, CartDto>(CartDto);
	const listWhenLoggedIn = () => {
		return fetchData(
			'/cart/index',
			{
				params: {
					expand:
						'course.src, course.statusText, course.isRecording, course.percent',
				},
			},
			{
				setToken: true,
				beforeResponse,
			}
		);
	};
	const listWhenNotLoggedIn = (ids: number[]) => {
		return fetchData('/card/course-by-id', {
			params: { id: ids, expand: 'src, statusText, isRecording, percent' },
		});
	};

	return { listWhenLoggedIn, listWhenNotLoggedIn };
};

export const useAddToCartService = () => {
	const fetchData = useFetchApi<CartDto, CartDto>(CartDto);
	return async (course_id: number) => {
		return (
			await fetchData('/cart/add', {
				params: {
					expand:
						'course.src, course.statusText, course,isRecording, course.percent',
				},
				method: 'post',
				body: { course_id },
			}),
			{ setToken: true, beforeResponse, toastValidationFields: ['course_id'] }
		);
	};
};

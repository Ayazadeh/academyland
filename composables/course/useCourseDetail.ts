import { useAuthStore } from '../auth/Auth.store';
import { useCourseDetailService, useIsUserInTheCourseService } from './useCourse.service';

type CAN_BUY = { loading: boolean, canBuy: boolean }

const useCanBuyProvider = (courseID: Ref<number | undefined>) => {
	const fetchIsInTheCourse = useIsUserInTheCourseService();
	const authStore = useAuthStore();
	const userCanBuy = reactive<CAN_BUY>({ loading: true, canBuy: false })
	onBeforeMount(() => {
		watch([authStore.isLoggedIn, courseID], async () => {
			if (unref(courseID) && authStore.isLoggedIn) {
				userCanBuy.loading = true;
				try {
					const isIn = await fetchIsInTheCourse(unref(courseID)!)
					if (isIn != undefined) {
						userCanBuy.canBuy = !isIn;
					}
				} catch(e) {
					console.error('Error in useCourseDetail');
					
				} finally {
					userCanBuy.loading = false
				}
			} else {
				userCanBuy.canBuy = false;
			}
		}, { immediate: true })
	})
	
	provide<CAN_BUY>('canBuy', userCanBuy)
}

export const useCanBuyConsumer = () => {
	const inTheCourse = inject<CAN_BUY>('canBuy')
	if (inTheCourse == undefined) {
		throw new Error('canBuy inject is undefined in useCanBuyConsumer')
	}
	return toRefs(inTheCourse)
}

export const useCourseDetail = (slug: string) => {
	if (!slug) throw new Error('Slug is missing');

	const getCourseDetail = useCourseDetailService();
	const { data, pending, error } = useLazyAsyncData(
		'course-detail' + slug,
		() => getCourseDetail(slug)
	);

	const courseID = computed(() => unref(data)?.['id'])
	useCanBuyProvider(courseID)
	
	return { data, pending, error };
};

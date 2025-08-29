import { useAuthStore } from '~/composables/auth/Auth.store';
import { CourseCommentDto } from './courseComments.dto';
import {
	useCourseCommentService,
	useCourseCreateCommentService,
} from './useCourseComment.service';
import { useCourseCommentsValidator } from './CourseComment.validator';
import { ToastEnum } from '~/types';
import type { InferType } from 'yup';
import type { FormActions } from 'vee-validate';

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

export const useCreateCourseComment = (course_id: Ref<number>) => {
	const { courseCommentSchema, courseCommentSchemaHasFullName } =
		useCourseCommentsValidator();
	const loading = ref(false);
	const createComment = useCourseCreateCommentService();
	const toast = useToast();
	const authStore = useAuthStore();
	const hasFullName = computed(
		() =>
			unref(authStore.isLoggedIn) &&
			authStore.getIdentity.first_name &&
			authStore.getIdentity.last_name
	);

	const submit = async (
		body: any,
		{ setErrors, resetForm }: FormActions<any>
	): Promise<void> => {
		
		if (unref(hasFullName)) {
			body.first_name = authStore.getIdentity.first_name!;
			body.last_name = authStore.getIdentity.last_name!;
		}

		loading.value = true;

		const response = await createComment(
			{ course_id: unref(course_id), ...body },
			{ setErrors }
		);
		if (response) {
			toast.showToast({
				type: ToastEnum.SUCCESS,
				message: 'نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده خواهد شد.',
			});
			resetForm();
		}

		loading.value = false;
	};

	const getSchema = computed(() => {
		return unref(hasFullName)
			? courseCommentSchemaHasFullName
			: courseCommentSchema;
	});

	return { submit, schema: getSchema, loading, hasFullName };
};

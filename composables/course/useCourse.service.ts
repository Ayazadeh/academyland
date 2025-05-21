import { useFetchApi } from "~/composables/api/useFetchApi";
import { CourseDto } from "./course.dto";

export const useCourseService = () => {
    const $fetch = useFetchApi<CourseDto>(CourseDto);
    return async () => {
        try {
            const response = await $fetch('/course/index', { 
                params: { expand: 'src, statusText, isRecording, percent' }
            });

            return response;

        } catch (error) {
            console.error('Error fetching courses:', error);
            throw error;
        }
    }
}
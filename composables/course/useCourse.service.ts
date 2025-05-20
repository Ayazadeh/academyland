import { useFetchApi } from "~/composables/api/useFetchApi";
import { CourseDto } from "./course.dto";
import { plainToClass, plainToInstance } from "class-transformer";

export const useCourseService = () => {
    const $fetch = useFetchApi();
    return async () => {
        try {
            const response = await $fetch('/course/index', { 
                params: { expand: 'src, statusText, isRecording, percent' }
            });

            console.log('test ', response);
            
            
            // Convert response to plain object if it's not already
            const plainResponse = Object.assign({}, response);
            return plainToInstance(CourseDto, plainResponse, { 
                excludeExtraneousValues: true 
            });
        } catch (error) {
            console.error('Error fetching courses:', error);
            throw error;
        }
    }
}
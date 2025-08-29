import { useCourseService } from "./useCourse.service";

export const useCourseList = () => {
    const getCourseList = useCourseService();
    const { data, pending }: { data: Ref<any[]>, pending: Ref<boolean> } = useLazyAsyncData(
      'course-list',
      () => getCourseList()
    )

    return {
        data,
        pending
    }
}
import { useFetchApi } from "~/composables/api/useFetchApi";

export const useCourseService = () => {
    const $fetch = useFetchApi();
    return () => $fetch('/course/index', { params: { expand: 'src, statusText, isRecording, percent' } })
    .then((response: any) => {
        return response.map((item: Record<string, any>) => {
            return {...item, showAmount: item.amountOff < item.amount}
        })
    })
}
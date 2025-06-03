import type { Identity } from "~/composables/auth/Auth.interface"
import { useFetchApi } from "../api/useFetchApi"

export const useIdentityService = () => {
    const fetchData = useFetchApi<Identity>()
    return (params = {}) => fetchData('/site/identity', { params }, { setToken: true, goToLogin: false })
}
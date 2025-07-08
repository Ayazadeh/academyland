import { useAuthWrapper } from '~/composables/auth/useAuthWrapper'
import { useAuthStore } from "./Auth.store";

export const useLogout = () => {
    const { isAuthRoute } = useAuthWrapper();
    const authStore = useAuthStore();
    const $router = useRouter();
    
    const logout = async () => {
        authStore.clearStore();
        if (unref(isAuthRoute)) {
            $router.replace('/')
        }
    }

    return { logout }
}
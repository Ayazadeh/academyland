import { useAuthStore } from "~/composables/auth/Auth.store";
import type { Pinia } from "pinia";

export default defineNuxtPlugin(({ pinia }) => {
    const authStore = useAuthStore(pinia as Pinia);
    authStore.initialStateFromLocalStore();
})
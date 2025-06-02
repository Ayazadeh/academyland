import { useAuthStore } from "../Auth.store";
import { useLoginService } from "./login.service";

export const useLogin = () => {
	const store = useAuthStore();
	const error = ref("");
	const loading = ref(false);
	const { login } = useLoginService();

	const onError = () => {
		error.value = "نام کاربری یا کلمه عبور نادرست است";
	};

	const submit = async (values: any) => {
		loading.value = true;
		error.value = "";
		const response = await login(values, { ignoreErrors: true, onError });

		if (response != undefined) {
			store.setToken(response.tokens);
			store.setIdentity(response.identity);
		}

		loading.value = false;
	};

	return {
		loading,
		error,
		submit,
	};
};

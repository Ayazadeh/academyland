import { ToastEnum } from "~/types";
import { useAuthStore } from "../Auth.store";
import { useLoginService } from "./login.service";

export const useLogin = () => {
	const store = useAuthStore();
	const error = ref("");
	const loading = ref(false);
	const { login } = useLoginService();

	const onError = (e) => {
		if (e?.response?.status == 401) {
			error.value = "نام کاربری یا کلمه عبور نادرست است";
		} else {
			error.value = "خطایی رخ داده است";
		}
	};

	const { showToast } = useToast();
	const router = useRouter();
	const submit = async (values: any) => {
		loading.value = true;
		error.value = "";
		const response = await login(values, { ignoreErrors: true, onError });

		if (response != undefined) {
			store.setToken(response.tokens);
			store.setIdentity(response.identity);
			showToast({ message: "ورود با موفقیت انجام شد", type: ToastEnum.SUCCESS });
			router.replace("/");
		}

		loading.value = false;
	};

	return {
		loading,
		error,
		submit,
	};
};

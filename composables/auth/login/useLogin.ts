import { ToastEnum } from "~/types";
import { useAuthStore } from "../Auth.store";
import { useLoginService } from "./login.service";
import { useLoginDialog } from "./useLoginDialog";
import { useCartStore } from "~/composables/cart/cart.store";

export const useLogin = () => {
	const loading = ref(false);
	const error = ref("");
	const { loginCallback, loginModel } = useLoginDialog();
	const { login } = useLoginService();
	const { showToast } = useToast();
	const router = useRouter();
	const store = useAuthStore();
	// const cartStore = useCartStore(); // when use is not logged in and adds to cart we must send cart with login

	const onError = (e) => {
		if (e?.response?.status == 401) {
			error.value = "نام کاربری یا کلمه عبور نادرست است";
		} else {
			error.value = "خطایی رخ داده است";
		}
	};

	const submit = async (values: any) => {
		loading.value = true;
		error.value = "";
		const response = await login(values, { ignoreErrors: true, onError });

		if (response != undefined) {
			store.setToken(response.tokens);
			store.setIdentity(response.identity);
			if (typeof unref(loginCallback) == 'function') {
				unref(loginCallback)(response)
			}
			loginModel.value = false;
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

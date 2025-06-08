import { BASE_URL } from "./api.config";
import {
	plainToInstance,
	instanceToPlain,
	type ClassConstructor,
} from "class-transformer";
import type { FetchOptions, FetchError } from "ofetch";
import type { FetchCustomConfig } from "./FetchCustomConfig.interface";
import { useAuthStore } from "../auth/Auth.store";

type HttpMethod =
	| "GET"
	| "HEAD"
	| "PATCH"
	| "POST"
	| "PUT"
	| "DELETE"
	| "CONNECT"
	| "OPTIONS"
	| "TRACE";

export const useFetchApi = <R, T = {}>(classTransformer?: ClassConstructor<T>) => {
	const myCustomFetch = async (
		url: string,
		config?: FetchOptions,
		customConfig: FetchCustomConfig = {}
	) => {
		const router = useRouter();

		config = { baseURL: BASE_URL, retry: 0, ...config };
		customConfig = { goToLogin: true, ...customConfig };

		const authStore = useAuthStore();
		if (customConfig.setToken) {
			config.headers = {
				Authorization: `Bearer ${authStore.getToken}`,
			};
		}

		if (config.method && !isValidHttpMethod(config.method)) {
			throw new Error(`Invalid HTTP method: ${config.method}`);
		}

		try {
			const response = await $fetch<R>(url, {
				...config,
				method: config.method?.toUpperCase() as HttpMethod,
			});

			if (classTransformer) {
				const transformed = plainToInstance(classTransformer, response, {
					excludeExtraneousValues: true,
				});
				return instanceToPlain(transformed) as unknown as R;
			}

			return response;
		} catch (error: any) {
			customConfig.onError?.(error as FetchError);

			if (customConfig.ignoreErrors) {
				return;
			}

			const { clearStore } = useAuthStore();
			if (error.response && error.response.status === 401) {
				return handleRefreshToken(error, url, config, customConfig)?.catch((e) => {
					clearStore();
					goToLoginIfYouShould(customConfig);
				})
			}
		}

		function goToLoginIfYouShould(FetchCustomConfig: FetchCustomConfig) {
			if (FetchCustomConfig.goToLogin) {
				router.replace("/auth");
			}
		}

		async function handleRefreshToken(error: FetchError, url: string, config: FetchOptions, customConfig: FetchCustomConfig) {
			const authStore = useAuthStore();
			if (!authStore.isLoggedIn) {
				console.error("send request that needs token while user is not logged in: ", url);
				return new Promise((_, reject) => {
					reject(error);
				})
			}
			if (!authStore.isRefreshing) {
				await authStore.doRefreshToken()
			}
			return new Promise((resolve, reject) => {
				watch(() => authStore.isRefreshing, (isRefreshing) => {
					console.log('test isrefreshing', isRefreshing);	
					if (!isRefreshing) {
						console.log("refresh token done, retry request", authStore.isRefreshSuccess, config.params);
						if (authStore.isRefreshSuccess) {
							resolve(myCustomFetch(url, config, customConfig));
						} else {
							reject(error);
						}
					}
				});
			})
		}
	};
	return myCustomFetch;
};

function isValidHttpMethod(method: string): method is HttpMethod {
	const validMethods: HttpMethod[] = [
		"GET",
		"HEAD",
		"PATCH",
		"POST",
		"PUT",
		"DELETE",
		"CONNECT",
		"OPTIONS",
		"TRACE",
	];
	return validMethods.includes(method.toUpperCase() as HttpMethod);
}

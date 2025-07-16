import { BASE_URL } from './api.config';
import {
	plainToInstance,
	instanceToPlain,
	type ClassConstructor,
} from 'class-transformer';
import type { FetchOptions, FetchError } from 'ofetch';
import type { FetchCustomConfig } from './FetchCustomConfig.interface';
import { useAuthStore } from '../auth/Auth.store';

type HttpMethod =
	| 'GET'
	| 'HEAD'
	| 'PATCH'
	| 'POST'
	| 'PUT'
	| 'DELETE'
	| 'CONNECT'
	| 'OPTIONS'
	| 'TRACE';

export const useFetchApi = <R, T = {}>(
	classTransformer?: ClassConstructor<T>
) => {
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
				return instanceToPlain(transformed, {
					excludeExtraneousValues: true,
				}) as unknown as R;
			}

			return response;
		} catch (e: any) {
			customConfig.onError?.(e as FetchError);

			if (customConfig.ignoreErrors) {
				return;
			}

			const getvalidationErros = () => {
				const errors = {} as Record<string, string>;
				if (e?.response?._data && Array.isArray(e.response._data)) {
					e.response._data.forEach((item) => {
						errors[item.field] = item.message;
					});
				}
				return errors;
			};

			if (e.response && e.response.status === 401) {
				try {
					const result = await handleRefreshToken(e, url, config, customConfig);
					if (result) {
						return result;
					}
				} catch (e) {
					authStore.clearStore();
					goToLoginIfYouShould(customConfig);
					throw e;
				}
			}

			if (e.response && e.response.status === 422) {
				if (customConfig.setErrors) {
					customConfig.setErrors(getvalidationErros());
				}
				if (customConfig.onValidationFailed) {
					customConfig.onValidationFailed(getvalidationErros(), e);
				}
				return;
			}
		}

		function goToLoginIfYouShould(FetchCustomConfig: FetchCustomConfig) {
			if (FetchCustomConfig.goToLogin) {
				router.replace('/auth');
			}
		}

		function handleRefreshToken(
			error: FetchError,
			url: string,
			config: FetchOptions,
			customConfig: FetchCustomConfig
		) {
			if (!authStore.isLoggedIn) {
				console.error(
					'send request that needs token while user is not logged in: ',
					url
				);
				return new Promise((_, reject) => {
					reject(error);
				});
			}

			if (!authStore.isTokenRefreshing && !authStore.isTokenRefreshSuccess) {
				authStore.doRefreshToken();
			}

			return new Promise((resolve, reject) => {
				if (authStore.isTokenRefreshSuccess) {
					resolve(myCustomFetch(url, config, customConfig));
				} else {
					watch(
						() => authStore.isTokenRefreshing,
						(isRefreshing) => {
							if (!isRefreshing) {
								if (authStore.isTokenRefreshSuccess) {
									resolve(myCustomFetch(url, config, customConfig));
								} else {
									reject(error);
								}
							}
						}
					);
				}
			});
		}
	};
	return myCustomFetch;
};

function isValidHttpMethod(method: string): method is HttpMethod {
	const validMethods: HttpMethod[] = [
		'GET',
		'HEAD',
		'PATCH',
		'POST',
		'PUT',
		'DELETE',
		'CONNECT',
		'OPTIONS',
		'TRACE',
	];
	return validMethods.includes(method.toUpperCase() as HttpMethod);
}

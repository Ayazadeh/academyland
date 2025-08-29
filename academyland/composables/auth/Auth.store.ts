import { acceptHMRUpdate, defineStore } from 'pinia';
import type { AuthState, Identity, AuthTokens } from './Auth.interface';
import { useIdentityService } from './identity.service';
import { useRefreshTokenService } from './useRefreshToken.service';

const defaultState = (): AuthState => ({
	accessToken: null,
	refreshToken: null,
	expiresIn: null,
	isRefreshing: false,
	isRefreshSuccess: false,
	identity: {} as Identity,
});

export const useAuthStore = defineStore('auth', () => {
	const state = ref<AuthState>(defaultState());

	// getters
	const isLoggedIn = computed(() => !!state.value.accessToken);
	const isTokenRefreshSuccess = computed(() => state.value.isRefreshSuccess);
	const isTokenRefreshing = computed(() => state.value.isRefreshing);
	const getFullName = computed(() =>
		state.value.identity.first_name
			? `${state.value.identity.first_name} ${state.value.identity.last_name}`
			: state.value.identity.username
	);
	const getToken = computed(() => state.value.accessToken);
	const getLocalStoreAccessToken = computed(() => {
		const local = localStorage.getItem('token');
		if (local) {
			return JSON.parse(local).accessToken;
		} else {
			return '';
		}
	});
	const getRefreshToken = computed(() => state.value.refreshToken);
	const getExpiresIn = computed(() => state.value.expiresIn);
	const getIdentity = computed(() => state.value.identity);

	// actions
	const fetchAndSetIdentityIfLoggedIn = async () => {
		const fetchIdentity = useIdentityService();
		if (isLoggedIn.value) {
			const identity = await fetchIdentity();
			if (identity) {
				setIdentity(identity as Identity);
			}
		}
	};

	const setToken = (
		{ accessToken, refreshToken, expiresIn }: AuthTokens,
		setLocalStorage = true
	) => {
		state.value.accessToken = accessToken;
		state.value.refreshToken = refreshToken;
		state.value.expiresIn = expiresIn;
		setLocalStorage &&
			localStorage.setItem(
				'token',
				JSON.stringify({ accessToken, refreshToken, expiresIn })
			);
	};

	const initialStateFromLocalStore = () => {
		const token = localStorage.getItem('token');
		if (token) {
			setToken(JSON.parse(token), false);
		}
	};

	const clearStore = (deleteLocalToken = true) => {
		Object.assign(state.value, defaultState());
		deleteLocalToken && localStorage.removeItem('token');
	};

	const setIdentity = (identity: Identity) => {
		state.value.identity = identity;
	};

	const doRefreshToken = async () => {
		state.value.isRefreshing = true;
		const service = useRefreshTokenService();
		try {
			const response = await service(state.value.refreshToken!);
			if (response !== undefined) {
				setToken(response.tokens, true);
				state.value.isRefreshSuccess = true;
				return response;
			}
		} finally {
			state.value.isRefreshing = false;
		}
	};

	return {
		isLoggedIn,
		isTokenRefreshSuccess,
		isTokenRefreshing,
		getFullName,
		getToken,
		getLocalStoreAccessToken,
		getRefreshToken,
		getExpiresIn,
		getIdentity,
		initialStateFromLocalStore,
		clearStore,
		setIdentity,
		setToken,
		fetchAndSetIdentityIfLoggedIn,
		doRefreshToken,
	};
});

if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));

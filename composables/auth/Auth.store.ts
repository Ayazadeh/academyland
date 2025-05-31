import { acceptHMRUpdate, defineStore } from "pinia";
import type { AuthState, Identity, AuthTokens } from "./Auth.interface";

const defaultState = (): AuthState => ({
	accessToken: null,
	refreshToken: null,
	expiresIn: null,
	isRefreshing: false,
	isRefreshSuccess: false,
	identity: {} as Identity,
});

export const useAuthStore = defineStore("auth", () => {
	const state = ref<AuthState>(defaultState());

	// getters
	const isLoggedIn = computed(() => !!state.value.accessToken);
	const getFullName = computed(() =>
		state.value.identity.first_name
			? `${state.value.identity.first_name} ${state.value.identity.last_name}`
			: state.value.identity.username
	);
	const getToken = computed(() => state.value.accessToken);
	const getLocalStoreAccessToken = computed(() => {
		const local = localStorage.getItem("token");
		if (local) {
			return JSON.parse(local).accessToken;
		} else {
			return "";
		}
	});
	const getRefreshToken = computed(() => state.value.refreshToken);
	const getExpiresIn = computed(() => state.value.expiresIn);

	// actions
	const setToken = (
		{ accessToken, refreshToken, expiresIn }: AuthTokens,
		setLocalStorage = true
	) => {
		state.value.accessToken = accessToken;
		state.value.refreshToken = refreshToken;
		state.value.expiresIn = expiresIn;
		setLocalStorage &&
			localStorage.setItem(
				"token",
				JSON.stringify({ accessToken, refreshToken, expiresIn })
			);
	};

	const initialStateFromLocalStore = () => {
		const token = localStorage.getItem("token");
		if (token) {
			setToken(JSON.parse(token), false);
		}
	};

	const clearStore = (deleteLocalToken = true) => {
		Object.assign(state.value, defaultState());
		deleteLocalToken && localStorage.removeItem("token");
	};

	const setIdentity = (identity: Identity) => {
		state.value.identity = identity;
	};

	return {
		...state.value,
		isLoggedIn,
		getFullName,
        getToken,
        getLocalStoreAccessToken,
        getRefreshToken,
        getExpiresIn,
        initialStateFromLocalStore,
        clearStore,
        setIdentity,
		setToken
	};
});

if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));

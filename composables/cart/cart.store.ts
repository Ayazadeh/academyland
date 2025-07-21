import { acceptHMRUpdate, defineStore } from 'pinia';
import { CartDto } from './cart.dto';
import { useAuthStore } from '../auth/Auth.store';
import { useCartListService, useAddToCartService } from './cart.service';
import { ToastEnum } from '~/types';

const defaultState = () => ({
	data: [] as unknown as CartDto[],
	adding: false,
	fetching: false,
});

export const useCartStore = defineStore('cart', () => {
	const state = ref(defaultState());

	const getCartCount = computed(() => state.value.data.length);
	const getLocalIds = computed(() => {
		const data = localStorage.getItem('cart');
		return data ? JSON.parse(data) : [];
	});

	const fetchCart = async () => {
		state.value.fetching = true;
		if (import.meta.server) {
			throw Error('call fetchCart on server');
		}
		const authStore = useAuthStore();
		const { listWhenLoggedIn, listWhenNotLoggedIn } = useCartListService();
		if (authStore.isLoggedIn) {
			try {
				const response = await listWhenLoggedIn();
				if (response) {
					state.value.data = response as unknown as CartDto[];
				}
			} catch (e) {
				console.error('Error in cart.store.ts1: ', e);
				throw e;
			} finally {
				state.value.fetching = false;
			}
		} else {
			const ids = getLocalIds.value;
			if (ids.length) {
				try {
					const response = await listWhenNotLoggedIn(ids);
					if (response) {
						state.value.data = response as unknown as CartDto[];
					}
				} catch (e) {
					console.error('Error in cart.store.ts2', e);
					throw e;
				} finally {
					state.value.fetching = false;
				}
			} else {
				state.value.fetching = false;
			}
		}
	};

	const isExistInTheCart = (id: number) => {
		return state.value.data.findIndex((item) => item.id === id) != -1;
	};

	const addToCart = async (id: number) => {
		const authStore = useAuthStore();
		const addToCart = useAddToCartService();
		if (authStore.isLoggedIn) {
			state.value.adding = true;
			try {
				const response = await addToCart(id);
				if (response) {
					state.value.data = response as unknown as CartDto[];
				}
			} catch (e) {
				console.error('Error in cart.store.ts3: ', e);
				throw e;
			} finally {
				state.value.adding = false;
			}
		} else {
			const ids = getLocalIds.value;
			const { showToast } = useToast();

			if (isExistInTheCart(id)) {
				showToast({
					message: 'این دوره در سبد خرید شما موجود است',
					type: ToastEnum.ERROR,
				});
				return;
			}

			ids.push(id);
			localStorage.setItem('cart', JSON.stringify(ids));
			await fetchCart();
		}
	};

	const syncIdsToStorage = () => {
		localStorage.setItem('cart', JSON.stringify(state.value.data.map((item) => item.id)))
	}

	return {
		...toRefs(state.value),
		getCartCount,
		fetchCart,
		addToCart,
		syncIdsToStorage,
	};
});

if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));

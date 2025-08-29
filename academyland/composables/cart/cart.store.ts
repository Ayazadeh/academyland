import { acceptHMRUpdate, defineStore } from 'pinia';
import { CartDto } from './cart.dto';
import { useAuthStore } from '../auth/Auth.store';
import {
	useCartListService,
	useAddToCartService,
	useDeleteCartService,
} from './cart.service';
import { ToastEnum } from '~/types';

const defaultState = () => ({
	data: [] as unknown as CartDto[],
	fetching: false,
	fetchedOnce: false,
});

export const useCartStore = defineStore('cart', () => {
	const state = ref(defaultState());

	const getCartCount = computed(() => state.value.data.length);
	const getCartIDs = computed(() => state.value.data.map((item) => item.id));

	const getLocalIds = () => {
		const data = localStorage.getItem('cart');
		return data ? JSON.parse(data) : [];
	};

	const fetchCart = async (): Promise<any> => {
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
				console.error('Error in cart.store.ts 1: ', e);
				throw e;
			} finally {
				state.value.fetching = false;
				state.value.fetchedOnce = true;
			}
		} else {
			const ids = getLocalIds();
			if (ids.length) {
				try {
					const response = await listWhenNotLoggedIn(ids);
					if (response) {
						state.value.data = response as unknown as CartDto[];
					}
				} catch (e) {
					console.error('Error in cart.store.ts 2', e);
					throw e;
				} finally {
					state.value.fetching = false;
					state.value.fetchedOnce = true;
				}
			} else {
				state.value.fetching = false;
				state.value.fetchedOnce = true;
			}
		}
	};

	const isExistInTheCart = (id: number) => {
		return state.value.data.findIndex((item) => item.id === id) != -1;
	};

	const addToCart = async (id: number): Promise<any> => {
		const authStore = useAuthStore();
		const addToCart = useAddToCartService();
		if (authStore.isLoggedIn) {
			try {
				const response = await addToCart(id);
				if (response) {
					state.value.data = response as unknown as CartDto[];
				}
			} catch (e) {
				console.error('Error in cart.store.ts 3: ', e);
				throw e;
			}
		} else {
			const ids = getLocalIds();
			const { showToast } = useToast();

			if (isExistInTheCart(id)) {
				showToast({
					message: 'این دوره در سبد خرید شما موجود است',
					type: ToastEnum.ERROR,
				});
			}

			ids.push(id);
			localStorage.setItem('cart', JSON.stringify(ids));
			await fetchCart();
		}
	};

	const deleteFromCart = async (id: number): Promise<any> => {
		const authStore = useAuthStore();
		const deleteFromCartService = useDeleteCartService();
		if (authStore.isLoggedIn) {
			await deleteFromCartService(id);
		}
		state.value.data = state.value.data.filter((item) => item.id !== id);
		return new Promise((resolve) => {
			resolve(true);
		});
	};

	const syncIdsToStorage = () => {
		localStorage.setItem(
			'cart',
			JSON.stringify(state.value.data.map((item) => item.id))
		);
	};

	return {
		...toRefs(state.value),
		getCartCount,
		getCartIDs,
		fetchCart,
		addToCart,
		syncIdsToStorage,
		deleteFromCart,
		isExistInTheCart,
	};
});

if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));

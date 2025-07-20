import { acceptHMRUpdate, defineStore } from 'pinia';
import { CartDto } from './cart.dto';
import { useAuthStore } from '../auth/Auth.store';
import { useCartListService, useAddToCartService } from './cart.service';

const defaultState = () => ({
	data: [] as unknown as CartDto[],
});

export const useCartStore = defineStore('cart', () => {
	const state = ref(defaultState());

	const getCartCount = computed(() => state.value.data.length);
	const getLocalIds = computed(() => {
		const data = localStorage.getItem('cart');
		return data ? JSON.parse(data) : [];
	});

	const fetchCart = async () => {
		if (import.meta.server) {
			throw Error('call fetchCart on server');
		}
		const authStore = useAuthStore();
		const { listWhenLoggedIn, listWhenNotLoggedIn } = useCartListService();
		if (authStore.isLoggedIn) {
			const response = await listWhenLoggedIn();
			if (response) {
				state.value.data = response as unknown as CartDto[];
			}
		} else {
			const ids = getLocalIds.value;
			if (ids.length) {
				const response = await listWhenNotLoggedIn(ids);
				if (response) {
					state.value.data = response as unknown as CartDto[];
				}
			}
		}
	};

	const addToCart = async (id: number) => {
		const authStore = useAuthStore();
		const addToCart = useAddToCartService();
		if (authStore.isLoggedIn) {
			const response = await addToCart(id);
			if (response) {
				state.value.data = response as unknown as CartDto[];
			}
		} else {
			const ids = getLocalIds.value;
            // TODO: check if id exist in ids show toast error
			ids.push(id);
			localStorage.setItem('cart', ids);
			await fetchCart();
		}
	};
});

if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));

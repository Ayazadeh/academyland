import type { Pinia } from 'pinia';
import { useCartStore } from '~/composables/cart/cart.store';

export default defineNuxtPlugin(({ pinia }) => {
	const cartStore = useCartStore(pinia as Pinia);

	cartStore.$subscribe(() => {
		cartStore.syncIdsToStorage();
	});

	cartStore.fetchCart();
});

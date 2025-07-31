import { useCartStore } from './cart.store';

export const useAddToCart = (id: number) => {
	const adding = useState(`adding-${id}`, () => false);
	const cartStore = useCartStore();

	const addToCart = async () => {
		adding.value = true;
		await cartStore.addToCart(id);
		adding.value = false;
	};

	return {
		addToCart,
		adding,
	};
};

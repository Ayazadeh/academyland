import { useCartStore } from './cart.store';

export const useDeleteFromCart = (id: number) => {
    const deleting = useState(`deleting`, () => false);
	const cartStore = useCartStore();

	const deleteFromCart = async () => {
		deleting.value = true;
		await cartStore.deleteFromCart(id);
		deleting.value = false;
	};

	return {
		deleteFromCart,
		deleting,
	};
};
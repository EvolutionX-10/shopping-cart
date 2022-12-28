import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ShoppingCartContext = createContext({} as ShoppingCartContext);
export function useShoppingCart() {
	return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
		"shopping-cart",
		[]
	);
	const [isOpen, setIsOpen] = useState(false);

	const cartQuantity = cartItems.reduce((a, b) => a + b.quantity, 0);

	function openCart() {
		setIsOpen(true);
	}

	function closeCart() {
		setIsOpen(false);
	}

	function getItemQuantity(id: number) {
		return cartItems.find((i) => i.id === id)?.quantity ?? 0;
	}

	function increaseCartQuantity(id: number) {
		setCartItems((cartItems) => {
			const item = cartItems.find((i) => i.id === id);
			if (item) {
				return cartItems.map((c) =>
					c.id === id ? { ...c, quantity: ++c.quantity } : c
				);
			}
			return [...cartItems, { id, quantity: 1 }];
		});
	}

	function decreaseCartQuantity(id: number) {
		setCartItems((cartItems) => {
			const item = cartItems.find((i) => i.id === id);
			if (!item) return cartItems;
			if (item.quantity > 1) {
				return cartItems.map((c) =>
					c.id === id ? { ...c, quantity: --c.quantity } : c
				);
			}
			return cartItems.filter((i) => i.id !== id);
		});
	}

	function removeFromCart(id: number) {
		return setCartItems((c) => c.filter((i) => i.id !== id));
	}

	return (
		<ShoppingCartContext.Provider
			value={{
				decreaseCartQuantity,
				getItemQuantity,
				increaseCartQuantity,
				removeFromCart,
				cartItems,
				cartQuantity,
				closeCart,
				openCart,
			}}
		>
			{children}
			<ShoppingCart isOpen={isOpen} />
		</ShoppingCartContext.Provider>
	);
}

interface ShoppingCartProviderProps {
	children: ReactNode;
}

interface ShoppingCartContext {
	openCart: () => void;
	closeCart: () => void;
	getItemQuantity: (id: number) => number;
	increaseCartQuantity: (id: number) => void;
	decreaseCartQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
	cartQuantity: number;
	cartItems: CartItem[];
}

interface CartItem {
	id: number;
	quantity: number;
}

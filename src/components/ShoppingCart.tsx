import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import items from "../data/items.json";

export function ShoppingCart({ isOpen }: { isOpen: boolean }) {
	const { closeCart, cartItems } = useShoppingCart();
	return (
		<Offcanvas show={isOpen} placement="end" onHide={closeCart}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Cart</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Stack gap={3}>
					{cartItems.map((item) => (
						<CartItem {...item} />
					))}
					<div className="ms-auto fw-bold fs-5">
						Total{" "}
						{formatCurrency(
							cartItems.reduce((a, b) => {
								const item = items.find((i) => i.id === b.id);
								return (item?.price ?? 0) * b.quantity + a;
							}, 0)
						)}
					</div>
				</Stack>
			</Offcanvas.Body>
		</Offcanvas>
	);
}

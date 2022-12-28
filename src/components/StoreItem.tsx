import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
export function StoreItem(data: StoreItemProps) {
	const {
		getItemQuantity,
		decreaseCartQuantity,
		increaseCartQuantity,
		removeFromCart,
	} = useShoppingCart();

	let quantity = getItemQuantity(data.id);

	return (
		<Card className="h-100">
			<Card.Img
				variant="top"
				src={data.imgUrl}
				height="200px"
				style={{ objectFit: "cover" }}
			/>
			<Card.Body className="d-flex flex-column">
				<Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
					<span className="fs-2">{data.name}</span>
					<span className="ms-2 text-muted">{formatCurrency(data.price)}</span>
				</Card.Title>
				<div className="mt-auto">
					{quantity === 0 ? (
						<Button
							className="w-100"
							onClick={() => increaseCartQuantity(data.id)}
						>
							+ Add to Cart
						</Button>
					) : (
						<div
							className="d-flex align-items-center flex-column"
							style={{ gap: ".5rem" }}
						>
							<div
								className="d-flex align-items-center justify-content-center"
								style={{ gap: ".5rem" }}
							>
								<Button onClick={() => decreaseCartQuantity(data.id)}>-</Button>
								<div>
									<span className="fs-3">{quantity}</span> in cart
								</div>
								<Button onClick={() => increaseCartQuantity(data.id)}>+</Button>
							</div>
							<Button
								variant="danger"
								size="sm"
								onClick={() => removeFromCart(data.id)}
							>
								Remove
							</Button>
						</div>
					)}
				</div>
			</Card.Body>
		</Card>
	);
}

type StoreItemProps = typeof storeItems[0];

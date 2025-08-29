"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const mockCart = [
	{
		id: 1,
		name: "Vinilo: Pink Floyd – The Wall",
		price: 1200,
		image: "/images/pinkfloyd.jpg",
		quantity: 1,
	},
	{
		id: 2,
		name: "CD: Led Zeppelin – IV",
		price: 450,
		image: "/images/ledzep.jpg",
		quantity: 2,
	},
];

interface CartDrawerProps {
	open: boolean;
	onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
	const [cart, setCart] = useState(mockCart);
	const router = useRouter();
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		setIsDark(document.documentElement.classList.contains("dark"));
	}, []);

	const handleQuantity = (id: number, delta: number) => {
		setCart((cart) =>
			cart
				.map((item) =>
					item.id === id
						? { ...item, quantity: Math.max(1, item.quantity + delta) }
						: item
				)
				.filter((item) => item.quantity > 0)
		);
	};

	const handleRemove = (id: number) => {
		setCart((cart) => cart.filter((item) => item.id !== id));
	};

	const total = cart.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				right: open ? 0 : "-420px",
				width: "360px",
				height: "100vh",
				background: "var(--section)",
				color: "var(--text)",
				boxShadow: "var(--shadow)",
				transition: "right 0.35s cubic-bezier(.77,0,.175,1)",
				zIndex: 9999,
				display: "flex",
				flexDirection: "column",
				borderLeft: `2px solid var(--border)`,
				borderRadius: "16px 0 0 16px",
			}}
		>
			{/* Header */}
			<div
				style={{
					padding: "22px 24px 10px 24px",
					borderBottom: "1px solid var(--border)",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					background: "var(--card)",
					borderTopLeftRadius: "16px",
				}}
			>
				<span
					style={{
						fontWeight: "bold",
						fontSize: "1.2rem",
						color: "var(--accent)",
						letterSpacing: "1px",
					}}
				>
					Tu carrito
				</span>
				<button
					aria-label="Cerrar"
					onClick={onClose}
					style={{
						background: "none",
						border: "none",
						fontSize: "1.6rem",
						color: "var(--accent)",
						cursor: "pointer",
						fontWeight: "bold",
						borderRadius: "50%",
						width: 32,
						height: 32,
						transition: "background 0.2s",
					}}
					onMouseOver={(e) => (e.currentTarget.style.background = "var(--section)")}
					onMouseOut={(e) => (e.currentTarget.style.background = "none")}
				>
					×
				</button>
			</div>
			{/* Cart Items */}
			<div
				style={{
					flex: 1,
					overflowY: "auto",
					padding: "18px 24px",
					display: "flex",
					flexDirection: "column",
					gap: "22px",
					background: "var(--section)",
				}}
			>
				{cart.length === 0 ? (
					<div
						style={{
							textAlign: "center",
							marginTop: "60px",
							color: "var(--accent)",
							fontWeight: "bold",
							fontSize: "1.1rem",
						}}
					>
						El carrito está vacío.
					</div>
				) : (
					cart.map((item) => (
						<div
							key={item.id}
							style={{
								display: "flex",
								alignItems: "center",
								background: "var(--card)",
								borderRadius: "12px",
								boxShadow: "var(--shadow)",
								padding: "12px",
								gap: "16px",
								border: "1px solid var(--border)",
								position: "relative",
								transition: "box-shadow 0.2s, border 0.2s",
							}}
							className="cart-item-card"
						>
							{/* Product Image */}
							<img
								src={item.image}
								alt={item.name}
								style={{
									width: "64px",
									height: "64px",
									objectFit: "cover",
									borderRadius: "8px",
									border: "1px solid var(--border)",
									background: "var(--card)",
									boxShadow: "var(--shadow)",
								}}
							/>
							{/* Details */}
							<div style={{ flex: 1, minWidth: 0 }}>
								<div
									style={{
										fontWeight: "bold",
										fontSize: "1rem",
										color: "var(--accent)",
										marginBottom: 2,
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
									}}
									title={item.name}
								>
									{item.name}
								</div>
								<div
									style={{
										fontSize: "0.97rem",
										color: "var(--muted)",
										fontWeight: 500,
									}}
								>
									${item.price} x {item.quantity}
								</div>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: "10px",
										marginTop: 8,
									}}
								>
									<button
										onClick={() => handleQuantity(item.id, -1)}
										style={{
											background: "var(--accent)",
											border: "none",
											color: "var(--bg)",
											borderRadius: "50%",
											width: 28,
											height: 28,
											fontWeight: "bold",
											cursor: "pointer",
											fontSize: "1.1rem",
											boxShadow: "var(--shadow)",
											transition: "background 0.2s",
										}}
										onMouseOver={(e) => (e.currentTarget.style.background = "var(--muted)")}
										onMouseOut={(e) => (e.currentTarget.style.background = "var(--accent)")}
									>
										-
									</button>
									<span
										style={{
											minWidth: 18,
											textAlign: "center",
											fontWeight: "bold",
											color: "var(--accent)",
										}}
									>
										{item.quantity}
									</span>
									<button
										onClick={() => handleQuantity(item.id, 1)}
										style={{
											background: "var(--accent)",
											border: "none",
											color: "var(--bg)",
											borderRadius: "50%",
											width: 28,
											height: 28,
											fontWeight: "bold",
											cursor: "pointer",
											fontSize: "1.1rem",
											boxShadow: "var(--shadow)",
											transition: "background 0.2s",
										}}
										onMouseOver={(e) => (e.currentTarget.style.background = "var(--muted)")}
										onMouseOut={(e) => (e.currentTarget.style.background = "var(--accent)")}
									>
										+
									</button>
									<button
										aria-label="Eliminar"
										onClick={() => handleRemove(item.id)}
										style={{
											background: "none",
											border: "none",
											color: "#b80000",
											fontWeight: "bold",
											fontSize: "1.2rem",
											cursor: "pointer",
											marginLeft: 8,
											borderRadius: "50%",
											width: 28,
											height: 28,
											transition: "background 0.2s",
										}}
										onMouseOver={(e) => (e.currentTarget.style.background = "var(--card)")}
										onMouseOut={(e) => (e.currentTarget.style.background = "none")}
									>
										🗑️
									</button>
								</div>
							</div>
						</div>
					))
				)}
			</div>
			{/* Total & Checkout */}
			<div
				style={{
					borderTop: "1px solid var(--border)",
					padding: "22px 24px",
					background: "var(--card)",
					borderBottomLeftRadius: "16px",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: "12px",
						fontWeight: "bold",
						color: "var(--accent)",
						fontSize: "1.13rem",
						letterSpacing: "1px",
					}}
				>
					<span>Total</span>
					<span>${total}</span>
				</div>
				<button
					style={{
						width: "100%",
						padding: "14px",
						background: "var(--accent)",
						color: "var(--bg)",
						border: "none",
						borderRadius: "8px",
						fontWeight: "bold",
						fontSize: "1.08rem",
						cursor: "pointer",
						letterSpacing: "1px",
						boxShadow: "var(--shadow)",
						transition: "background 0.2s, color 0.2s, transform 0.2s",
					}}
					onClick={() => {
						onClose();
						router.push("/checkout");
					}}
					onMouseOver={(e) => (e.currentTarget.style.background = "var(--muted)")}
					onMouseOut={(e) => (e.currentTarget.style.background = "var(--accent)")}
				>
					Checkout
				</button>
			</div>
			<style>
				{`
          .cart-item-card:hover {
            box-shadow: 0 8px 32px var(--shadow), 0 2px 12px var(--shadow);
            border: 1.5px solid var(--accent);
          }
          @media (max-width: 600px) {
            div[style*="position:fixed"] {
              width: 98vw !important;
              right: ${open ? "0" : "-100vw"} !important;
              borderRadius: "0";
            }
          }
        `}
			</style>
		</div>
	);
};

export default CartDrawer;
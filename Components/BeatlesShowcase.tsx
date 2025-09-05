"use client";
import { useEffect, useState } from "react";
import { getProductsWithImages } from "../utils/supabaseProducts";
import { useRouter } from "next/navigation";

const BeatlesShowcase = () => {
	const [beatlesProducts, setBeatlesProducts] = useState<any[]>([]);
	const [isDark, setIsDark] = useState(false);
	const [mounted, setMounted] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setMounted(true);
		if (typeof window !== "undefined") {
			setIsDark(document.documentElement.classList.contains("dark"));
		}
		async function fetchBeatles() {
			const allProducts = await getProductsWithImages();
			setBeatlesProducts(
				allProducts.filter(
					(p: any) => p.beatlesShowcase === true && p.beatlesFeatured === true
				)
			);
		}
		fetchBeatles();
	}, []);

	if (!mounted) return null; // Prevent SSR hydration mismatch

	return (
		<section
			style={{
				background: "var(--section)",
				color: "var(--text)",
				borderRadius: "20px",
				margin: "56px auto 40px",
				maxWidth: "1200px",
				padding: "56px 0 48px",
				boxShadow: "var(--shadow)",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Beatles Specialist Ribbon */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: "50%",
					transform: "translateX(-50%)",
					background: "linear-gradient(90deg, #E6B800 60%, #FFD700 100%)",
					color: "#222",
					fontWeight: "bold",
					fontSize: "1.1rem",
					padding: "8px 32px",
					borderRadius: "0 0 18px 18px",
					boxShadow: "0 2px 8px #E6B800",
					zIndex: 10,
					letterSpacing: "1px",
				}}
			>
				<span role="img" aria-label="beatles">
					🎤
				</span>{" "}
				Especialistas en The Beatles
			</div>
			{/* Trust badge */}
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginBottom: 18,
					zIndex: 3,
					position: "relative",
					marginTop: 48,
				}}
			>
				<span
					style={{
						background: "linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)",
						color: "#222",
						fontWeight: "bold",
						borderRadius: "16px",
						padding: "6px 22px",
						fontSize: "1rem",
						boxShadow: "0 1px 6px rgba(0,0,0,0.13)",
						letterSpacing: "0.5px",
						border: "2px solid #E6B800",
						display: "inline-flex",
						alignItems: "center",
						gap: 8,
					}}
				>
					<span
						role="img"
						aria-label="star"
						style={{
							filter: isDark ? "drop-shadow(0 0 2px #000)" : "none",
							color: isDark ? "#b8860b" : "#FFD700",
							fontSize: "1.1em",
						}}
					>
						⭐
					</span>
					+500 ventas &nbsp;|&nbsp; Garantía de autenticidad
				</span>
			</div>
			<h2
				style={{
					textAlign: "center",
					fontSize: "2.7rem",
					fontWeight: "bold",
					marginBottom: "22px",
					letterSpacing: "1.5px",
					color: "var(--text)",
					textShadow: "0 2px 8px var(--bg)",
					zIndex: 3,
					position: "relative",
				}}
			>
				🎸 The Beatles Collection
			</h2>
			<p
				style={{
					textAlign: "center",
					color: "var(--muted)",
					fontSize: "1.25rem",
					marginBottom: "38px",
					opacity: 0.95,
					fontWeight: 500,
				}}
			>
				Descubre nuestra exclusiva selección de vinilos, box sets y ediciones
				especiales de <b>The Beatles</b>. ¡Solo en Artmusic!
			</p>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "28px",
					justifyContent: "center",
					padding: "0 16px 18px 16px",
					zIndex: 3,
					position: "relative",
				}}
			>
				{beatlesProducts.length === 0 ? (
					<div
						style={{
							color: "var(--muted)",
							fontWeight: "bold",
							fontSize: "1.1rem",
							padding: 24,
						}}
					>
						No hay productos Beatles registrados.
					</div>
				) : (
					beatlesProducts.map((item: any) => (
						<div
							key={item.id}
							style={{
								minWidth: 260,
								maxWidth: 340,
								flex: "1 1 300px",
								backgroundColor: "var(--card)",
								borderRadius: "18px",
								boxShadow: "var(--shadow)",
								padding: "24px 12px 28px",
								textAlign: "center",
								position: "relative",
								transition: "transform 0.25s, box-shadow 0.25s",
								border: "3px solid var(--border)",
								margin: "12px 0",
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
							}}
							className="beatles-card"
						>
							{item.badge && (
								<span
									style={{
										position: "absolute",
										top: 18,
										left: 18,
										background: "linear-gradient(90deg, #FFD700 60%, #fffbe6 100%)",
										color: "#222",
										fontWeight: "bold",
										borderRadius: "8px",
										padding: "4px 16px",
										fontSize: "1rem",
										boxShadow: "0 1px 6px rgba(0,0,0,0.13)",
										letterSpacing: "0.5px",
										zIndex: 2,
									}}
								>
									{item.badge}
								</span>
							)}
							{item.images && item.images.length > 0 ? (
								<div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
									{item.images.map((img: string, idx: number) => (
										<img
											key={idx}
											src={img}
											alt={`${item.title} img${idx + 1}`}
											style={{
												width: "80px",
												height: "80px",
												objectFit: "cover",
												borderRadius: "8px",
												boxShadow: "var(--shadow)",
												marginBottom: "4px",
											}}
										/>
									))}
								</div>
							) : (
								<div
									style={{
										width: "100%",
										height: "80px",
										borderRadius: "8px",
										background: "var(--section)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										color: "var(--muted)",
										fontWeight: "bold",
										fontSize: "1.1rem",
										marginBottom: "16px",
									}}
								>
									Sin imagen
								</div>
							)}
							<h3
								style={{
									margin: "18px 0 6px",
									color: "var(--text)",
									fontWeight: 700,
									fontSize: "1.18rem",
									minHeight: "2.2em",
								}}
							>
								{item.title}
							</h3>
							<div
								style={{
									color: "var(--muted)",
									fontSize: "1.08rem",
									marginBottom: 4,
								}}
							>
								{item.artist}
							</div>
							<div style={{ fontSize: "1.05rem", marginBottom: 4 }}>
								<b>Tipo:</b> {item.tipo}
							</div>
							<p
								style={{
									margin: 0,
									fontWeight: "bold",
									color: "var(--accent)",
									fontSize: "1.13rem",
								}}
							>
								${item.price}
							</p>
							<button
								style={{
									marginTop: 16,
									background: "var(--accent)",
									color: "var(--bg)",
									borderRadius: "8px",
									padding: "10px 18px",
									fontWeight: "bold",
									fontSize: "1.05rem",
									border: "none",
									cursor: "pointer",
									boxShadow: "var(--shadow)",
									transition: "background 0.2s, color 0.2s",
									display: "inline-block",
								}}
								onClick={() => router.push(`/beatles/${item.id}`)}
							>
								Ver más
							</button>
						</div>
					))
				)}
			</div>
			{/* Highlighted call-to-action button */}
			<div style={{ textAlign: "center", marginTop: 44 }}>
				<button
					onClick={() => router.push("/beatles")}
					style={{
						background: "var(--accent)",
						color: "var(--bg)",
						borderRadius: "12px",
						padding: "18px 44px",
						fontWeight: "bold",
						fontSize: "1.18rem",
						border: "none",
						boxShadow: "0 2px 12px var(--shadow)",
						transition: "background 0.2s, color 0.2s",
						display: "inline-block",
						cursor: "pointer",
					}}
				>
					Ver toda la colección de The Beatles &rarr;
				</button>
			</div>
			<style>
				{`
          .beatles-card:hover {
            transform: scale(1.045);
            box-shadow: 0 8px 32px #FFD700, 0 2px 12px #FFD700;
            border: 3px solid #FFD700;
          }
          @media (max-width: 900px) {
            .beatles-card {
              min-width: 70vw;
              max-width: 80vw;
            }
          }
          @media (max-width: 600px) {
            .beatles-card {
              min-width: 90vw;
              max-width: 95vw;
              padding: 14px 6px 18px;
            }
          }
        `}
			</style>
		</section>
	);
};

export default BeatlesShowcase;
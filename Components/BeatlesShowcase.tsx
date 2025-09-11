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
			setIsDark(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
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
					position: "relative",
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
					zIndex: 10,
					marginBottom: 0,
					height: 0,
				}}
			>
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
						letterSpacing: "1px",
						textAlign: "center",
						minWidth: "220px",
						maxWidth: "90vw",
						zIndex: 11,
						marginBottom: "0px",
					}}
					className="beatles-ribbon"
				>
					<span role="img" aria-label="beatles">
						🎤
					</span>{" "}
					Especialistas en The Beatles
				</div>
			</div>
			{/* Trust badge */}
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginBottom: 18,
					zIndex: 3,
					position: "relative",
					marginTop: 56, // Increased margin to prevent collision
					width: "100%",
				}}
				className="beatles-trust-badge"
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
						maxWidth: "90vw",
						overflow: "hidden",
						textAlign: "center",
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
				className="beatles-showcase-title"
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
				className="beatles-showcase-desc"
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
								width: "100%",
								flex: "1 1 320px",
								backgroundColor: "var(--card)",
								borderRadius: "18px",
								boxShadow: "var(--shadow)",
								padding: "0 0 28px 0",
								textAlign: "left",
								position: "relative",
								transition: "transform 0.25s, box-shadow 0.25s, border 0.25s",
								border: "2px solid var(--border)",
								margin: "12px 0",
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-start",
								overflow: "hidden",
								alignItems: "stretch",
								background: "var(--card)",
								cursor: "pointer",
							}}
							className="beatles-card"
							onClick={() => router.push(`/albumdetails/${item.id}`)}
						>
							{/* Badge top left */}
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
										zIndex: 3, // Ensure badge is above image
									}}
								>
									{item.badge}
								</span>
							)}
							{/* Large main image - covers top of cart */}
							<div
								style={{
									width: "100%",
									height: "180px",
									overflow: "hidden",
									borderTopLeftRadius: "18px",
									borderTopRightRadius: "18px",
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									margin: 0,
									padding: 0,
									zIndex: 2,
								}}
							>
								<img
									src={item.images?.[0] || ""}
									alt={item.title}
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
										borderTopLeftRadius: "18px",
										borderTopRightRadius: "18px",
										borderBottomLeftRadius: 0,
										borderBottomRightRadius: 0,
										boxShadow: "var(--shadow)",
										background: "var(--card)",
										display: "block",
										margin: 0,
										transition: "transform 0.2s, box-shadow 0.2s",
									}}
									className="beatles-main-img"
								/>
							</div>
							{/* Info below image */}
							<div
								style={{
									padding: "198px 18px 0 18px", // 180px for image + 18px gap
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									gap: "10px",
								}}
							>
								<div style={{
									fontWeight: 700,
									fontSize: "1.18rem",
									color: "var(--accent)",
									lineHeight: "1.2",
									textAlign: "left",
								}}>
									{item.title}
								</div>
								<div style={{
									fontSize: "1.05rem",
									color: "var(--muted)",
									fontWeight: 500,
								}}>
									{item.artist}
								</div>
								<div style={{
									fontSize: "0.98rem",
									color: "var(--muted)",
								}}>
									{item.genero}
								</div>
								<div style={{
									fontSize: "0.98rem",
									color: "var(--muted)",
								}}>
									{item.tipo}
								</div>
								<div style={{
									fontWeight: "bold",
									color: "var(--accent)",
									fontSize: "1.18rem",
									margin: "8px 0 0 0",
								}}>
									${item.price}
								</div>
							</div>
						</div>
					))
				)}
			</div>
			{/* Highlighted call-to-action button */}
			<div style={{ textAlign: "center", marginTop: 44 }}>
				<button
					onClick={() => router.push("/beatles")}
					className="beatles-cta-btn"
					style={{
						background: "var(--accent)",
						color: "var(--bg)",
						borderRadius: "12px",
						padding: "18px 44px",
						fontWeight: "bold",
						fontSize: "1.18rem",
						border: "none",
						boxShadow: "0 2px 12px var(--shadow)",
						transition: "background 0.2s, color 0.2s, box-shadow 0.25s, transform 0.25s",
						display: "inline-block",
						cursor: "pointer",
						letterSpacing: "1px",
					}}
				>
					Ver toda la colección de The Beatles &rarr;
				</button>
			</div>
			<style>
				{`
          .beatles-ribbon {
            margin-bottom: 0px;
          }
          .beatles-trust-badge {
            margin-top: 56px;
          }
          @media (max-width: 900px) {
            .beatles-ribbon {
              margin-bottom: 0px !important;
            }
            .beatles-trust-badge {
              margin-top: 68px !important;
            }
          }
          @media (max-width: 600px) {
            .beatles-ribbon {
              margin-bottom: 0px !important;
            }
            .beatles-trust-badge {
              margin-top: 80px !important;
            }
          }
          .beatles-card {
            background: var(--card);
            border: 2px solid var(--border);
            box-shadow: var(--shadow);
            transition: transform 0.25s, box-shadow 0.25s, border 0.25s;
            position: relative;
            overflow: hidden;
          }
          .beatles-card:hover {
            transform: translateY(-8px) scale(1.04);
            box-shadow: 0 12px 36px #111, 0 2px 12px #fff !important;
            border: 2px solid var(--accent) !important;
            background: var(--card);
          }
          .beatles-main-img {
            width: 100% !important;
            height: 180px !important;
            object-fit: cover !important;
            border-radius: 14px !important;
            box-shadow: var(--shadow);
            margin: 0 auto;
            display: block;
            transition: transform 0.2s, box-shadow 0.2s;
            position: relative;
            z-index: 2;
          }
          .beatles-main-img:hover {
            transform: scale(1.04);
            box-shadow: 0 4px 24px #fff;
          }
          .beatles-showcase-title {
            font-size: 2.7rem;
          }
          .beatles-showcase-desc {
            font-size: 1.25rem;
          }
          .beatles-cta-btn {
            background: var(--accent);
            color: var(--bg);
            border-radius: 12px;
            padding: 18px 44px;
            font-weight: bold;
            font-size: 1.18rem;
            border: none;
            box-shadow: 0 2px 12px var(--shadow);
            transition: background 0.2s, color 0.2s, box-shadow 0.25s, transform 0.25s;
            display: inline-block;
            cursor: pointer;
            letter-spacing: 1px;
          }
          .beatles-cta-btn:hover {
            box-shadow: 0 12px 36px #111, 0 2px 12px #fff !important;
            transform: translateY(-4px) scale(1.04);
            background: var(--accent);
            color: var(--bg);
          }
          @media (max-width: 900px) {
            .beatles-cta-btn {
              font-size: 1rem !important;
              padding: 12px 22px !important;
            }
          }
          @media (max-width: 600px) {
            .beatles-cta-btn {
              font-size: 0.92rem !important;
              padding: 8px 10px !important;
              border-radius: 8px !important;
            }
          }
          @media (max-width: 900px) {
            .beatles-showcase-title {
              font-size: 2rem !important;
            }
            .beatles-showcase-desc {
              font-size: 1.08rem !important;
              margin-bottom: 24px !important;
            }
          }
          @media (max-width: 600px) {
            .beatles-showcase-title {
              font-size: 1.35rem !important;
              margin-bottom: 12px !important;
            }
            .beatles-showcase-desc {
              font-size: 0.98rem !important;
              margin-bottom: 14px !important;
            }
          }
        `}
			</style>
		</section>
	);
};

export default BeatlesShowcase;
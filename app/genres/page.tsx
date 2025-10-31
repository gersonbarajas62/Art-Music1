"use client";
import { useEffect, useState } from "react";
import { getProductsWithImages } from "../../utils/supabaseProducts";
import { useRouter } from "next/navigation";

function slugify(text: string) {
	// simple slugifier matching other routes
	return String(text || "")
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");
}

export default function GenresIndexPage() {
	const [genres, setGenres] = useState<{ name: string; sampleImage?: string }[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		let mounted = true;
		(async () => {
			setLoading(true);
			const all = await getProductsWithImages();
			const map = new Map<string, string | undefined>();
			for (const p of all) {
				if (!p.genero) continue;
				const name = String(p.genero).trim();
				if (!map.has(name)) map.set(name, p.images?.[0]);
			}
			if (!mounted) return;
			const list = Array.from(map.entries()).map(([name, sampleImage]) => ({ name, sampleImage }));
			list.sort((a, b) => a.name.localeCompare(b.name));
			setGenres(list);
			setLoading(false);
		})();
		return () => { mounted = false; };
	}, []);

	return (
		<section style={{
			background: "var(--section)",
			color: "var(--text)",
			borderRadius: "20px",
			margin: "40px auto",
			maxWidth: "1200px",
			padding: "48px 24px",
			boxShadow: "var(--shadow)",
			position: "relative",
		}}>
			<h2 style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "2.3rem", marginBottom: 24, textAlign: "center", textShadow: "0 2px 8px var(--bg)" }}>
				Géneros
			</h2>

			{loading ? (
				<div style={{ textAlign: "center", color: "var(--muted)" }}>Cargando géneros...</div>
			) : genres.length === 0 ? (
				<div style={{ textAlign: "center", color: "var(--muted)" }}>No se encontraron géneros.</div>
			) : (
				<div style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "28px",
					justifyContent: "center",
					padding: "8px 8px 24px 8px",
				}}>
					{genres.map(g => (
						<div
							key={g.name}
							className="beatles-card"
							onClick={() => router.push(`/genres/${slugify(g.name)}`)}
							style={{
								minWidth: 220,
								maxWidth: 340,
								width: "100%",
								flex: "1 1 260px",
								backgroundColor: "var(--card)",
								borderRadius: "18px",
								boxShadow: "var(--shadow)",
								padding: "0 0 18px 0",
								textAlign: "left",
								position: "relative",
								transition: "transform 0.25s, box-shadow 0.25s, border 0.25s",
								border: "2px solid var(--border)",
								margin: "12px 0",
								overflow: "hidden",
								cursor: "pointer",
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-start",
							}}
						>
							{/* Large main image - covers top of card (180px like other pages) */}
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
								{g.sampleImage ? (
									<img
										src={g.sampleImage}
										alt={g.name}
										className="beatles-main-img"
										style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.2s, box-shadow 0.2s" }}
									/>
								) : (
									<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--section)", color: "var(--muted)", fontWeight: 700 }}>
										{g.name}
									</div>
								)}
							</div>
							{/* Info below image, using same padding as product cards */}
							<div style={{ padding: "198px 18px 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
								<div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--accent)" }}>{g.name}</div>
								<div style={{ fontSize: "0.95rem", color: "var(--muted)" }}>Ver todos los álbumes</div>
							</div>
						</div>
					))}
				</div>
			)}

			<style>{`
				.beatles-card {
					background: var(--card);
					border: 2px solid var(--border);
					box-shadow: var(--shadow);
					transition: transform 0.25s, box-shadow 0.25s, border 0.25s;
					position: relative;
					overflow: hidden;
				}
				/* Light mode: black shadow and accent border on hover */
				.beatles-card:hover {
					transform: translateY(-8px) scale(1.04);
					box-shadow: 0 12px 36px #111, 0 2px 12px #fff !important;
					border: 2px solid var(--accent) !important;
					background: var(--card);
				}
				/* Dark mode: white shadow and accent border on hover */
				.dark .beatles-card:hover {
					transform: translateY(-8px) scale(1.04);
					box-shadow: 0 12px 36px #fff, 0 2px 12px #fff !important;
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
 				@media (max-width: 900px) {
-					.genre-card { min-width: 70vw; max-width: 80vw; }
+					.beatles-card { min-width: 70vw; max-width: 80vw; }
 				}
 				@media (max-width: 600px) {
-					.genre-card { min-width: 95vw; max-width: 98vw; }
+					.beatles-card { min-width: 95vw; max-width: 98vw; padding: 10px 4px 14px; }
 				}
 			`}</style>
		</section>
	);
}

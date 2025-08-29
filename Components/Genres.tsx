"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const mockGenres = [
	{
		id: 1,
		name: "Rock",
		image: "/images/genres/rock.jpg",
		artists: [
			{
				name: "Queen",
				items: [
					{ title: "A Night at the Opera", type: "Vinilo", price: 800, image: "/images/queen.jpg" },
					{ title: "Greatest Hits", type: "CD", price: 350, image: "/images/queen.jpg" },
				],
			},
			{
				name: "The Beatles",
				items: [
					{ title: "Abbey Road", type: "Vinilo", price: 1100, image: "/images/beatles.jpg" },
				],
			},
		],
	},
	{
		id: 2,
		name: "Metal",
		image: "/images/genres/metal.jpg",
		artists: [
			{
				name: "Metallica",
				items: [
					{ title: "Black Album", type: "CD", price: 400, image: "/images/metallica.jpg" },
				],
			},
			{
				name: "Iron Maiden",
				items: [
					{ title: "The Number of the Beast", type: "Vinilo", price: 950, image: "/images/maiden.jpg" },
				],
			},
		],
	},
	{
		id: 3,
		name: "Pop",
		image: "/images/genres/pop.jpg",
		artists: [
			{
				name: "Michael Jackson",
				items: [
					{ title: "Thriller", type: "Vinilo", price: 1200, image: "/images/mj.jpg" },
				],
			},
		],
	},
	{
		id: 4,
		name: "Rock Latino",
		image: "/images/genres/latino.jpg",
		artists: [
			{
				name: "Soda Stereo",
				items: [
					{ title: "Signos", type: "CD", price: 320, image: "/images/soda.jpg" },
				],
			},
		],
	},
];

const Genres = () => {
	const [search, setSearch] = useState("");
	const [selectedGenre, setSelectedGenre] = useState<any | null>(null);
	const [selectedArtist, setSelectedArtist] = useState<any | null>(null);
	const router = useRouter();

	const isDark =
		typeof window !== "undefined" &&
		document.documentElement.classList.contains("dark");

	const filteredGenres = mockGenres.filter((g) =>
		g.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<section
			style={{
				backgroundColor: "var(--vsc-bg)",
				color: "var(--vsc-foreground)",
				padding: "48px 0px",
				borderRadius: "18px",
				margin: "40px auto",
				maxWidth: "1400px",
				boxShadow: isDark
					? "0 8px 24px rgba(0,0,0,0.8)"
					: "0 8px 24px rgba(0,0,0,0.13)",
				animation: "fadeIn 1.2s cubic-bezier(.77,0,.175,1)",
				animationFillMode: "forwards",
				opacity: 1,
				position: "relative",
			}}
		>
			<h2
				style={{
					fontSize: "2rem",
					fontWeight: "bold",
					color: "#FFD700",
					marginBottom: "32px",
					textAlign: "center",
					textShadow: !isDark
						? "2px 2px 0 #000, 0 0 8px #FFD700"
						: "0 0 8px #FFD700",
				}}
			>
				Explora por Género
			</h2>
			{/* Search/filter bar */}
			<div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
				<input
					type="text"
					placeholder="Buscar género..."
					value={search}
					onChange={e => setSearch(e.target.value)}
					style={{
						padding: "14px 18px",
						borderRadius: "8px",
						border: "1px solid #FFD700",
						fontSize: "1.1rem",
						width: 320,
						background: isDark ? "#232323" : "#fff",
						color: isDark ? "#FFD700" : "#222",
						outline: "none",
						boxShadow: isDark
							? "0 2px 8px rgba(0,0,0,0.45)"
							: "0 2px 8px rgba(0,0,0,0.08)",
						marginRight: 8,
					}}
				/>
			</div>
			{/* Genre grid */}
			{!selectedGenre && (
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
						gap: "32px",
						padding: "0 32px",
					}}
				>
					{filteredGenres.map((genre) => (
						<div
							key={genre.id}
							style={{
								background: isDark ? "#232323" : "#fff",
								borderRadius: "14px",
								boxShadow: isDark
									? "0 2px 8px rgba(0,0,0,0.45)"
									: "0 2px 8px rgba(0,0,0,0.08)",
								padding: "24px 18px",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								position: "relative",
								cursor: "pointer",
								transition: "transform 0.2s, box-shadow 0.2s",
								minHeight: 320,
							}}
							onClick={() => setSelectedGenre(genre)}
							tabIndex={0}
							aria-label={`Ver artistas de ${genre.name}`}
						>
							<img
								src={genre.image}
								alt={genre.name}
								style={{
									width: "100px",
									height: "100px",
									objectFit: "cover",
									borderRadius: "50%",
									border: "2px solid #FFD700",
									marginBottom: "18px",
									background: "#fff",
								}}
							/>
							<div
								style={{
									fontWeight: "bold",
									color: "#FFD700",
									fontSize: "1.2rem",
									textShadow: !isDark
										? "1px 1px 0 #000, 0 0 6px #FFD700"
										: "0 0 6px #FFD700",
									marginBottom: 12,
									textAlign: "center",
								}}
							>
								{genre.name}
							</div>
							<button
								style={{
									marginTop: "auto",
									padding: "10px 20px",
									borderRadius: "8px",
									border: "none",
									backgroundColor: "#FFD700",
									color: "#000",
									fontWeight: "bold",
									fontSize: "1rem",
									cursor: "pointer",
									textTransform: "uppercase",
									boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
									letterSpacing: "1px",
									transition: "background-color 0.3s, transform 0.3s",
									width: "100%",
								}}
								onClick={e => {
									e.stopPropagation();
									setSelectedGenre(genre);
								}}
							>
								Ver artistas
							</button>
						</div>
					))}
				</div>
			)}

			{/* Artists modal/section */}
			{selectedGenre && !selectedArtist && (
				<div
					style={{
						margin: "0 auto",
						maxWidth: 700,
						background: isDark ? "#181818" : "#fffbe6",
						borderRadius: 16,
						boxShadow: isDark
							? "0 2px 8px rgba(0,0,0,0.45)"
							: "0 2px 8px rgba(0,0,0,0.08)",
						padding: "36px 28px",
						marginTop: 32,
						textAlign: "center",
						position: "relative",
					}}
				>
					<button
						onClick={() => setSelectedGenre(null)}
						style={{
							position: "absolute",
							top: 12,
							right: 18,
							background: "none",
							border: "none",
							color: "#FFD700",
							fontSize: 22,
							cursor: "pointer",
							fontWeight: "bold",
						}}
						aria-label="Cerrar"
					>
						×
					</button>
					<h3
						style={{
							fontSize: "1.3rem",
							fontWeight: "bold",
							color: "#FFD700",
							marginBottom: "18px",
							textShadow: !isDark
								? "1px 1px 0 #000, 0 0 6px #FFD700"
								: "0 0 6px #FFD700",
						}}
					>
						Artistas de {selectedGenre.name}
					</h3>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
						{selectedGenre.artists.map((artist: any) => (
							<button
								key={artist.name}
								style={{
									padding: "14px 22px",
									borderRadius: "8px",
									border: "1px solid #FFD700",
									background: isDark ? "#232323" : "#fff",
									color: "#FFD700",
									fontWeight: "bold",
									fontSize: "1rem",
									cursor: "pointer",
									marginBottom: 8,
									marginTop: 8,
									minWidth: 120,
									transition: "background 0.2s, color 0.2s",
								}}
								onClick={() => setSelectedArtist(artist)}
							>
								{artist.name}
							</button>
						))}
					</div>
				</div>
			)}

			{/* CDs/vinyls for selected artist */}
			{selectedArtist && (
				<div
					style={{
						margin: "0 auto",
						maxWidth: 900,
						background: isDark ? "#181818" : "#fffbe6",
						borderRadius: 16,
						boxShadow: isDark
							? "0 2px 8px rgba(0,0,0,0.45)"
							: "0 2px 8px rgba(0,0,0,0.08)",
						padding: "36px 28px",
						marginTop: 32,
						textAlign: "center",
						position: "relative",
					}}
				>
					<button
						onClick={() => setSelectedArtist(null)}
						style={{
							position: "absolute",
							top: 12,
							right: 18,
							background: "none",
							border: "none",
							color: "#FFD700",
							fontSize: 22,
							cursor: "pointer",
							fontWeight: "bold",
						}}
						aria-label="Cerrar"
					>
						×
					</button>
					<h3
						style={{
							fontSize: "1.2rem",
							fontWeight: "bold",
							color: "#FFD700",
							marginBottom: "18px",
							textShadow: !isDark
								? "1px 1px 0 #000, 0 0 6px #FFD700"
								: "0 0 6px #FFD700",
						}}
					>
						{selectedArtist.name} - Discos disponibles
					</h3>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 28, justifyContent: "center" }}>
						{selectedArtist.items.map((item: any, idx: number) => (
							<div
								key={idx}
								style={{
									background: isDark ? "#232323" : "#fff",
									borderRadius: "12px",
									boxShadow: isDark
										? "0 2px 8px rgba(0,0,0,0.45)"
										: "0 2px 8px rgba(0,0,0,0.08)",
									padding: "18px 14px",
									minWidth: 180,
									maxWidth: 200,
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									marginBottom: 8,
								}}
							>
								<img
									src={item.image}
									alt={item.title}
									style={{
										width: "70px",
										height: "70px",
										objectFit: "cover",
										borderRadius: "8px",
										border: "2px solid #FFD700",
										marginBottom: "12px",
										background: "#fff",
									}}
								/>
								<div style={{ fontWeight: "bold", color: "#FFD700", marginBottom: 4 }}>{item.title}</div>
								<div style={{ color: isDark ? "#bbb" : "#444", fontSize: "0.98rem", marginBottom: 2 }}>{item.type}</div>
								<div style={{ color: "#FFD700", fontWeight: "bold", fontSize: "1.1rem", marginBottom: 6 }}>${item.price}</div>
								<button
									style={{
										padding: "8px 16px",
										borderRadius: "8px",
										border: "none",
										backgroundColor: "#FFD700",
										color: "#000",
										fontWeight: "bold",
										fontSize: "0.98rem",
										cursor: "pointer",
										textTransform: "uppercase",
										boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
										letterSpacing: "1px",
										transition: "background-color 0.3s, transform 0.3s",
										width: "100%",
									}}
									onClick={() => alert("Agregar al carrito (demo)")}
								>
									Agregar al carrito
								</button>
							</div>
						))}
					</div>
				</div>
			)}
			<Link href="/genres" className="hover:underline">
				Genres
			</Link>
			<style>
				{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
        `}
			</style>
		</section>
	);
};

export default Genres;
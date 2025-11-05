"use client";
import React from "react";
import ImageWithLoader from "./ImageWithLoader";
import Link from "next/link";

type Props = {
	genre?: string;
	maxItems?: number;
};

const Recommendations = ({ genre = "General", maxItems = 6 }: Props) => {
	const recommendedAlbums = [
		{ id: 1, name: "Revolver", imageUrl: "/images/beatles-vinyl.jpg", price: "$20.00" },
		{ id: 2, name: "Let It Be", imageUrl: "/images/beatles-vinyl.jpg", price: "$18.00" },
		{ id: 3, name: "Rubber Soul", imageUrl: "/images/beatles-vinyl.jpg", price: "$22.00" },
		{ id: 4, name: "Abbey Road", imageUrl: "/images/beatles-vinyl.jpg", price: "$25.00" },
		{ id: 5, name: "Help!", imageUrl: "/images/beatles-vinyl.jpg", price: "$17.00" },
		{ id: 6, name: "Sgt. Pepper", imageUrl: "/images/beatles-vinyl.jpg", price: "$28.00" },
	];

	const items = recommendedAlbums.slice(0, maxItems);

	return (
		<section className="reco" aria-labelledby="reco-title">
			<div className="reco-header">
				<h2 id="reco-title">Recomendados en {genre}</h2>
				<Link href="/catalogo" className="reco-seeall" aria-label="Ver todo el catálogo">
					Ver todo →
				</Link>
			</div>

			<div className="reco-list" role="list">
				{items.map((album) => (
					<article key={album.id} className="reco-card" role="listitem" tabIndex={0}>
						<div className="reco-media">
							<ImageWithLoader src={album.imageUrl} alt={album.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
						</div>
						<div className="reco-body">
							<div className="reco-title">{album.name}</div>
							<div className="reco-artist">Vinyl</div>
							<div className="reco-price">{album.price}</div>
						</div>
						<button
							className="reco-btn"
							aria-label={`Ver ${album.name}`}
							onClick={() => (window.location.href = `/albumdetails/${album.id}`)}
						>
							Ver
						</button>
					</article>
				))}
			</div>

			<style jsx>{`
				.reco {
					max-width: 1100px;
					margin: 28px auto;
					padding: 18px;
					background: var(--section);
					border-radius: 14px;
					box-shadow: var(--shadow);
					color: var(--text);
				}
				.reco-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 14px;
					gap: 12px;
				}
				.reco-header h2 {
					margin: 0;
					color: var(--accent);
					font-size: 1.45rem;
					letter-spacing: 0.6px;
				}
				.reco-seeall {
					color: var(--muted);
					text-decoration: none;
					font-weight: 700;
					font-size: 0.95rem;
					opacity: 0.92;
				}
				.reco-list {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
					gap: 14px;
				}
				/* Small screens: horizontal scroll with snapping */
				@media (max-width: 700px) {
					.reco-list {
						display: flex;
						overflow-x: auto;
						scroll-snap-type: x mandatory;
						padding-bottom: 8px;
					}
					.reco-card {
						min-width: 68%;
						flex: 0 0 auto;
						scroll-snap-align: start;
						margin-right: 10px;
					}
				}
				.reco-card {
					background: var(--card);
					border-radius: 12px;
					box-shadow: var(--shadow);
					overflow: hidden;
					display: flex;
					flex-direction: column;
					align-items: stretch;
					transition: transform 0.18s ease, box-shadow 0.18s ease;
					border: 1px solid var(--border);
				}
				.reco-card:focus,
				.reco-card:hover {
					transform: translateY(-6px);
					box-shadow: 0 16px 40px rgba(0,0,0,0.14);
					border-color: var(--accent);
					outline: none;
				}
				.reco-media {
					width: 100%;
					height: 140px;
					background: var(--section);
				}
				.reco-body {
					padding: 12px;
					display: flex;
					flex-direction: column;
					gap: 6px;
					flex: 1;
				}
				.reco-title {
					font-weight: 700;
					color: var(--accent);
					font-size: 1rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.reco-artist {
					font-size: 0.92rem;
					color: var(--muted);
				}
				.reco-price {
					margin-top: auto;
					font-weight: 800;
					color: var(--accent);
					font-size: 1rem;
				}
				.reco-btn {
					width: 100%;
					border: none;
					background: linear-gradient(90deg, var(--accent) 0%, rgba(255,255,255,0.06) 100%);
					color: var(--bg);
					padding: 10px;
					font-weight: 700;
					cursor: pointer;
					border-radius: 0 0 12px 12px;
					transition: background 0.18s, transform 0.18s;
				}
				.reco-btn:hover {
					transform: translateY(-2px);
				}
				/* Dark mode adjustments */
				.dark .reco-card { background: var(--card); }
				.dark .reco-title,
				.dark .reco-price { color: var(--accent); }
			`}</style>
		</section>
	);
};

export default Recommendations;

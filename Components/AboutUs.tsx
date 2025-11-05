import React, { useState, useEffect, useRef } from "react";
import ImageWithLoader from "./ImageWithLoader";

const profiles = [
	{
		name: "Marcos Rubio",
		role: "Dueño / Owner",
		img: "/images/profile-marcos.jpg",
		bio: "¡Hola! Soy Marcos Rubio, tengo 29 años y soy originario de Neza, la ciudad del rock en la CDMX. Mi pasión por la música y los vinilos nació gracias a mi padre, quien fundó nuestra tienda familiar en Plaza Cuauhtémoc hace más de 10 años. Desde pequeño, él me enseñó el valor de cada disco y el arte de conectar a las personas con la música que aman.",
		facts: [
			"Más de 1000 ventas en Mercado Libre",
			"100% calificaciones positivas",
			"Atención personalizada y asesoría para coleccionistas",
			"Envíos rápidos y seguros a todo México",
		],
		link: "https://www.mercadolibre.com.mx/perfil/MARCOSRUBIO",
		showLocation: true,
	},
	{
		name: "Gerson (Desarrollador)",
		role: "Desarrollador / Developer",
		img: "/images/profile-dev.jpg",
		bio: "Soy Gerson, desarrollador web freelance. Ofrezco precios flexibles y soluciones personalizadas para tu negocio, tienda o proyecto. Si buscas una web moderna, rápida y optimizada, ¡contáctame!",
		facts: [
			"Especialista en UX/UI y desarrollo web",
			"Apasionado por la música y la tecnología",
			"Soporte técnico y mejoras continuas",
			"Precios flexibles y trato directo",
		],
		link: "mailto:contacto.desarrollador.web@gmail.com",
		showLocation: false,
	},
];

const AboutUs = () => {
	const [current, setCurrent] = useState(0);
	const [paused, setPaused] = useState(false);
	const timerRef = useRef<number | null>(null);
	const profile = profiles[current];

	// autoplay with pause on hover
	useEffect(() => {
		const tick = () => {
			setCurrent((c) => (c + 1) % profiles.length);
		};
		if (!paused) {
			timerRef.current = window.setTimeout(tick, 6000);
		}
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
		};
	}, [current, paused]);

	const goPrev = () => setCurrent((c) => (c - 1 + profiles.length) % profiles.length);
	const goNext = () => setCurrent((c) => (c + 1) % profiles.length);

	return (
		<section
			id="about"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			style={{
				background: "linear-gradient(180deg, rgba(0,0,0,0.02), transparent 40%), var(--section)",
				color: "var(--text)",
				borderRadius: "28px",
				margin: "48px auto 40px",
				maxWidth: "960px",
				padding: "48px 20px",
				boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
				textAlign: "center",
				scrollMarginTop: 100,
				position: "relative",
				overflow: "hidden",
				animation: "fadeIn 1.2s cubic-bezier(.77,0,.175,1)",
				animationFillMode: "forwards",
			}}
		>
			{/* Carousel indicator */}
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: 8,
					marginBottom: 24,
				}}
			>
				{profiles.map((p, idx) => (
					<span
						key={p.name}
						style={{
							width: 10,
							height: 10,
							borderRadius: "50%",
							background: idx === current ? "var(--accent)" : "rgba(0,0,0,0.12)",
							opacity: idx === current ? 1 : 0.6,
							boxShadow: idx === current ? "0 2px 8px rgba(0,0,0,0.06)" : undefined,
							display: "inline-block",
							transition: "background 0.3s, opacity 0.3s",
							cursor: "pointer",
						}}
						onClick={() => setCurrent(idx)}
					/>
				))}
			</div>
			{/* Profile card layout */}
			<div
				className="profile-card"
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					gap: 28,
					flexWrap: "wrap",
					background: "var(--card)",
					borderRadius: 18,
					boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
					padding: "28px 20px",
					margin: "0 auto 24px auto",
					maxWidth: 820,
					position: "relative",
					border: "1px solid rgba(0,0,0,0.04)",
				}}
			>
				{/* Prev / Next controls (desktop visible) */}
				<button
					aria-label="Anterior"
					onClick={goPrev}
					className="profile-nav prev"
					style={{
						position: "absolute",
						left: 8,
						top: "50%",
						transform: "translateY(-50%)",
						border: "none",
						background: "transparent",
						color: "var(--muted)",
						fontSize: 22,
						padding: 8,
						cursor: "pointer",
					}}
				>
					‹
				</button>
				<button
					aria-label="Siguiente"
					onClick={goNext}
					className="profile-nav next"
					style={{
						position: "absolute",
						right: 8,
						top: "50%",
						transform: "translateY(-50%)",
						border: "none",
						background: "transparent",
						color: "var(--muted)",
						fontSize: 22,
						padding: 8,
						cursor: "pointer",
					}}
				>
					›
				</button>

				{/* Avatar */}
				<div
					style={{
						width: 130,
						minWidth: 100,
						height: 130,
						borderRadius: "50%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						overflow: "hidden",
						border: "4px solid transparent",
						background:
							"linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02))",
						boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
					}}
				>
					<div style={{ width: 118, height: 118, borderRadius: "50%", overflow: "hidden", border: "3px solid var(--accent)" }}>
						<ImageWithLoader src={profile.img} alt={profile.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
					</div>
				</div>

				{/* Content */}
				<div
					style={{
						flex: 1,
						minWidth: 220,
						textAlign: "left",
						display: "flex",
						flexDirection: "column",
						gap: 10,
					}}
				>
					<h2 style={{ fontSize: "1.9rem", fontWeight: "800", margin: 0, color: "var(--accent)", letterSpacing: "0.6px" }}>
						{profile.name}
					</h2>
					<div style={{ fontSize: "1rem", color: "var(--muted)", fontWeight: 700 }}>{profile.role}</div>
					<p style={{ fontSize: "1rem", color: "var(--text)", margin: 0, fontWeight: 500, lineHeight: 1.6 }}>
						{profile.bio}
					</p>
					<hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.06)", margin: "8px 0 12px 0" }} />
					<div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
						{profile.facts.map((fact, i) => (
							<div key={i} style={{ color: "var(--text)", fontWeight: 700, fontSize: "0.98rem", display: "flex", gap: 8, alignItems: "center" }}>
								<span style={{ color: "var(--accent)", fontWeight: 900 }}>•</span>
								<span>{fact}</span>
							</div>
						))}
					</div>
					<a
						href={profile.link}
						target="_blank"
						rel="noopener noreferrer"
						style={{ marginTop: 8, color: "var(--accent)", fontWeight: "700", textDecoration: "underline", fontSize: "0.98rem" }}
					>
						{profile.role === "Dueño / Owner" ? "Ver mi reputación en Mercado Libre →" : "Contactar al desarrollador →"}
					</a>
				</div>
			</div>
			{profile.showLocation && (
				<div
					style={{
						marginTop: 12,
						color: "var(--accent)",
						fontWeight: 700,
						fontSize: "1.02rem",
					}}
				>
					<span role="img" aria-label="location">
						📍
					</span>{" "}
					Local familiar en Plaza Cuauhtémoc, CDMX — ¡Visítanos y vive la
					experiencia Artmusic!
				</div>
			)}
			<style>
				{`
           @keyframes fadeIn {
             from { opacity: 0; transform: scale(0.98);}
             to { opacity: 1; transform: scale(1);}
           }
           @keyframes slideUp { from { opacity: 0; transform: translateY(24px);} to { opacity: 1; transform: translateY(0);} }
           .profile-card { transition: transform .22s, box-shadow .22s; }
           .profile-card:hover { transform: translateY(-6px); box-shadow: 0 12px 28px rgba(0,0,0,0.08); }
           .profile-nav { display:none; }
           @media (min-width: 900px) {
             .profile-nav { display: inline-flex; }
           }
           @media (max-width: 900px) {
             section#about { max-width: 98vw !important; padding: 20px 3vw !important; }
             .profile-card { flex-direction: column !important; gap: 18px !important; padding: 18px !important; max-width: 98vw !important; }
           }
           @media (max-width: 600px) {
             section#about { max-width: 100vw !important; padding: 12px 4vw !important; }
             .profile-card { padding: 12px !important; gap: 12px !important; }
           }
         `}
			</style>
		</section>
	);
};

export default AboutUs;
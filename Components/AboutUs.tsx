import React, { useState, useEffect } from "react";

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
	const profile = profiles[current];

	useEffect(() => {
		const timer = setTimeout(() => {
			setCurrent((current + 1) % profiles.length);
		}, 6000);
		return () => clearTimeout(timer);
	}, [current]);

	return (
		<section
			id="about"
			style={{
				background: "var(--section)",
				color: "var(--text)",
				borderRadius: "28px",
				margin: "48px auto 40px",
				maxWidth: "900px",
				padding: "64px 32px 56px 32px",
				boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
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
							background: idx === current ? "var(--accent)" : "#bbb",
							opacity: idx === current ? 1 : 0.4,
							boxShadow:
								idx === current ? "0 2px 8px var(--accent)" : undefined,
							display: "inline-block",
							transition: "background 0.3s, opacity 0.3s",
						}}
					/>
				))}
			</div>
			{/* Profile card layout */}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					gap: 40,
					flexWrap: "wrap",
					background: "#fff",
					borderRadius: 22,
					boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
					padding: "40px 24px",
					margin: "0 auto 24px auto",
					maxWidth: 700,
					position: "relative",
				}}
			>
				<div
					style={{
						width: 130,
						minWidth: 100,
						height: 130,
						borderRadius: "50%",
						background: "#f3f3f3",
						boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						overflow: "hidden",
						marginRight: 0,
						border: "4px solid var(--accent)",
					}}
				>
					<img
						src={profile.img}
						alt={profile.name}
						style={{
							width: 110,
							height: 110,
							borderRadius: "50%",
							objectFit: "cover",
							boxShadow: "0 2px 8px #eee",
						}}
						onError={(e) => {
							e.currentTarget.src =
								"https://ui-avatars.com/api/?name=" +
								encodeURIComponent(profile.name);
						}}
					/>
				</div>
				<div
					style={{
						flex: 1,
						minWidth: 180,
						textAlign: "left",
						display: "flex",
						flexDirection: "column",
						gap: 10,
					}}
				>
					<h2
						style={{
							fontSize: "2.3rem",
							fontWeight: "bold",
							marginBottom: 6,
							color: "var(--accent)",
							letterSpacing: "1px",
						}}
					>
						{profile.name}
					</h2>
					<div
						style={{
							fontSize: "1.15rem",
							color: "var(--muted)",
							fontWeight: "bold",
							marginBottom: 8,
						}}
					>
						{profile.role}
					</div>
					<p
						style={{
							fontSize: "1.18rem",
							color: "#222",
							marginBottom: 12,
							fontWeight: 500,
							lineHeight: 1.7,
						}}
					>
						{profile.bio}
					</p>
					<hr
						style={{
							border: "none",
							borderTop: "1.5px solid #eee",
							margin: "10px 0 16px 0",
						}}
					/>
					<div
						style={{
							marginBottom: 10,
							display: "flex",
							flexDirection: "column",
							gap: 6,
						}}
					>
						{profile.facts.map((fact, i) => (
							<div
								key={i}
								style={{
									color: "#444",
									fontWeight: "bold",
									fontSize: "1.08rem",
									display: "flex",
									alignItems: "center",
									gap: 8,
								}}
							>
								<span
									style={{
										fontSize: "1.2rem",
										color: "var(--accent)",
									}}
								>
									•
								</span>{" "}
								{fact}
							</div>
						))}
					</div>
					<a
						href={profile.link}
						target="_blank"
						rel="noopener noreferrer"
						style={{
							display: "inline-block",
							marginTop: 10,
							color: "var(--accent)",
							fontWeight: "bold",
							textDecoration: "underline",
							fontSize: "1.08rem",
							letterSpacing: "1px",
						}}
					>
						{profile.role === "Dueño / Owner"
							? "Ver mi reputación en Mercado Libre →"
							: "Contactar al desarrollador →"}
					</a>
				</div>
			</div>
			{profile.showLocation && (
				<div
					style={{
						marginTop: 18,
						color: "var(--accent)",
						fontWeight: "bold",
						fontSize: "1.13rem",
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
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @media (max-width: 900px) {
            section#about {
              max-width: 98vw !important;
              padding: 24px 2vw !important;
            }
            .profile-card {
              flex-direction: column !important;
              gap: 18px !important;
              padding: 18px 2vw !important;
              max-width: 98vw !important;
            }
          }
          @media (max-width: 600px) {
            section#about {
              max-width: 100vw !important;
              padding: 12px 1vw !important;
            }
            .profile-card {
              flex-direction: column !important;
              gap: 10px !important;
              padding: 10px 1vw !important;
              max-width: 100vw !important;
            }
            div[role="img"] {
              width: 70px !important;
              height: 70px !important;
            }
          }
        `}
			</style>
		</section>
	);
};

export default AboutUs;
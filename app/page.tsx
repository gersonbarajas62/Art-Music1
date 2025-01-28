"use client";

import AlbumDetails from "./album/page";

export default function Home() {
  return (
    <section className="container">
      {/* Render the AlbumDetails component as the main content */}
      <AlbumDetails />
    </section>
  );
}

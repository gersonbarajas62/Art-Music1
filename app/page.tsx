"use client";

import AlbumDetails from "./albumdetails/[id]/page";

export default function Home() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Welcome to ART Music</h1>
      {/* Render the AlbumDetails component as the main content */}
      <AlbumDetails />
    </section>
  );
}

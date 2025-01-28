"use client"; // Marks the file as a Client Component

import AlbumDetails from '../Components/AlbumDetails';

export default function Home() {
  return (
    <section className="container">
      {/* AlbumDetails will render here */}
      <AlbumDetails />
    </section>
  );
}

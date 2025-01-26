"use client";

import { useRouter } from 'next/navigation';

const albums = [
  { id: 1, title: 'Vinilo Raro de The Beatles', description: 'Un vinilo clásico de The Beatles.', price: '$150', genre: 'Rock', condition: 'Nuevo', stock: 5 },
  { id: 2, title: 'Edición Limitada de Pink Floyd', description: 'Una edición especial de Pink Floyd.', price: '$200', genre: 'Rock', condition: 'Nuevo', stock: 2 },
  { id: 3, title: 'CD de Rock Japonés', description: 'Un CD único de rock japonés.', price: '$80', genre: 'Rock', condition: 'Nuevo', stock: 10 },
  { id: 4, title: 'Vinilo de The Rolling Stones', description: 'Vinilo clásico de The Rolling Stones.', price: '$180', genre: 'Rock', condition: 'Nuevo', stock: 3 },
  { id: 5, title: 'Álbum Raro de Nirvana', description: 'Edición rara de Nirvana.', price: '$250', genre: 'Grunge', condition: 'Nuevo', stock: 1 },
];

export default function AlbumDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const albumId = parseInt(params.id);
  const album = albums.find((item) => item.id === albumId);

  if (!album) {
    return (
      <div>
        <h1>Álbum no encontrado</h1>
        <button onClick={() => router.back()}>Volver</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{album.title}</h1>
      <p>{album.description}</p>
      <p>Precio: {album.price}</p>
      <p>Género: {album.genre}</p>
      <p>Condición: {album.condition}</p>
      <p>Cantidad disponible: {album.stock}</p>
      <button style={{ padding: '10px', backgroundColor: '#FF4500', color: '#fff', border: 'none', borderRadius: '8px' }}>
        Agregar al Carrito
      </button>
    </div>
  );
}

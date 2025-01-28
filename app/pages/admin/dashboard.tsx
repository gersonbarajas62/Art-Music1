"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const Dashboard = () => {
  interface Album {
    id: string;
    title: string;
    description: string;
    price: number;
    genre: string;
    condition: string;
    stock: number;
  }
  
  const [albums, setAlbums] = useState<Album[]>([]);
  const [newAlbum, setNewAlbum] = useState({
    title: "",
    description: "",
    price: "",
    genre: "",
    condition: "",
    stock: "",
  });

  const albumsRef = collection(db, "albums");

  // Fetch Albums
  useEffect(() => {
    const unsubscribe = onSnapshot(albumsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const albumData = doc.data();
        return {
          id: doc.id,
          title: albumData.title,
          description: albumData.description,
          price: albumData.price,
          genre: albumData.genre,
          condition: albumData.condition,
          stock: albumData.stock,
        };
      });
      setAlbums(data);
    });
    return unsubscribe;
  }, []);

  // Add Album
  const addAlbum = async () => {
    if (!newAlbum.title || !newAlbum.price) {
      alert("Title and Price are required!");
      return;
    }
    await addDoc(albumsRef, {
      ...newAlbum,
      price: parseFloat(newAlbum.price),
      stock: parseInt(newAlbum.stock),
    });
    setNewAlbum({
      title: "",
      description: "",
      price: "",
      genre: "",
      condition: "",
      stock: "",
    });
  };

  // Update Album
  const updateAlbum = async (id: string, updatedFields: { price: number; }) => {
    const albumDoc = doc(db, "albums", id);
    await updateDoc(albumDoc, updatedFields);
  };

  // Delete Album
  const deleteAlbum = async (id: string) => {
    const albumDoc = doc(db, "albums", id);
    await deleteDoc(albumDoc);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>Add New Album</h2>
        <input
          type="text"
          placeholder="Title"
          value={newAlbum.title}
          onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newAlbum.description}
          onChange={(e) =>
            setNewAlbum({ ...newAlbum, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newAlbum.price}
          onChange={(e) => setNewAlbum({ ...newAlbum, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={newAlbum.genre}
          onChange={(e) => setNewAlbum({ ...newAlbum, genre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Condition"
          value={newAlbum.condition}
          onChange={(e) =>
            setNewAlbum({ ...newAlbum, condition: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Stock"
          value={newAlbum.stock}
          onChange={(e) => setNewAlbum({ ...newAlbum, stock: e.target.value })}
        />
        <button onClick={addAlbum}>Add Album</button>
      </div>

      <h2>Albums</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id} style={{ marginBottom: "10px" }}>
            <strong>{album.title}</strong> - ${album.price}
            <button onClick={() => deleteAlbum(album.id)}>Delete</button>
            <button
              onClick={() =>
                updateAlbum(album.id, { price: album.price + 10 })
              }
            >
              Increase Price by $10
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

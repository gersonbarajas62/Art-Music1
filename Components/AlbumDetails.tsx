"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const AlbumDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  interface Album {
    title: string;
    description: string;
    // Add other album properties here
  }
  
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    if (id) {
      const fetchAlbum = async () => {
        const docRef = doc(db, "albums", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAlbum(docSnap.data() as Album);
        } else {
          console.log("No such document!");
        }
      };

      fetchAlbum();
    }
  }, [id]);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {album ? (
        <>
          <h1>{album.title}</h1>
          <p>{album.description}</p>
          {/* Add more album details here */}
        </>
      ) : (
        <div>Loading album details...</div>
      )}
    </div>
  );
};

export default AlbumDetails;

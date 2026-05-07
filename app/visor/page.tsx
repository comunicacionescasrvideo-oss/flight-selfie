"use client";

import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";

export default function Visor() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const listRef = ref(storage, "selfies");
      const res = await listAll(listRef);

      const urls = await Promise.all(
        res.items.map((item) => getDownloadURL(item))
      );

      setImages(urls.reverse());
    };

    // carga inicial
    fetchImages();

    // actualización automática cada 3 segundos
    const interval = setInterval(fetchImages, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main
      style={{
        background: "#0b1e3f",
        minHeight: "100vh",
        padding: 20,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 20,
      }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          style={{
            width: "100%",
            height: 260,
            borderRadius: "100px 100px 80px 80px",
            overflow: "hidden",
            border: "5px solid #dfe6e9",
            background: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={src}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ))}
    </main>
  );
}
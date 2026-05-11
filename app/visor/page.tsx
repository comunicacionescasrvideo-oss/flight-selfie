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
    minHeight: "100vh",
    overflow: "hidden",
    position: "relative",

    background: `
      radial-gradient(
        circle at 30% 40%,
        rgba(255,211,107,0.22) 0%,
        transparent 32%
      ),

      linear-gradient(
        180deg,
        #0A2342 0%,
        #1B4F8C 35%,
        #57B7FF 58%,
        #B9E7FF 72%,
        #1B4F8C 100%
      )
    `,

    color: "#ffffff",
  }}
>
        <img
  src="/clouds/cloud-back.png"
  alt=""
  style={realCloudBack}
/>

<img
  src="/clouds/cloud-mid.png"
  alt=""
  style={realCloudMid}
/>

<img
  src="/clouds/cloud-front.png"
  alt=""
  style={realCloudFront}
/>

<div style={particleOne}></div>
<div style={particleTwo}></div>
<div style={particleThree}></div>

      <div style={visorGrid}>
  {images.map((src, i) => (
    <div
      key={i}
      style={{
        position: "relative",
        zIndex: 2,
      }}
    >
      <div style={visorWindowFrame}>
        <div style={visorWindowInner}>
          

          <img
            src={src}
            style={visorImage}
          />
        </div>
      </div>
    </div>
  ))}
</div>
    </main>
  
  );
}
const realCloudBack = {
  position: "fixed" as const,
  top: 40,
  left: -200,
  width: "1400px",
  opacity: 0.22,
  pointerEvents: "none" as const,
  zIndex: 0,
  
  filter: "blur(2px)",
};

const realCloudMid = {
  position: "fixed" as const,
  top: 260,
  right: -250,
  width: "1200px",
  opacity: 0.30,
  pointerEvents: "none" as const,
  zIndex: 0,
  filter: "blur(1px)",
};

const realCloudFront = {
  position: "fixed" as const,
  bottom: -40,
  left: -100,
  width: "1500px",
  opacity: 0.18,
  pointerEvents: "none" as const,
  zIndex: 0,
};
const particleOne = {
  position: "fixed" as const,
  top: "20%",
  left: "18%",
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.55)",
  boxShadow: "0 0 20px rgba(255,255,255,0.45)",
  zIndex: 1,
};

const particleTwo = {
  position: "fixed" as const,
  top: "62%",
  right: "22%",
  width: 4,
  height: 4,
  borderRadius: "50%",
  background: "rgba(255,211,107,0.45)",
  boxShadow: "0 0 18px rgba(255,211,107,0.45)",
  zIndex: 1,
};

const particleThree = {
  position: "fixed" as const,
  bottom: "18%",
  left: "48%",
  width: 5,
  height: 5,
  borderRadius: "50%",
  background: "rgba(185,231,255,0.50)",
  boxShadow: "0 0 22px rgba(185,231,255,0.45)",
  zIndex: 1,
};
const visorWindowFrame = {
  width: 185,
height: 250,

  borderRadius: "160px 160px 120px 120px",

  overflow: "hidden",

  margin: "40px auto 20px auto",

  padding: 14,

  background: `
    linear-gradient(
      180deg,
      rgba(255,255,255,0.95),
      rgba(215,225,240,0.92)
    )
  `,

  border: "1px solid rgba(255,255,255,0.45)",

  position: "relative" as const,

  boxShadow: `
    inset 0 2px 12px rgba(255,255,255,0.85),
    inset 0 -18px 30px rgba(0,0,0,0.12),
    0 25px 80px rgba(0,0,0,0.28),
    0 0 80px rgba(255,255,255,0.10)
  `,

  backdropFilter: "blur(10px)",
};

const visorWindowInner = {
  width: "100%",
  height: "100%",

  borderRadius: "140px 140px 105px 105px",

  overflow: "hidden",

  background: "#000",

  border: "10px solid rgba(210,220,235,0.55)",

  boxShadow: `
    inset 0 12px 25px rgba(255,255,255,0.28),
    inset 0 -18px 30px rgba(0,0,0,0.40),
    inset 0 0 20px rgba(0,0,0,0.30)
  `,
};

const visorImage = {
  width: "100%",
  height: "100%",

  objectFit: "cover" as const,
};
const visorGrid = {
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fill, minmax(185px, 1fr))",

  gap: 34,

  padding: "45px",

  position: "relative" as const,

  zIndex: 2,
};
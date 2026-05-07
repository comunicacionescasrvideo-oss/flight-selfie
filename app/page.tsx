"use client";
import { useRef, useState } from "react";
import { ref, uploadString } from "firebase/storage";
import { storage } from "./lib/firebase";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [screen, setScreen] = useState(1);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    const data = canvas.toDataURL("image/jpeg", 0.7);
    setPhoto(data);
  };

  const sendPhoto = async () => {
    if (!photo) return;

    const fileName = `selfies/${Date.now()}.jpg`;
    const storageRef = ref(storage, fileName);

    await uploadString(storageRef, photo, "data_url");

    setMensaje("✅ Foto subida a Firebase");
  };

  return (
    <>
      {/* PANTALLA 1 */}
      {screen === 1 && (
        <main
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background:
              "linear-gradient(270deg, #0b1e3f, #3a7bd5, #0b1e3f)",
            backgroundSize: "400% 400%",
            animation: "gradientMove 8s ease infinite",
            color: "white",
            textAlign: "center",
            padding: 20,
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: 10 }}>
            ✈️ Prepárate para despegar
          </h1>

          <p style={{ opacity: 0.8, marginBottom: 30 }}>
            Una experiencia creada para ti
          </p>

          <button
            onClick={() => setScreen(2)}
            style={{
              padding: "12px 24px",
              borderRadius: 30,
              border: "none",
              background: "white",
              color: "#0b1e3f",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Comenzar viaje
          </button>
        </main>
      )}

      {/* PANTALLA 2 */}
      {screen === 2 && (
        <main
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(to top, #1e3c72, #2a5298)",
            color: "white",
            textAlign: "center",
            padding: 20,
          }}
        >
          <h1 style={{ fontSize: "2.2rem", marginBottom: 10 }}>
            No es solo un destino
          </h1>

          <p style={{ opacity: 0.8, marginBottom: 30 }}>
            es una experiencia
          </p>

          <button
            onClick={() => setScreen(3)}
            style={{
              padding: "12px 24px",
              borderRadius: 30,
              border: "none",
              background: "white",
              color: "#1e3c72",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Continuar
          </button>
        </main>
      )}

      {/* PANTALLA 3 */}
      {screen === 3 && (
        <main
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(to top, #141e30, #243b55)",
            color: "white",
            textAlign: "center",
            padding: 20,
          }}
        >
          <h1 style={{ fontSize: "2.2rem", marginBottom: 10 }}>
            ✈️ Estás a punto de despegar
          </h1>

          <p style={{ opacity: 0.8, marginBottom: 30 }}>
            Prepárate para tu momento
          </p>

          <button
            onClick={() => setScreen(4)}
            style={{
              padding: "12px 24px",
              borderRadius: 30,
              border: "none",
              background: "white",
              color: "#141e30",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Continuar
          </button>
        </main>
      )}

      {/* PANTALLA 4 */}
      {screen === 4 && (
        <main
          style={{
            background: "#0b1e3f",
            color: "white",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <h1>📸 Tu momento</h1>

          <div
            style={{
              width: 260,
              height: 340,
              borderRadius: "130px 130px 100px 100px",
              overflow: "hidden",
              border: "6px solid #dfe6e9",
              background: "#000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <button onClick={startCamera}>Activar cámara</button>
          <button onClick={takePhoto}>Tomar foto</button>

          <canvas ref={canvasRef} style={{ display: "none" }} />

          {photo && (
            <>
              <div
                style={{
                  width: 260,
                  height: 340,
                  borderRadius: "130px 130px 100px 100px",
                  overflow: "hidden",
                  border: "6px solid #dfe6e9",
                  background: "#000",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={photo}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <button onClick={sendPhoto}>Enviar foto</button>
            </>
          )}

          <p>{mensaje}</p>
        </main>
      )}

      {/* ANIMACIÓN GLOBAL */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}
"use client";

import { useRef, useState } from "react";
import { ref, uploadString } from "firebase/storage";
import { storage } from "./lib/firebase";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState("");

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

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

    const data = canvas.toDataURL("image/jpeg", 0.8);

    setPhoto(data);
  };

  const sendPhoto = async () => {
    if (!photo) return;

    const fileName = `selfies/${Date.now()}.jpg`;

    const storageRef = ref(storage, fileName);

    await uploadString(storageRef, photo, "data_url");

    setMensaje("✨ Ya eres parte de este viaje");
  };

  return (
    <>
      <main
        style={{
          scrollSnapType: "y mandatory",
          overflowY: "scroll",
          height: "100vh",
          scrollBehavior: "smooth",
          perspective: "1200px",

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
          position: "relative",
        }}
      >
        <FloatingCloud style={cloudOne} />
        <FloatingCloud style={cloudTwo} />
        <FloatingCloud style={cloudThree} />
        <div style={particleOne}></div>
<div style={particleTwo}></div>
<div style={particleThree}></div>
        

        {/* HERO */}
        <section style={sectionStyle}>
          <Glow
            size={700}
            color="rgba(255,211,107,0.12)"
          />
          <Glow
  size={1200}
  color="rgba(87,183,255,0.10)"
/>

          <div
            style={{
              ...contentStyle,
              animation: "heroFloat 8s ease-in-out infinite",
            }}
          >
            <p style={miniText}>
              EXPERIENCIA INTERACTIVA
            </p>

            <h1 style={heroTitle}>
              Este Viaje
              <br />
              comienza aquí
            </h1>

            <p style={heroText}>
              Una experiencia creada para quienes saben
              que este viaje es mucho más que un sueño.
            </p>
          </div>

          <ScrollIndicator />
        </section>

        {/* SECCIÓN 2 */}
        <section style={sectionStyle}>
          <Glow
            size={900}
            color="rgba(255,211,107,0.10)"
          />

          <div style={contentStyle}>
            <h2 style={titleStyle}>
              Hay viajes que comienzan mucho antes de despegar
            </h2>

            <p style={textStyle}>
              Cada destino nace primero
              en la imaginación.
            </p>
          </div>
        </section>

        {/* SECCIÓN 3 */}
        <section style={sectionStyle}>
          <Glow
            size={650}
            color="rgba(87,183,255,0.10)"
          />

          <div style={contentStyle}>
            <h2 style={titleStyle}>
              Descubrir el mundo también es descubrir nuevas versiones de ti
            </h2>

            <p style={textStyle}>
              Hoy comienza una nueva historia.
            </p>
          </div>
        </section>

        {/* SECCIÓN 4 */}
        <section style={sectionStyle}>
          <Glow
            size={600}
            color="rgba(255,231,163,0.08)"
          />

          <div style={contentStyle}>
            <h2 style={titleStyle}>
              Los grandes momentos
              comienzan con una decisión
            </h2>

            <p style={textStyle}>
              Y este puede ser el inicio de algo inolvidable.
            </p>
          </div>
        </section>

        {/* SELFIE */}
        <section style={cameraSection}>
          <Glow
            size={700}
            color="rgba(255,255,255,0.15)"
          />

          <div style={contentStyle}>
            <p style={miniText}>
              SELFIE EXPERIENCE
            </p>

            <h2 style={cameraTitle}>
              Tu momento ✈️
            </h2>

            <p style={textStyle}>
              Prepárate para ser parte de esta experiencia.
            </p>

            <div style={cameraFrame}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={mediaStyle}
              />
            </div>

            <div style={buttonContainer}>
              <button
                onClick={startCamera}
                style={buttonStyle}
              >
                Activar cámara
              </button>

              <button
                onClick={takePhoto}
                style={buttonStyle}
              >
                Tomar foto
              </button>
            </div>

            <canvas
              ref={canvasRef}
              style={{ display: "none" }}
            />

            {photo && (
              <>
                <div style={cameraFrame}>
                  <img
                    src={photo}
                    alt="selfie"
                    style={mediaStyle}
                  />
                </div>

                <button
                  onClick={sendPhoto}
                  style={buttonStyle}
                >
                  Enviar foto
                </button>
              </>
            )}

            {mensaje && (
              <div style={successMessage}>
                {mensaje}
              </div>
            )}
          </div>
        </section>

        {/* CIERRE */}
        <section style={sectionStyle}>
          <Glow
            size={900}
            color="rgba(255,211,107,0.10)"
          />

          <div
            style={{
              ...contentStyle,
              maxWidth: 850,
            }}
          >
            <p style={miniText}>
              THE JOURNEY BEGINS
            </p>

            <h2 style={titleStyle}>
              Gracias por ser parte
              <br />
              de esta experiencia
            </h2>

            <p style={textStyle}>
              Muy pronto descubrirás un viaje pensado
              para inspirar nuevas historias,
              nuevas emociones y nuevos destinos.
            </p>

            <div
              style={{
                marginTop: 50,
                opacity: 0.65,
                fontSize: 14,
                letterSpacing: 4,
              }}
            >
              ✈️ SEE YOU SOON
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes cloudMove {
          0% {
            transform: translateX(0px) translateY(0px);
          }

          100% {
            transform: translateX(40px) translateY(-20px);
          }
        }

        @keyframes fadeFloat {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }

          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        @keyframes heroFloat {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-8px);
          }

          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </>
  );
}

function FloatingCloud({
  style,
}: {
  style: any;
}) {
  return (
    <div
      style={{
        ...style,
        animation: "cloudMove 60s ease-in-out infinite alternate",
      }}
    />
  );
}

function Glow({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: "blur(160px)",
      }}
    />
  );
}

function ScrollIndicator() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        opacity: 0.75,
      }}
    >
      <div
        style={{
          fontSize: 12,
          letterSpacing: 3,
        }}
      >
        DESLIZA HACIA ARRIBA
      </div>

      <div
        style={{
          fontSize: 20,
        }}
      >
        ↑
      </div>
    </div>
  );
}

const sectionStyle = {
  height: "100vh",
  scrollSnapAlign: "start" as const,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative" as const,
  overflow: "hidden",
  marginTop: "-120px",
paddingTop: "120px",
  padding: "30px",
  transformStyle: "preserve-3d" as const,
};

const cameraSection = {
  minHeight: "100vh",
  scrollSnapAlign: "start" as const,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative" as const,
  overflow: "hidden",
  marginTop: "-120px",
paddingTop: "120px",
  padding: "60px 20px",
};

const contentStyle = {
  position: "relative" as const,
  zIndex: 2,
  textAlign: "center" as const,
  width: "100%",
  maxWidth: 950,

  padding: "40px 24px",

  background: "rgba(255,255,255,0.03)",

  backdropFilter: "blur(10px)",

  border: "1px solid rgba(255,255,255,0.06)",

  boxShadow: `
  0 0 120px rgba(255,211,107,0.08),
  0 0 220px rgba(87,183,255,0.12)
  `,

  borderRadius: 40,
  transform: "translateZ(40px)",
  animation: "fadeFloat 1.5s ease",
};

const miniText = {
  fontSize: 12,
  letterSpacing: 4,
  opacity: 0.8,
  marginBottom: 24,
};

const heroTitle = {
  fontSize: "clamp(4rem, 10vw, 7rem)",
  lineHeight: 0.88,
  fontWeight: 700,
  letterSpacing: "-0.05em",
  marginBottom: 30,
  textShadow: "0 10px 40px rgba(0,0,0,0.18)",
};

const heroText = {
  maxWidth: 700,
  margin: "0 auto",
  fontSize: "1.15rem",
  lineHeight: 1.8,
  opacity: 1,
};

const titleStyle = {
  fontSize: "clamp(2.8rem, 8vw, 5rem)",
  lineHeight: 1,
  fontWeight: 600,
  letterSpacing: "-0.04em",
  marginBottom: 25,
  textShadow: "0 10px 30px rgba(0,0,0,0.14)",
};

const textStyle = {
  maxWidth: 650,
  margin: "0 auto",
  fontSize: "1.1rem",
  lineHeight: 1.8,
  opacity: 0.9,
};

const cameraTitle = {
  fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
  lineHeight: 0.95,
  fontWeight: 600,
  letterSpacing: "-0.04em",
  marginBottom: 20,
  textShadow: "0 10px 30px rgba(0,0,0,0.14)",
};

const cameraFrame = {
  width: 280,
  height: 360,
  borderRadius: "140px 140px 110px 110px",
  overflow: "hidden",
  border: "6px solid rgba(255,255,255,0.45)",
  margin: "40px auto 20px auto",
  background: "#000",
  boxShadow: "0 20px 100px rgba(255,255,255,0.15)",
  backdropFilter: "blur(10px)",
};

const mediaStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};

const buttonContainer = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  flexWrap: "wrap" as const,
};

const buttonStyle = {
  padding: "16px 30px",

  borderRadius: 999,

  border: "1px solid rgba(255,255,255,0.18)",

  background: `
  linear-gradient(
    180deg,
    rgba(255,255,255,0.30),
    rgba(255,255,255,0.12)
  )
  `,

  backdropFilter: "blur(18px)",

  color: "#ffffff",

  fontWeight: 600,

  cursor: "pointer",

  fontSize: 14,

  letterSpacing: "0.04em",

  boxShadow: `
    0 10px 40px rgba(0,0,0,0.18),
    0 0 30px rgba(255,211,107,0.10)
  `,

  transition: "all 0.3s ease",

  WebkitBackdropFilter: "blur(18px)",
};

const successMessage = {
  marginTop: 30,
  fontSize: "1.1rem",
  opacity: 0.95,
};

const cloudOne = {
  position: "fixed" as const,
  top: 120,
  left: -120,
  width: 700,
  height: 220,
  background: "rgba(255,255,255,0.12)",
  borderRadius: 999,
  filter: "blur(80px)",
  mixBlendMode: "screen" as const,
  zIndex: 0,
};

const cloudTwo = {
  position: "fixed" as const,
  top: 340,
  right: -100,
  width: 820,
  height: 260,
  background: "rgba(185,231,255,0.10)",
  borderRadius: 999,
  filter: "blur(90px)",
  mixBlendMode: "screen" as const,
  zIndex: 0,
};

const cloudThree = {
  position: "fixed" as const,
  bottom: 120,
  left: 100,
  width: 520,
  height: 180,
  background: "rgba(255,231,163,0.08)",
  borderRadius: 999,
  filter: "blur(100px)",
  mixBlendMode: "screen" as const,
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
  animation: "particleFloat 12s ease-in-out infinite",
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
  animation: "particleFloat 16s ease-in-out infinite",
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
  animation: "particleFloat 14s ease-in-out infinite",
  zIndex: 1,
};
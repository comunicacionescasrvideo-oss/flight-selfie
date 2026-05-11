"use client";

import { useRef, useState } from "react";
import { ref, uploadString } from "firebase/storage";
import { storage } from "./lib/firebase";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    setCameraActive(true);
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
    setTimeout(() => {
  window.scrollBy({
    top: 420,
    behavior: "smooth",
  });
}, 250);
  };

  const sendPhoto = async () => {
  if (!photo || isUploading) return;

  setIsUploading(true);

  const fileName = `selfies/${Date.now()}.jpg`;

  const storageRef = ref(storage, fileName);

  await uploadString(storageRef, photo, "data_url");

  setMensaje("✨ Ya eres parte de este viaje");

  setIsUploading(false);
};

  return (
    <>
      <main
        style={{
          scrollSnapType: "y proximity",
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
            <h2
  style={{
    ...titleStyle,
    marginTop: 0,
  }}
>
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
<img
  src="/clouds/cloud-mid.png"
  alt=""
  style={{
    position: "absolute",
    width: "1100px",
    bottom: -100,
    right: -200,
    opacity: 0.14,
    pointerEvents: "none",
    animation: "cloudMove 120s ease-in-out infinite alternate",
    filter: "blur(2px)",
  }}
/>

<img
  src="/clouds/cloud-front.png"
  alt=""
  style={{
    position: "absolute",
    width: "1200px",
    top: -100,
    left: -300,
    opacity: 0.10,
    pointerEvents: "none",
    animation: "cloudMove 150s ease-in-out infinite alternate",
  }}
/>
          <div style={contentStyle}>
            <p
  style={{
    fontSize: 14,
    letterSpacing: 4,
    opacity: 0.75,
    marginBottom: 10,
  }}
>
  realiza tu
</p>

<h2
  style={{
    fontSize: "clamp(3rem, 9vw, 5rem)",
    lineHeight: 0.9,
    fontWeight: 700,
    letterSpacing: "-0.05em",
    marginBottom: 24,
  }}
>
  CHECK-IN
</h2>

            <div style={cameraFrame}>
  <div style={windowInner}>
    <div style={windowShade}></div>
    <div style={windowHandle}></div>
    {!photo && (
  <video
    ref={videoRef}
    autoPlay
    playsInline
    style={mediaStyle}
  />
)}
  </div>
</div>

<div style={buttonContainer}>
  <button
  onClick={startCamera}
  style={{
    ...buttonStyle,

    background: cameraActive
      ? "#0A2342"
      : buttonStyle.background,

    border: cameraActive
      ? "1px solid rgba(255,255,255,0.35)"
      : buttonStyle.border,
  }}
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
      <div style={windowInner}>
      <div style={windowShade}></div>

<div style={windowHandle}></div>
        <img
          src={photo}
          alt="selfie"
          style={mediaStyle}
        />
      </div>
    </div>

    <button
  onClick={sendPhoto}
  disabled={isUploading}
  style={{
    ...buttonStyle,

    background: `
      linear-gradient(
        180deg,
        #123C6B,
        #0A2342
      )
    `,

    border: "1px solid rgba(255,255,255,0.18)",

    opacity: isUploading ? 0.6 : 1,
  }}
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
              ✈️ ¡Súbete al Viaje!
              <div
  style={{
    marginTop: 30,
    fontSize: 11,
    opacity: 0.7,
color: "#0A2342",
    letterSpacing: 2,
  }}
>
  Sitio creado por: Unidad de Comunicaciones / Comunicaciones Airline
</div>
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
  scrollSnapAlign: "none" as const,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative" as const,
  overflow: "hidden",
  marginTop: "-120px",
paddingTop: "120px",
  padding: "20px",
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
  width: 300,
  height: 390,

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
const windowInner = {
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
const windowShade = {
  position: "absolute" as const,

  top: 14,
  left: "50%",

  transform: "translateX(-50%)",

  width: "84%",
  height: "58px",

  borderRadius: "18px 18px 12px 12px",

  background: `
    linear-gradient(
      180deg,
      rgb(236,240,246) 0%,
      rgb(214,221,232) 45%,
      rgb(188,198,212) 100%
    )
  `,

  border: "1px solid rgba(255,255,255,0.75)",

  boxShadow: `
  inset 0 2px 6px rgba(255,255,255,0.55),
  inset 0 -8px 14px rgba(0,0,0,0.22),
  0 14px 24px rgba(0,0,0,0.28),
  0 4px 10px rgba(0,0,0,0.12)
`,

  zIndex: 4,
};
const mediaStyle = {
  width: "100%",

  objectFit: "cover" as const,

  transform: "scale(1.08)",

  marginTop: "58px",

  height: "calc(100% - 58px)",
};

const buttonContainer = {
  display: "flex",

  flexDirection: "column" as const,

  gap: 14,

  justifyContent: "center",

  alignItems: "center",

  width: "100%",
};

const buttonStyle = {
  padding: "11px 22px",

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

  WebkitBackdropFilter: "blur(18px)",

  color: "#ffffff",

  fontWeight: 600,

  cursor: "pointer",

  fontSize: 14,

  letterSpacing: "0.04em",

  boxShadow: `
    0 10px 40px rgba(0,0,0,0.18),
    0 0 30px rgba(255,211,107,0.10)
  `,

  transition: "all 0.15s ease",

  width: "100%",

  maxWidth: "260px",
  touchAction: "manipulation",
};

const successMessage = {
  marginTop: 30,
  fontSize: "1.1rem",
  opacity: 0.95,
};

const realCloudBack = {
  position: "fixed" as const,
  top: 40,
  left: -200,
  width: "1400px",
  opacity: 0.22,
  pointerEvents: "none" as const,
  zIndex: 0,
  animation: "cloudMove 90s ease-in-out infinite alternate",
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
  animation: "cloudMove 120s ease-in-out infinite alternate",
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
  animation: "cloudMove 140s ease-in-out infinite alternate",
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
const windowHandle = {
  position: "absolute" as const,

  top: 50,
  left: "50%",

  transform: "translateX(-50%)",

  width: "36px",
  height: "8px",

  borderRadius: "999px",

  background: `
    linear-gradient(
      180deg,
      rgb(150,160,172),
      rgb(112,120,132)
    )
  `,

  boxShadow: `
    inset 0 1px 2px rgba(255,255,255,0.35),
    0 1px 4px rgba(0,0,0,0.25)
  `,

  zIndex: 5,
};
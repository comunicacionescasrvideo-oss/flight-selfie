export async function POST(req: Request) {
  const body = await req.json();

  console.log("Imagen recibida:", body.image);

  return Response.json({
    msg: "📸 Foto recibida correctamente"
  });
}
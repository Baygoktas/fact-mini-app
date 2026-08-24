export async function onRequestGet(context) {
  const db = context.env.DB;
  const result = await db.prepare("SELECT * FROM facts ORDER BY RANDOM() LIMIT 1").first();
  if (!result) return Response.json({ error: "Kayıt yok" }, { status: 404 });
  result.bullet_points = result.bullet_points ? JSON.parse(result.bullet_points) : [];
  return Response.json(result);
}

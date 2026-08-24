export async function onRequestGet(context) {
  const db = context.env.DB;
  const url = new URL(context.request.url);
  const userId = url.searchParams.get("userId");

  const { results } = await db.prepare(`
    SELECT f.* FROM facts f
    JOIN saved_facts sf ON f.id = sf.fact_id
    WHERE sf.user_id = ?
    ORDER BY sf.saved_at DESC
  `).bind(userId).all();

  const formatted = results.map(item => ({
    ...item,
    bullet_points: item.bullet_points ? JSON.parse(item.bullet_points) : []
  }));

  return Response.json(formatted);
}

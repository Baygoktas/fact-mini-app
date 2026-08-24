export async function onRequestPost(context) {
  const db = context.env.DB;
  const { userId, factId, action } = await context.request.json();

  if (action === 'save') {
    await db.prepare("INSERT OR IGNORE INTO saved_facts (user_id, fact_id) VALUES (?, ?)").bind(userId, factId).run();
  } else {
    await db.prepare("DELETE FROM saved_facts WHERE user_id = ? AND fact_id = ?").bind(userId, factId).run();
  }
  return Response.json({ success: true });
}

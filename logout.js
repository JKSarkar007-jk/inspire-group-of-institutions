// POST /api/logout  Ends the session.
export async function onRequestPost() {
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'inspire_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
    },
  });
}

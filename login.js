// POST /api/login  { id, password }
// The ID and password are checked here, on the server. They are kept as
// secrets in Cloudflare, never in the website files or on GitHub.
const enc = new TextEncoder();
const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
async function hmac(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}
async function same(a, b) {
  const [x, y] = await Promise.all([crypto.subtle.digest('SHA-256', enc.encode(a)), crypto.subtle.digest('SHA-256', enc.encode(b))]);
  const p = new Uint8Array(x), q = new Uint8Array(y);
  let d = 0;
  for (let i = 0; i < p.length; i++) d |= p[i] ^ q[i];
  return d === 0;
}
const json = (o, status = 200, headers = {}) =>
  new Response(JSON.stringify(o), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers } });

export async function onRequestPost({ request, env }) {
  if (!env.MANAGEMENT_ID || !env.MANAGEMENT_PASSWORD || !env.SESSION_SECRET) return json({ error: 'not_configured' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'bad_request' }, 400); }
  const id = String(body.id || '').trim().toUpperCase();
  const password = String(body.password || '');
  const okId = await same(id, env.MANAGEMENT_ID.toUpperCase());
  const okPw = await same(password, env.MANAGEMENT_PASSWORD);
  if (!(okId && okPw)) {
    await new Promise((r) => setTimeout(r, 800)); // slows down guessing
    return json({ error: 'invalid' }, 401);
  }
  const user = { id: env.MANAGEMENT_ID.toUpperCase(), name: env.MANAGEMENT_NAME || 'Management', role: 'super_management' };
  const payload = b64(enc.encode(JSON.stringify({ ...user, exp: Date.now() + 8 * 3600 * 1000 })));
  const sig = await hmac(env.SESSION_SECRET, payload);
  return json({ ok: true, ...user }, 200, {
    'Set-Cookie': `inspire_session=${payload}.${sig}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`,
  });
}

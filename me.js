// GET /api/me  Returns the signed-in user, or 401 if there is no valid session.
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
const json = (o, status = 200) =>
  new Response(JSON.stringify(o), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export async function onRequestGet({ request, env }) {
  if (!env.SESSION_SECRET) return json({ error: 'not_configured' }, 503);
  const match = /(?:^|;\s*)inspire_session=([^;]+)/.exec(request.headers.get('Cookie') || '');
  if (!match) return json({ error: 'no_session' }, 401);
  const [payload, sig] = match[1].split('.');
  if (!payload || !sig || !(await same(sig, await hmac(env.SESSION_SECRET, payload)))) return json({ error: 'invalid' }, 401);
  let data;
  try {
    const bytes = Uint8Array.from(atob(payload.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
    data = JSON.parse(new TextDecoder().decode(bytes));
  } catch { return json({ error: 'invalid' }, 401); }
  if (!data.exp || data.exp < Date.now()) return json({ error: 'expired' }, 401);
  return json({ ok: true, id: data.id, name: data.name, role: data.role });
}

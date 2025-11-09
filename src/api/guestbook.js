const BASE = process.env.REACT_APP_SUPABASE_URL;
const ANON = process.env.REACT_APP_SUPABASE_ANON_KEY;
const FUNC_BASE = process.env.REACT_APP_GB_FUNCTION_BASE; // e.g. https://<project>.functions.supabase.co

function ensureEnv() {
  if (!BASE || !ANON) {
    throw new Error("Missing Supabase env. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY");
  }
}

export async function listGuestbook({ limit = 20, cursor } = {}) {
  ensureEnv();
  const params = new URLSearchParams();
  params.set("select", "id,to,message,from,created_at");
  // Put null created_at values last so newest entries appear first
  params.set("order", "created_at.desc.nullslast");
  params.set("limit", String(limit));
  if (cursor) {
    // Include rows where created_at is null, plus those older than cursor
    // PostgREST 'or' filter: or=(cond1,cond2)
    // See: https://postgrest.org/en/stable/references/api/tables_views.html#or
    params.set("or", `(created_at.is.null,created_at.lt.${cursor})`);
  }

  const url = `${BASE}/rest/v1/guestbook?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      apikey: ANON,
      Authorization: `Bearer ${ANON}`,
      Accept: "application/json",
      Prefer: "count=exact"
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Guestbook fetch failed: ${res.status} ${text}`);
  }
  const items = await res.json();
  const nextCursor = items.length > 0 ? items[items.length - 1].created_at : null;
  return { items, nextCursor };
}

// Fetch items newer than a timestamp (ISO string)
export async function listGuestbookSince({ since, limit = 50 } = {}) {
  ensureEnv();
  if (!since) return { items: [] };
  const params = new URLSearchParams();
  params.set("select", "id,to,message,from,created_at");
  params.set("order", "created_at.asc");
  params.set("limit", String(limit));
  params.set("created_at", `gt.${since}`);

  const url = `${BASE}/rest/v1/guestbook?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      apikey: ANON,
      Authorization: `Bearer ${ANON}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Guestbook fetch failed: ${res.status} ${text}`);
  }
  const items = await res.json();
  return { items };
}

// Public update using anon key (requires RLS to allow updates)
export async function updateGuestbookPublic({ id, to, from, message }) {
  ensureEnv();
  if (!id) throw new Error('id is required');
  const url = `${BASE}/rest/v1/guestbook?id=eq.${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      apikey: ANON,
      Authorization: `Bearer ${ANON}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ to, from, message }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Update failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  return Array.isArray(data) && data[0] ? data[0] : null;
}

// Admin update via Edge Function (do not expose service key in frontend)
export async function updateGuestbook({ id, to, from, message, adminToken }) {
  if (!FUNC_BASE) throw new Error("Missing REACT_APP_GB_FUNCTION_BASE for admin operations");
  if (!adminToken) throw new Error("관리자 토큰이 필요합니다");
  const url = `${FUNC_BASE}/guestbook-admin-update`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({ id, to, from, message }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Update failed: ${res.status} ${text}`);
  }
  return await res.json().catch(() => ({}));
}

export async function deleteGuestbook({ id, adminToken }) {
  if (!FUNC_BASE) throw new Error("Missing REACT_APP_GB_FUNCTION_BASE for admin operations");
  if (!adminToken) throw new Error("관리자 토큰이 필요합니다");
  const url = `${FUNC_BASE}/guestbook-admin-delete`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Delete failed: ${res.status} ${text}`);
  }
  return await res.json().catch(() => ({}));
}


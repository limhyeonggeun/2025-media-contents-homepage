import { useMemo } from 'react';

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function darkenHex(hex, amount = 0.2) {
  try {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    const dr = Math.max(0, Math.min(255, Math.round(r * (1 - amount))));
    const dg = Math.max(0, Math.min(255, Math.round(g * (1 - amount))));
    const db = Math.max(0, Math.min(255, Math.round(b * (1 - amount))));
    const toHex = (v) => v.toString(16).padStart(2, '0');
    return `#${toHex(dr)}${toHex(dg)}${toHex(db)}`;
  } catch {
    return hex;
  }
}

export default function GuestBookCard({ id, to, message, from, onDelete }) {
  const palette = [
    '#FFF5C8', // pastel yellow
    '#EAF7FF', // pastel blue
    '#FDE2E4', // pastel pink
    '#E7F8F0', // pastel mint
    '#F7E8FF', // pastel purple
    '#FFF1E6', // pastel peach
    '#E8F0FF', // light periwinkle
    '#EFFFFA', // very light mint
  ];
  const seed = `${to}|${from}|${message}`;
  const bgColor = useMemo(() => palette[hashString(seed) % palette.length], [seed]);
  const darkColor = useMemo(() => darkenHex(bgColor, 0.22), [bgColor]);

  return (
    <div className="guestbook-card" style={{ backgroundColor: bgColor, '--gb-dark': darkColor }}>
      <p className="guestbook-to">To <span className="guestbook-name">{to}</span></p>
      <p className="guestbook-message">{message}</p>
      <p className="guestbook-from">From <span className="guestbook-name">{from}</span></p>

      <button className="gb-iconbtn danger gb-delete" aria-label="삭제" title="삭제" onClick={()=> onDelete && onDelete(id)}>
        <svg className="gb-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  );
}

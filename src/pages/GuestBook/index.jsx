import { useEffect, useRef, useState } from 'react';
import GuestBookCard from './GuestBookCard';
import { listGuestbook, listGuestbookSince, deleteGuestbook } from '../../api/guestbook';
import '../../styles/sub/guestbook.css';

export default function GuestBook() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const topCreatedRef = useRef(null);
  const timerRef = useRef(null);

  // Keep ref in sync with newest item's created_at
  useEffect(() => {
    topCreatedRef.current = items[0]?.created_at || null;
  }, [items]);

  // Initial load
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const { items: rows } = await listGuestbook({ limit: 50 });
        if (!mounted) return;
        setItems(rows);
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || '불러오기 실패');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Poll for new entries and prepend
  useEffect(() => {
    // start a single interval
    if (timerRef.current) return;
    timerRef.current = setInterval(async () => {
      const since = topCreatedRef.current;
      if (!since) return;
      try {
        const { items: newer } = await listGuestbookSince({ since, limit: 50 });
        if (newer && newer.length > 0) {
          // newer is ascending; reverse then prepend to keep descending order
          setItems((prev) => [...newer.slice().reverse(), ...prev]);
        }
      } catch (e) {
        // ignore transient errors
      }
    }, 5000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <section className="page-container">
      <div className="page-inner">
        <div className="guestbook-titlebox">
          <h2 className="guestbook-title">고생한 학우들에게 응원의 한마디!</h2>
        </div>

        <div className="guestbook-grid">
          {items.map((item) => (
            <GuestBookCard
              key={item.id}
              id={item.id}
              to={item.to}
              message={item.message}
              from={item.from}
              onDelete={async (id) => {
                if (!window.confirm('정말 삭제하시겠습니까?')) return;
                try {
                  const token = window.localStorage.getItem('GB_ADMIN_TOKEN') || window.prompt('관리자 토큰을 입력하세요');
                  if (!token) return;
                  window.localStorage.setItem('GB_ADMIN_TOKEN', token);
                  await deleteGuestbook({ id, adminToken: token });
                  setItems((prev) => prev.filter((it) => it.id !== id));
                } catch (e) {
                  alert(e?.message || '삭제 실패');
                }
              }}
            />
          ))}
        </div>

        {loading && <p style={{ marginTop: '1rem' }}>불러오는 중...</p>}
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </div>
    </section>
  );
}

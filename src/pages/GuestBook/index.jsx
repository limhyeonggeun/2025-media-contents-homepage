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
  const moreRef = useRef(null);
  const bottomCursorRef = useRef(null);
  const loadingMoreRef = useRef(false);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

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
        const { items: rows, nextCursor } = await listGuestbook({ limit: 200 });
        if (!mounted) return;
        setItems(rows);
        bottomCursorRef.current = nextCursor;
        setHasMore(Boolean(nextCursor));
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
    if (timerRef.current) return;
    timerRef.current = setInterval(async () => {
      const since = topCreatedRef.current;
      if (!since) return;
      try {
        const { items: newer } = await listGuestbookSince({ since, limit: 50 });
        if (newer && newer.length > 0) {
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

  // Infinite scroll: observe sentinel at the bottom to load older items
  useEffect(() => {
    if (!moreRef.current) return;
    const el = moreRef.current;
    const io = new IntersectionObserver(async (entries) => {
      const entry = entries[0];
      if (!entry.isIntersecting) return;
      if (loadingMoreRef.current) return;
      if (!hasMore) return;
      const cursor = bottomCursorRef.current;
      if (!cursor) return;
      loadingMoreRef.current = true;
      try {
        const { items: rows, nextCursor } = await listGuestbook({ limit: 100, cursor });
        if (rows && rows.length) {
          setItems((prev) => [...prev, ...rows]);
        }
        bottomCursorRef.current = nextCursor;
        setHasMore(Boolean(nextCursor));
      } catch (e) {
        setError(e?.message || '추가 로드 실패');
      } finally {
        loadingMoreRef.current = false;
      }
    }, { rootMargin: '200px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore]);

  // Manual load more (button)
  const loadMore = async () => {
    if (loadingMore) return;
    if (!hasMore) return;
    const cursor = bottomCursorRef.current;
    if (!cursor) return;
    setLoadingMore(true);
    try {
      const { items: rows, nextCursor } = await listGuestbook({ limit: 100, cursor });
      if (rows && rows.length) {
        setItems((prev) => [...prev, ...rows]);
      }
      bottomCursorRef.current = nextCursor;
      setHasMore(Boolean(nextCursor));
    } catch (e) {
      setError(e?.message || '추가 로드 실패');
    } finally {
      setLoadingMore(false);
    }
  };

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
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
          {hasMore && (
            <button onClick={loadMore} disabled={loadingMore}>
              {loadingMore ? '불러오는 중...' : '더 보기'}
            </button>
          )}
        </div>
        <div ref={moreRef} style={{ height: 1 }} />
      </div>
    </section>
  );
}

import React, { useEffect } from 'react';

export default function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  // Hooks must run unconditionally (before early returns)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowLeft') onPrev?.();
      if (e.key === 'ArrowRight') onNext?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  if (!photos || photos.length === 0 || index == null) return null;

  const safeIndex = Math.max(0, Math.min(index ?? 0, photos.length - 1));
  const src = photos[safeIndex];
  const alt = String(src).split('/').pop();

  return (
    <div className="lightbox-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img className="lightbox-img" src={src} alt={alt || ''} />
        <button className="lightbox-btn prev" aria-label="Previous" onClick={onPrev}>&lt;</button>
        <button className="lightbox-btn next" aria-label="Next" onClick={onNext}>&gt;</button>
        <button className="lightbox-close" aria-label="Close" onClick={onClose}>X</button>
      </div>
    </div>
  );
}


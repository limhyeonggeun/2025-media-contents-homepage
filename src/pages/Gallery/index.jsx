import React, { useEffect, useMemo, useState } from "react";
import "../../styles/sub/gallery.css";

export default function Gallery() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);
  // Load all images from the gallery folder
  const images = useMemo(() => {
    try {
      const ctx = require.context(
        "../../assets/images/gallery",
        false,
        /\.(png|jpe?g|gif|webp|svg)$/i
      );
      return ctx.keys().map(ctx);
    } catch (e) {
      // If folder missing or empty, fall back to empty array
      return [];
    }
  }, []);

  // Always shuffle photos for random order
  const photos = useMemo(() => {
    const arr = images.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [images]);

  const blockOrder = useMemo(() => {
    const blocks = ["A", "B", "C"];
    for (let i = blocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
    }
    return blocks;
  }, []);

  const pattern = useMemo(() => {
    const list = ["between", "center"];
    return list[Math.floor(Math.random() * list.length)];
  }, []);

  let slotIndex = 0;

  const PhotoBox = ({ size }) => {
    const index = slotIndex++;
    if (!photos[index]) return null; // remove empty slots
    const src = photos[index];
    const alt = String(src).split('/').pop();
    return (
      <div className={`gallery-item ${size}`}>
        <img src={src} alt={alt || ''} loading="lazy" decoding="async" />
      </div>
    );
  };

  const SmallCol = () => (
    <div className="gallery-col">
      <PhotoBox size="small" />
      <PhotoBox size="small" />
    </div>
  );

  const BlockA = () => (
    <div className="row">
      <PhotoBox size="wide" />
    </div>
  );

  const BlockB = () => (
    <div className="row">
      {pattern === "between" && (
        <>
          <PhotoBox size="tall" />
          <SmallCol />
          <PhotoBox size="tall" />
        </>
      )}

      {pattern === "center" && (
        <>
          <SmallCol />
          <PhotoBox size="tall" />
          <SmallCol />
        </>
      )}
    </div>
  );

  const BlockC = () => (
    <div className="row">
      <PhotoBox size="medium" />
      <PhotoBox size="medium" />
    </div>
  );

  const renderBlock = (id) => {
    if (id === "A") return <BlockA key="A" />;
    if (id === "B") return <BlockB key="B" />;
    if (id === "C") return <BlockC key="C" />;
  };

  const renderMobile = () => {
    const nodes = [];
    // Avoid relying on slotIndex (it increments during render).
    // Instead, loop by how many items the pattern consumes (1 + 2 = 3).
    let idx = 0;
    while (idx < photos.length) {
      nodes.push(
        <div className="row" key={`mw-${idx}`}>
          <PhotoBox size="wide" />
        </div>
      );
      nodes.push(
        <div className="row mobile-two" key={`m2-${idx}`}>
          <PhotoBox size="small" />
          <PhotoBox size="small" />
        </div>
      );
      idx += 3; // this pattern consumes up to 3 photos per cycle
    }
    return nodes;
  };

  return (
    <section className="page-container">
      <div className="page-inner gallery-inner">
        {isMobile ? (
          renderMobile()
        ) : (() => {
          const groupSize = pattern === "center" ? 8 : 7; // photos consumed per A+B+C
          const groups = Math.max(1, Math.ceil(photos.length / groupSize));
          return Array.from({ length: groups }).map((_, i) => (
            <React.Fragment key={i}>
              {blockOrder.map((id) => renderBlock(id))}
            </React.Fragment>
          ));
        })()}
      </div>
    </section>
  );
}

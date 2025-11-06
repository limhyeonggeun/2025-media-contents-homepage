import React, { useMemo } from "react";
import "../../styles/sub/gallery.css";

export default function Gallery() {
  const photos = Array(40).fill(null); 

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
    return (
      <div className={`gallery-item ${size}`}>
        {photos[index] && <img src={photos[index]} alt="" />}
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

  return (
    <section className="page-container">
      <div className="page-inner gallery-inner">
        {blockOrder.map((id) => renderBlock(id))}
      </div>
    </section>
  );
}
import { useEffect, useMemo, useState } from "react";

export default function ImageCarousel({
  images,
  altPrefix,
  containerClassName = "",
  imageClassName = "",
  intervalMs = 2800,
}) {
  const validImages = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [validImages.length]);

  useEffect(() => {
    if (validImages.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % validImages.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, validImages.length]);

  if (validImages.length === 0) {
    return null;
  }

  if (validImages.length === 1) {
    return (
      <div className={`image-carousel ${containerClassName}`}>
        <img className={imageClassName} src={validImages[0]} alt={`${altPrefix} preview`} decoding="async" />
      </div>
    );
  }

  return (
    <div className={`image-carousel ${containerClassName}`}>
      {validImages.map((src, index) => (
        <img
          key={`${src}-${index}`}
          className={`${imageClassName} image-carousel-slide ${index === activeIndex ? "active" : ""}`}
          src={src}
          alt={`${altPrefix} preview ${index + 1}`}
          loading="eager"
          decoding="async"
        />
      ))}

      <div className="image-carousel-dots" aria-hidden="true">
        {validImages.map((_, index) => (
          <span key={index} className={`image-carousel-dot ${index === activeIndex ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}

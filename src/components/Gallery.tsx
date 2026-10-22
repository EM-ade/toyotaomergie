"use client";

import { useState } from "react";
import { ImageFrame } from "./ImageFrame";
import type { ImageSlot } from "@/content/types";
import { cx } from "@/lib/cx";

/**
 * Vehicle gallery. A main frame with a thumbnail rail. Thumbnails are real
 * buttons with aria-pressed and keyboard support; the rail scrolls on mobile.
 */
export function Gallery({ images, name }: { images: ImageSlot[]; name: string }) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;

  return (
    <div className="gallery">
      <div className="gallery__main" role="group" aria-label={`${name} images`}>
        <ImageFrame
          slot={images[active]}
          priority
          showCaption
          sizes="(min-width: 1024px) 62vw, 100vw"
        />
      </div>

      {images.length > 1 && (
        <ul className="gallery__rail" aria-label={`${name} image thumbnails`}>
          {images.map((img, i) => (
            <li key={img.subject}>
              <button
                type="button"
                className={cx("gallery__thumb", i === active && "is-active")}
                aria-label={`Show image ${i + 1}: ${img.subject}`}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
              >
                <ImageFrame slot={img} showCaption={false} sizes="120px" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

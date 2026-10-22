"use client";

import { cx } from "@/lib/cx";
import type { ImageSlot } from "@/content/types";

interface ImageFrameProps {
  slot: ImageSlot;
  className?: string;
  /** Renders the frame in its dark variant for full-bleed photographic bands. */
  tone?: "paper" | "night";
  sizes?: string;
  /** Above-the-fold images should be eager; everything else lazy-loads. */
  priority?: boolean;
  /** Hides the placeholder caption where the subject is already stated in text. */
  showCaption?: boolean;
}

/**
 * Every image position on the site renders through this component.
 *
 * If a real asset is present at `slot.src`, it is rendered with Next's image
 * pipeline (responsive sizes, lazy loading, format negotiation, intrinsic
 * dimensions to prevent layout shift).
 *
 * If no asset is present — which is the current state, because no original
 * imagery was supplied — it renders a *designed* placeholder that states the
 * intended subject, the intended crop and the exact aspect ratio. It is
 * visibly a placeholder: it is not a grey box, and it is never a stock
 * photograph of an unrelated vehicle.
 */
export function ImageFrame({
  slot,
  className,
  tone = "paper",
  sizes = "100vw",
  priority = false,
  showCaption = true,
}: ImageFrameProps) {
  const hasAsset = Boolean(slot.src);

  return (
    <figure
      className={cx("image-frame", `image-frame--${tone}`, className)}
      style={{ aspectRatio: slot.aspect }}
      data-has-asset={hasAsset ? "true" : "false"}
    >
      {hasAsset ? (
        <ImageAsset slot={slot} sizes={sizes} priority={priority} />
      ) : (
        <PlaceholderPlate slot={slot} tone={tone} showCaption={showCaption} />
      )}
    </figure>
  );
}

/* --------------------------------------------------------------------------
   Real asset path — kept isolated so layout never depends on the asset.
   If the file is missing or fails to load, it falls back to the designed
   placeholder rather than showing a broken image.
-------------------------------------------------------------------------- */
import Image from "next/image";
import { useState } from "react";

function ImageAsset({
  slot,
  sizes,
  priority,
}: {
  slot: ImageSlot;
  sizes: string;
  priority: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <PlaceholderPlate slot={slot} tone="paper" showCaption />;
  }

  const [w, h] = slot.aspect.split("/").map((n) => Number(n.trim()));
  const ratio = w && h ? w / h : 16 / 9;

  return (
    <Image
      src={slot.src as string}
      alt={slot.alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      onError={() => setFailed(true)}
      style={{
        objectFit: slot.fit ?? "cover",
        objectPosition: slot.position ?? "center",
        padding: slot.fit === "contain" ? "8%" : undefined,
      }}
      data-ratio={ratio}
      data-fit={slot.fit ?? "cover"}
    />
  );
}

/* --------------------------------------------------------------------------
   Designed placeholder.
-------------------------------------------------------------------------- */
function PlaceholderPlate({
  slot,
  tone,
  showCaption,
}: {
  slot: ImageSlot;
  tone: "paper" | "night";
  showCaption: boolean;
}) {
  return (
    <div className="plate" aria-hidden={showCaption ? undefined : true}>
      {/* Registration corners — a deliberate, restrained placeholder device. */}
      <span className="plate__corner plate__corner--tl" />
      <span className="plate__corner plate__corner--tr" />
      <span className="plate__corner plate__corner--bl" />
      <span className="plate__corner plate__corner--br" />

      <div className="plate__inner">
        <span className="plate__mark" aria-hidden="true" />
        {showCaption && (
          <>
            <p className="plate__subject">
              <span className="plate__label">Image placeholder</span>
              {slot.subject}
            </p>
            <p className="plate__meta">
              {slot.crop ? <span>Crop: {slot.crop}</span> : null}
              <span>Ratio: {slot.aspect.replace(/\s/g, "")}</span>
              {tone === "night" ? null : null}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Vehicle } from "@/content/types";
import { ImageFrame } from "./ImageFrame";
import { ArrowRight, WhatsApp } from "./icons";
import { cx } from "@/lib/cx";
import { waHref } from "@/content/site";

/** No enquiry backend, so a price request goes straight to WhatsApp. */
const enquiryHref = (name: string) =>
  waHref(`Hello Omoregie Motors, I'd like to request a price for the ${name}.`);

/**
 * Vehicle card. Deliberately NOT a uniform grid tile: cards vary by the
 * `variant` prop so the vehicle index reads as an editorial list with a
 * featured lead, rather than a wall of identical boxes.
 *
 * The card states what is actually known — family, name, body type — and is
 * explicit about what is not. Nothing here invents a specification, a price or
 * an availability claim; the card's job is to help a buyer decide whether to
 * open the model or ask a dealer, not to imply data the project does not hold.
 */
export function VehicleCard({
  vehicle,
  variant = "standard",
  priority = false,
}: {
  vehicle: Vehicle;
  variant?: "standard" | "feature" | "row";
  priority?: boolean;
}) {
  const href = `/vehicles/${vehicle.slug}`;
  const isEvidenced = vehicle.hasEvidencedDetail;

  if (variant === "row") {
    return (
      <Link href={href} className="vcard vcard--row">
        <div className="vcard__media">
          <ImageFrame
            slot={vehicle.hero}
            showCaption={false}
            sizes="(min-width: 900px) 260px, 40vw"
          />
        </div>
        <div className="vcard__rowbody">
          <p className="vcard__family">{vehicle.family}</p>
          <h3 className="vcard__name vcard__name--sm">{vehicle.name}</h3>
          <p className="vcard__type">{vehicle.bodyType}</p>
        </div>
        <span className="vcard__rowarrow" aria-hidden="true">
          <ArrowRight width={16} height={16} />
        </span>
      </Link>
    );
  }

  const isFeature = variant === "feature";

  return (
    <div className={cx("vcard", isFeature && "vcard--feature")}>
      <Link href={href} className="vcard__open">
        <div className="vcard__media">
          <ImageFrame
            slot={vehicle.hero}
            showCaption={false}
            priority={priority}
            sizes={
              isFeature
                ? "(min-width: 1024px) 62vw, 100vw"
                : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            }
          />
          <div className="vcard__badges">
            {vehicle.verification === "unverified" && (
              <span className="chip chip--soft">Ask dealer for availability</span>
            )}
          </div>
        </div>
        <div className="vcard__body">
          <p className="vcard__family">{vehicle.family}</p>
          <h3 className={cx("vcard__name", isFeature && "vcard__name--lg")}>
            {vehicle.name}
          </h3>
          <p className="vcard__type">{vehicle.bodyType}</p>
          {isFeature && <p className="vcard__summary">{vehicle.summary}</p>}

          {/* What the buyer gets from this model. */}
          {isFeature && (
            <ul className="vcard__signals">
              <li>{vehicle.bodyType} body</li>
              <li>
                {isEvidenced
                  ? "Full model detail & photography"
                  : "Listed in the Omoregie Motors range"}
              </li>
              <li>Price on request from your dealer</li>
            </ul>
          )}
        </div>
      </Link>

      {/* The purchase actions sit outside the detail link so each is its own
          tap target — a card is a showroom unit, not a single hyperlink. */}
      <div className="vcard__actions">
        <a
          href={enquiryHref(vehicle.name)}
          className={cx(
            "btn",
            isFeature ? "btn--primary" : "btn--ink",
            "vcard__enquire",
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Request price
          <WhatsApp width={15} height={15} />
        </a>
        <Link href={href} className="link-rule vcard__detail">
          {isEvidenced ? "View model" : "Model details"}{" "}
          <ArrowRight width={14} height={14} />
        </Link>
      </div>
    </div>
  );
}

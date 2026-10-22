import Link from "next/link";
import { brand, telHref, waHref } from "@/content/site";
import { ArrowRight, Phone, WhatsApp } from "./icons";

/**
 * Sticky mobile action bar — call, WhatsApp, book a test drive.
 * Phone-first for the Nigerian showroom audience; hidden on desktop.
 */
export function MobileActionBar() {
  return (
    <div className="mbar" role="region" aria-label="Quick contact">
      <a className="mbar__btn mbar__btn--call" href={telHref(brand.salesPhone[0])}>
        <Phone width={17} height={17} />
        <span>Call</span>
      </a>
      <a
        className="mbar__btn mbar__btn--wa"
        href={waHref("Hello Omoregie Motors, I'd like to enquire about a Toyota.")}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsApp width={17} height={17} />
        <span>WhatsApp</span>
      </a>
      <Link className="mbar__btn mbar__btn--primary" href="/vehicles">
        <span>Book a test drive</span>
        <ArrowRight width={15} height={15} />
      </Link>
    </div>
  );
}

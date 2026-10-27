import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { brand, footerColumns, telHref, waHref } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight, Mail, Phone, Pin, WhatsApp } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__statement">
          <p className="footer__tagline">{brand.tagline}</p>
          <p className="footer__blurb">
            {brand.legalName} — an {brand.certifiedLine}, serving motorists,
            businesses and government institutions since {brand.founded}, across{" "}
            {brand.branchCount} locations in Lagos and Abuja.
          </p>
        </div>

        <div className="footer__grid">
          {footerColumns.map((col, i) => (
            <Reveal key={col.title} delay={i * 50} className="footer__colwrap">
              <nav aria-label={col.title} className="footer__col">
                <h2 className="footer__coltitle">{col.title}</h2>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          ))}
        </div>

        <div className="footer__contact">
          <p className="footer__contacttitle">Contact us</p>
          <ul>
            <li>
              <Phone width={15} height={15} />
              <a href={telHref(brand.salesPhone[0])}>{brand.salesPhone[0]}</a>
            </li>
            <li>
              <WhatsApp width={15} height={15} />
              <a href={waHref()} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <FaInstagram aria-hidden="true" />
              <a href={brand.socials.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <Mail width={15} height={15} />
              <a href={`mailto:${brand.emails.sales}`}>{brand.emails.sales}</a>
            </li>
            <li>
              <Pin width={15} height={15} />
              <span>
                45 Alhaji Tokan Street, Alaka Estate, Surulere, Lagos
              </span>
            </li>
          </ul>
        </div>

        <div className="footer__base">
          <p className="footer__legal">
            © {year} {brand.legalName}. All rights reserved.
          </p>
          <ul className="footer__legallinks">
            <li>
              <Link href="/legal/privacy">Privacy policy</Link>
            </li>
            <li>
              <Link href="/legal/terms">Terms of use</Link>
            </li>
            <li>
              <Link href="/legal/cookies">Cookies</Link>
            </li>
          </ul>
          <a className="footer__top" href="#top" aria-label="Back to top">
            Back to top <ArrowUpRight width={14} height={14} />
          </a>
        </div>

        <p className="footer__disclaimer">
          Omoregie Motors Nigeria Limited is an accredited dealer within the
          Toyota (Nigeria) Limited network. Toyota and the Toyota emblem are
          trademarks of Toyota Motor Corporation. Vehicle specifications,
          availability and pricing shown as &ldquo;on request&rdquo; are
          confirmed by our sales team.
        </p>
      </div>
    </footer>
  );
}

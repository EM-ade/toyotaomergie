"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Dealer } from "@/content/types";
import { ArrowRight, Mail, Phone, Pin } from "./icons";
import { Chip } from "./ui";
import { cx } from "@/lib/cx";

/**
 * Dealer directory.
 *
 * Rendered as an editorial list with a real filter, not a grid of identical
 * cards. The 7 dealers are rendered server-side; the filter narrows them
 * client-side. With JS off, all seven remain visible.
 *
 * Contact fields were not readable from the supplied screenshots, so the
 * record renders an explicit "held at our head office" state rather than an
 * invented phone number or address.
 */
export function DealerDirectory({ dealers }: { dealers: Dealer[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dealers;
    return dealers.filter((d) =>
      `${d.name} ${d.branches.map((b) => b.city).join(" ")}`
        .toLowerCase()
        .includes(q),
    );
  }, [dealers, query]);

  return (
    <div className="directory">
      <form
        className="directory__controls"
        role="search"
        aria-label="Search dealers"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="field directory__search">
          <label htmlFor="dq">Search dealers</label>
          <input
            id="dq"
            className="input"
            type="search"
            value={query}
            placeholder="Dealer name or location"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className="directory__count" aria-live="polite">
          {results.length} of {dealers.length} locations
        </p>
      </form>

      {results.length === 0 ? (
        <div className="directory__empty">
          <p className="display-4">No dealers match that search.</p>
          <p className="prose-body">
            Clear the search to see all {dealers.length} Omoregie Motors locations.
          </p>
        </div>
      ) : (
        <ul className="directory__list">
          {results.map((dealer, i) => (
            <li key={dealer.slug} className="directory__item">
              <Link href={`/dealers/${dealer.slug}`} className="dealerrow">
                <span className="dealerrow__index folio">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="dealerrow__main">
                  <span className="dealerrow__name">{dealer.name}</span>
                  <span className="dealerrow__city">
                    <Pin width={14} height={14} />
                    {dealer.branches[0]?.city ?? "Location to be confirmed"}
                  </span>
                </span>

                <span className="dealerrow__contacts">
                  {dealer.branches[0]?.phone ? (
                    <span className="dealerrow__contact">
                      <Phone width={14} height={14} />
                      {dealer.branches[0].phone}
                    </span>
                  ) : (
                    <Chip tone="verify">Contact held centrally</Chip>
                  )}
                  {dealer.branches[0]?.email && (
                    <span className="dealerrow__contact">
                      <Mail width={14} height={14} />
                      {dealer.branches[0].email}
                    </span>
                  )}
                </span>

                <span className="dealerrow__arrow" aria-hidden="true">
                  <ArrowRight width={16} height={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Branch list used on the dealer detail page.
--------------------------------------------------------------------------- */

export function BranchTable({ dealer }: { dealer: Dealer }) {
  return (
    <div className="branches">
      {dealer.branches.map((branch, i) => (
        <div className="branch" key={`${branch.city}-${i}`}>
          <div className="branch__head">
            <span className="folio">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="branch__city">{branch.city}</h3>
          </div>
          <dl className="branch__facts">
            <Fact icon={<Pin width={14} height={14} />} label="Address" value={branch.address} />
            <Fact icon={<Phone width={14} height={14} />} label="Phone" value={branch.phone} />
            <Fact icon={<Mail width={14} height={14} />} label="Email" value={branch.email} />
            <Fact label="Opening hours" value={branch.hours} />
          </dl>
        </div>
      ))}
    </div>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className={cx("fact", !value && "fact--missing")}>
      <dt>
        {icon}
        {label}
      </dt>
      <dd>
        {value ?? (
          <span className="fact__missing">Ask our team for details</span>
        )}
      </dd>
    </div>
  );
}

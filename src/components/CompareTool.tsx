"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ImageFrame } from "./ImageFrame";
import type { Vehicle } from "@/content/types";
import { Close } from "./icons";
import { cx } from "@/lib/cx";

const MAX = 3;

/**
 * Compare tool. The audit lists a "Compare" action as evidenced in the source
 * site's vehicle content, so it is implemented as a real, working tool rather
 * than a decorative affordance. It compares only the fields that are evidenced
 * across the selected models and flags the rest honestly.
 */
export function CompareTool({ vehicles }: { vehicles: Vehicle[] }) {
  const [selected, setSelected] = useState<string[]>(
    vehicles.filter((v) => v.hasEvidencedDetail).slice(0, 2).map((v) => v.slug),
  );

  const chosen = useMemo(
    () => selected.map((s) => vehicles.find((v) => v.slug === s)!).filter(Boolean),
    [selected, vehicles],
  );

  /**
   * Comparison rows are built from the real facts each record holds: body type,
   * model family, whether a detail page is published, and the feature copy the
   * site states. Fielded specification values are not reproduced (see
   * docs/live-site-audit.md), so no fabricated figures appear here.
   */
  const rows = useMemo(() => {
    const base: { group: string; label: string; values: string[] }[] = [
      {
        group: "Overview",
        label: "Body type",
        values: chosen.map((v) => v.bodyType),
      },
      {
        group: "Overview",
        label: "Model family",
        values: chosen.map((v) => v.family),
      },
      {
        group: "Overview",
        label: "Detail page",
        values: chosen.map((v) => (v.hasEvidencedDetail ? "Published" : "On request")),
      },
      {
        group: "Overview",
        label: "Price",
        values: chosen.map(() => "On request — confirm with a dealer"),
      },
      {
        group: "Key features",
        label: "Feature highlights",
        values: chosen.map((v) =>
          v.highlights.length ? v.highlights.map((h) => `• ${h}`).join("\n") : "Confirm with our sales team",
        ),
      },
    ];
    return base;
  }, [chosen]);

  const toggle = (slug: string) =>
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX) return prev;
      return [...prev, slug];
    });

  return (
    <div className="compare">
      <div className="compare__picker">
        <p className="label" id="compare-picker-label">
          Choose up to {MAX} models
        </p>
        <ul className="compare__options" aria-labelledby="compare-picker-label">
          {vehicles.map((v) => {
            const isOn = selected.includes(v.slug);
            const disabled = !isOn && selected.length >= MAX;
            return (
              <li key={v.slug}>
                <button
                  type="button"
                  className={cx("chip compare__option", isOn && "is-active")}
                  aria-pressed={isOn}
                  disabled={disabled}
                  onClick={() => toggle(v.slug)}
                >
                  {v.name}
                  {isOn && <Close width={12} height={12} />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {chosen.length === 0 ? (
        <p className="compare__empty">
          Select at least one model to compare specifications.
        </p>
      ) : (
        <div className="compare__tablewrap" tabIndex={0} role="region" aria-label="Model comparison table">
          <table className="compare__table">
            <thead>
              <tr>
                <th scope="col">
                  <span className="visually-hidden">Specification</span>
                </th>
                {chosen.map((v) => (
                  <th scope="col" key={v.slug}>
                    <div className="compare__head">
                      <ImageFrame
                        slot={v.hero}
                        showCaption={false}
                        sizes="(min-width: 768px) 220px, 50vw"
                      />
                      <Link href={`/vehicles/${v.slug}`} className="compare__name">
                        {v.name}
                      </Link>
                      <span className="compare__type">{v.bodyType}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => {
                const newGroup =
                  ri === 0 || rows[ri - 1].group !== row.group;
                return (
                  <FragmentRow
                    key={`${row.group}-${row.label}`}
                    group={row.group}
                    showGroup={newGroup}
                    label={row.label}
                    values={row.values}
                    colCount={chosen.length}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="compare__note">
        Only the fields we hold across the selected models are shown. Where a
        value is not confirmed, the table says so rather than filling the gap.
      </p>
    </div>
  );
}

import { Fragment } from "react";

function FragmentRow({
  group,
  showGroup,
  label,
  values,
  colCount,
}: {
  group: string;
  showGroup: boolean;
  label: string;
  values: string[];
  colCount: number;
}) {
  return (
    <Fragment>
      {showGroup && (
        <tr className="compare__grouprow">
          <th scope="colgroup" colSpan={colCount + 1}>
            {group}
          </th>
        </tr>
      )}
      <tr>
        <th scope="row">{label}</th>
        {values.map((val, i) => (
          <td
            key={i}
            data-unconfirmed={/to be confirmed|—/i.test(val) ? "true" : undefined}
          >
            {val}
          </td>
        ))}
      </tr>
    </Fragment>
  );
}

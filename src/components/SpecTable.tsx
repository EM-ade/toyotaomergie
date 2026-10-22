import type { Vehicle } from "@/content/types";

/**
 * Specification table. Two columns, group-captioned, tabular numerals.
 * Rows whose value is not evidenced carry the "to be confirmed" phrasing
 * rather than being silently omitted or guessed — so the table is honest
 * about exactly what is known.
 */
export function SpecTable({ groups }: { groups: Vehicle["specifications"] }) {
  return (
    <div className="specs">
      {groups.map((g) => (
        <table className="spec-table" key={g.group}>
          <caption>{g.group}</caption>
          <tbody>
            {g.rows.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                <td
                  data-unconfirmed={
                    /to be confirmed/i.test(r.value) ? "true" : undefined
                  }
                >
                  {r.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}

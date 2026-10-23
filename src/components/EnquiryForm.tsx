"use client";

import { useState, useId } from "react";
import { ArrowRight, Check, Warning } from "./icons";
import { cx } from "@/lib/cx";
import { brand, telHref, waHref } from "@/content/site";

export interface EnquiryField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  hint?: string;
  autoComplete?: string;
}

interface EnquiryFormProps {
  fields: EnquiryField[];
  submitLabel: string;
  /** Explains where submissions are governed to, honestly. */
  governanceNote: string;
  /** Hidden subject line, e.g. the vehicle name carried from a detail page. */
  subject?: string;
}

type Status = "idle" | "invalid" | "unavailable";

/**
 * Enquiry form.
 *
 * Validation is real: required fields, email and phone shape. There is no
 * submission backend behind this form yet — on a valid submit it shows a
 * thank-you that routes the customer to WhatsApp or phone, so no enquiry is
 * silently swallowed without a follow-up path.
 */
export function EnquiryForm({
  fields,
  submitLabel,
  governanceNote,
  subject,
}: EnquiryFormProps) {
  const baseId = useId();
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const f of fields) init[f.name] = f.type === "select" ? (f.options?.[0] ?? "") : "";
    return init;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const setValue = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => {
      if (!e[name]) return e;
      const next = { ...e };
      delete next[name];
      return next;
    });
    if (status !== "idle") setStatus("idle");
  };

  const validate = () => {
    const next: Record<string, string> = {};
    for (const f of fields) {
      const val = values[f.name]?.trim() ?? "";
      if (f.required && !val) {
        next[f.name] = `${f.label} is required.`;
        continue;
      }
      if (val && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        next[f.name] = "Enter a valid email address.";
      }
      if (val && f.type === "tel" && val.replace(/[^\d]/g, "").length < 7) {
        next[f.name] = "Enter a valid phone number.";
      }
    }
    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    setStatus(Object.keys(next).length ? "invalid" : "unavailable");
  };

  return (
    <form className="enquiry" onSubmit={onSubmit} noValidate>
      {subject && (
        <p className="enquiry__subject">
          <span className="eyebrow eyebrow--bare">Enquiry subject</span>
          <strong>{subject}</strong>
        </p>
      )}

      <div className="enquiry__grid">
        {fields.map((f) => {
          const id = `${baseId}-${f.name}`;
          const err = errors[f.name];
          const describedBy = [
            f.hint ? `${id}-hint` : null,
            err ? `${id}-err` : null,
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <div
              className={cx("field", f.type === "textarea" && "field--wide")}
              key={f.name}
            >
              <label htmlFor={id}>
                {f.label}
                {f.required ? (
                  <span aria-hidden="true" className="enquiry__req">
                    {" "}
                    *
                  </span>
                ) : (
                  <span className="enquiry__opt"> (optional)</span>
                )}
              </label>

              {f.type === "textarea" ? (
                <textarea
                  id={id}
                  className="textarea"
                  value={values[f.name]}
                  onChange={(e) => setValue(f.name, e.target.value)}
                  aria-invalid={err ? "true" : undefined}
                  aria-describedby={describedBy || undefined}
                  autoComplete={f.autoComplete}
                />
              ) : f.type === "select" ? (
                <select
                  id={id}
                  className="select"
                  value={values[f.name]}
                  onChange={(e) => setValue(f.name, e.target.value)}
                  aria-invalid={err ? "true" : undefined}
                  aria-describedby={describedBy || undefined}
                >
                  {f.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  className="input"
                  type={f.type}
                  value={values[f.name]}
                  onChange={(e) => setValue(f.name, e.target.value)}
                  aria-invalid={err ? "true" : undefined}
                  aria-describedby={describedBy || undefined}
                  autoComplete={f.autoComplete}
                />
              )}

              {f.hint && !err && (
                <p className="hint" id={`${id}-hint`}>
                  {f.hint}
                </p>
              )}
              {err && (
                <p className="error-text" id={`${id}-err`} role="alert">
                  {err}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="enquiry__foot">
        <button type="submit" className="btn btn--primary">
          {submitLabel}
          <ArrowRight width={16} height={16} />
        </button>
        <p className="hint enquiry__governance">{governanceNote}</p>
      </div>

      {status === "invalid" && (
        <div className="enquiry__result enquiry__result--error" role="alert">
          <Warning width={18} height={18} />
          <div>
            <p className="enquiry__result-title">Almost there.</p>
            <p className="enquiry__result-body">
              Please check the highlighted fields above, then submit again.
            </p>
          </div>
        </div>
      )}

      {status === "unavailable" && (
        <div className="enquiry__result enquiry__result--info" role="status">
          <Check width={18} height={18} />
          <div>
            <p className="enquiry__result-title">Thank you.</p>
            <p className="enquiry__result-body">
              For the quickest response, message us on{" "}
              <a
                href={waHref("Hello Omoregie Motors, I have an enquiry.")}
                className="link-rule"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>{" "}
              or call{" "}
              <a href={telHref(brand.salesPhone[0])} className="link-rule">
                {brand.salesPhone[0]}
              </a>{" "}
              — our team takes it from there.
            </p>
          </div>
        </div>
      )}
    </form>
  );
}

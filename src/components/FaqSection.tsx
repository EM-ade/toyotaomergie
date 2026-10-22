"use client";

import { Accordion } from "./Accordion";
import { Chip, TextLink } from "./ui";
import { ArrowRight } from "./icons";
import type { FaqItem } from "@/content/types";

export function FaqSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: FaqItem[];
}) {
  return (
    <section id={id} className="faq-cat" aria-labelledby={`${id}-title`}>
      <div className="faq-cat__head">
        <h2 id={`${id}-title`} className="display-3">
          {title}
        </h2>
        <Chip>{items.length} questions</Chip>
      </div>

      <Accordion
        allowMultiple={false}
        items={items.map((f) => ({
          id: f.id,
          question: f.question,
          answer: <p>{f.answer}</p>,
          meta:
            f.verification === "verified" ? (
              <TextLink
                href="/contact"
                className="faq-meta-link"
                icon={<ArrowRight width={13} height={13} />}
              >
                Ask about this
              </TextLink>
            ) : undefined,
        }))}
      />
    </section>
  );
}

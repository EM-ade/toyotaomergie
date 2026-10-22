import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ImageFrame } from "@/components/ImageFrame";
import { awards } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Awards",
  description:
    "Recognition received by Toyota and its dealers in Nigeria, including awards from the Nigeria Auto Journalists Association and Top 50 Brands Nigeria.",
  path: "/awards",
});

export default function AwardsPage() {
  const byYear = awards.reduce<Record<string, typeof awards>>((acc, a) => {
    (acc[a.year] = acc[a.year] || []).push(a);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <PageHero
        eyebrow="Recognition"
        title="Toyota, recognised in Nigeria."
        lede="Awards earned by Toyota and the models we supply, as recognised by the Nigerian motoring press."
        crumbs={[{ label: "Home", href: "/" }, { label: "Awards" }]}
        aside={
          <ImageFrame
            slot={{
              src: "/images/site/awards-01.jpg",
              alt: "Toyota award",
              subject: "Toyota award",
              crop: "editorial",
              aspect: "16 / 7",
            }}
            sizes="(min-width: 1000px) 46vw, 100vw"
          />
        }
      />

      <Section tone="paper" pad="md">
        <div className="shell">
          {years.map((year) => (
            <div key={year} className="awards-year">
              <h2 className="display-3 awards-year__label tabular">{year}</h2>
              <ol className="awards-list">
                {byYear[year].map((a, i) => (
                  <li key={`${year}-${i}`}>
                    <Reveal delay={i * 40} className="awards-item">
                      <span className="folio">{String(i + 1).padStart(2, "0")}</span>
                      <span className="awards-item__body">
                        <span className="awards-item__title">{a.title}</span>
                        <span className="awards-item__body-text">{a.body}</span>
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

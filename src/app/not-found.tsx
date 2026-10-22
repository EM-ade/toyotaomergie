import { Section } from "@/components/Section";
import { ButtonLink, TextLink } from "@/components/ui";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <Section tone="paper" pad="lg">
      <div className="shell notfound">
        <p className="eyebrow eyebrow--red">Error 404</p>
        <h1 className="display-2 notfound__title">
          That page isn’t in the network.
        </h1>
        <p className="lede">
          The destination you followed doesn’t exist here. The model index and
          the dealer directory are the fastest way back.
        </p>
        <div className="notfound__actions">
          <ButtonLink href="/vehicles" icon={<ArrowRight width={16} height={16} />}>
            Explore vehicles
          </ButtonLink>
          <ButtonLink href="/dealers" variant="outline">
            Find a dealer
          </ButtonLink>
        </div>
        <nav className="notfound__links" aria-label="Useful destinations">
          <TextLink href="/">Home</TextLink>
          <TextLink href="/service">After sales</TextLink>
          <TextLink href="/faq">FAQ</TextLink>
          <TextLink href="/contact">Contact</TextLink>
        </nav>
      </div>
    </Section>
  );
}

import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { EnquiryForm } from "@/components/EnquiryForm";
import { VerifyNotice } from "@/components/ui";
import { serviceTaxonomy } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Book a service",
  description:
    "Book a service with Omoregie Motors — general repair, preventative maintenance, diagnostics and more at our Lagos workshops.",
  path: "/service/request",
});

export default function ServiceRequestPage() {
  return (
    <>
      <PageHero
        eyebrow="Service & aftersales"
        title="Book a service."
        lede="Tell us about your vehicle and the work you need. Our service team confirms the schedule and books your appointment."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "After sales", href: "/service" },
          { label: "Book a service" },
        ]}
      />

      <Section tone="paper" pad="md">
        <div className="shell contact-grid">
          <div className="contact-grid__form">
            <EnquiryForm
              submitLabel="Send service enquiry"
              governanceNote="Prefer to talk? Call or message us on WhatsApp and we'll book you in."
              fields={[
                {
                  name: "name",
                  label: "Full name",
                  type: "text",
                  required: true,
                  autoComplete: "name",
                },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  required: true,
                  autoComplete: "email",
                },
                {
                  name: "phone",
                  label: "Phone",
                  type: "tel",
                  autoComplete: "tel",
                },
                {
                  name: "vehicle",
                  label: "Vehicle model",
                  type: "text",
                  required: true,
                  hint: "e.g. Land Cruiser Prado, Corolla, Hilux.",
                },
                {
                  name: "vin",
                  label: "VIN",
                  type: "text",
                  hint: "Optional, but it lets the dealer identify the exact build and part numbers.",
                },
                {
                  name: "service",
                  label: "Service required",
                  type: "select",
                  required: true,
                  options: [
                    "Not sure — please advise",
                    ...serviceTaxonomy.map((s) => s.name),
                  ],
                },
                {
                  name: "dealer",
                  label: "Preferred dealer",
                  type: "text",
                  hint: "Leave blank and we will book you into the location nearest you.",
                },
                {
                  name: "message",
                  label: "Anything else",
                  type: "textarea",
                  hint: "Symptoms, timing, or a preferred date.",
                },
              ]}
            />
          </div>

          <aside className="contact-grid__aside">
            <VerifyNotice title="What happens next" tone="verify">
              <p>
                Send the form and our service team will confirm your appointment
                by phone. To book immediately, call the workshop or message us on
                WhatsApp.
              </p>
            </VerifyNotice>
          </aside>
        </div>
      </Section>
    </>
  );
}

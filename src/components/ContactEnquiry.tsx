"use client";

import { useSearchParams } from "next/navigation";
import { EnquiryForm, type EnquiryField } from "./EnquiryForm";

const contactFields: EnquiryField[] = [
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
    hint: "Include your country code, e.g. +234.",
  },
  {
    name: "reason",
    label: "Reason for enquiry",
    type: "select",
    required: true,
    options: [
      "Vehicle enquiry",
      "Request a price",
      "Book a service",
      "Genuine parts or accessories",
      "Warranty or a service campaign",
      "Dealer network",
      "Corporate or media",
      "Something else",
    ],
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    hint: "Tell us what you need. If it relates to a vehicle, include the model and, where relevant, the VIN.",
  },
];

export function ContactEnquiry() {
  const params = useSearchParams();
  const subject = params.get("subject");
  const dealer = params.get("dealer");

  return (
    <EnquiryForm
      fields={contactFields}
      submitLabel="Send enquiry"
      subject={
        dealer
          ? `Enquiry to ${dealer}`
          : subject
            ? `Enquiry about the ${subject}`
            : undefined
      }
      governanceNote="Prefer to talk? Call or message us on WhatsApp and we'll respond straight away."
    />
  );
}

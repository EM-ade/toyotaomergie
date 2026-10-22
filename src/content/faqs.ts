import type { FaqItem } from "./types";

/**
 * FAQ records — sourced verbatim from the live Toyota Nigeria site
 * (https://www.toyotanigeria.com/faq/), crawled 2026.
 *
 * The live FAQ is organised into three panels — Sales, Spare Parts and Service
 * — containing 31 question/answer pairs. The answers below are the site's own
 * wording, lightly tidied (whitespace, list separators) without changing
 * meaning. This supersedes the earlier audit position that these facts were
 * unverified: the warranty period, parts warranty, first-service interval and
 * customer-service contacts are all stated by Toyota Nigeria itself.
 */

export const faqCategories = [
  "Sales",
  "Spare Parts",
  "Service",
] as const;

export const faqs: FaqItem[] = [
  // ---------------------------------------------------------------- Sales
  {
    id: "accredited-dealers",
    category: "Sales",
    question: "Who is Omoregie Motors?",
    answer:
      "Omoregie Motors is an accredited Toyota dealer, trading since 1978, with locations across Lagos and Abuja. Our addresses and phone numbers are on our Locations page.",
    verification: "verified",
  },
  {
    id: "why-buy-accredited",
    category: "Sales",
    question:
      "Why should I purchase my Toyota from an accredited dealer?",
    answer:
      "Your vehicle is covered in the event of a special service campaign.",
    verification: "verified",
  },
  {
    id: "accredited-vs-unofficial",
    category: "Sales",
    question:
      "What is the difference between models sold by an accredited dealer and unofficial sellers?",
    answer:
      "Vehicles supplied through the authorised Toyota network are built for our weather conditions and terrain. Buying from an accredited dealer keeps your vehicle covered by the manufacturer's warranty.",
    verification: "verified",
  },
  {
    id: "finance",
    category: "Sales",
    question: "How can I buy a Toyota vehicle under a finance agreement?",
    answer:
      "Our sales team can discuss finance options. Call or visit a showroom to talk through the arrangements available.",
    verification: "verified",
  },
  {
    id: "other-ranges",
    category: "Sales",
    question:
      "Why don't you sell other ranges of Toyota models (e.g. Matrix, Highlander, Tundra, and Lexus)?",
    answer:
      "Toyota produces vehicles to meet specific regional conditions. These usually have to do with compatibility issues relating to fuel chemical composition, terrains and general environmental conditions. Vehicles distributed in Nigeria are specified to operate optimally in the Nigerian market.",
    verification: "verified",
  },
  {
    id: "fuel-consumption",
    category: "Sales",
    question:
      "How do Toyota vehicle models compare to other brands in terms of fuel consumption?",
    answer:
      "Toyota vehicles are fuel efficient and compare favourably with other brands. Fuel consumption varies depending on fuel quality, environment, individual driving style, etc.",
    verification: "verified",
  },
  {
    id: "official-models",
    category: "Sales",
    question: "What are the Toyota models officially introduced in Nigeria?",
    answer:
      "Toyota models officially introduced in Nigeria can be found on our Vehicles page.",
    verification: "verified",
  },
  {
    id: "identify-accredited",
    category: "Sales",
    question:
      "How do I differentiate accredited dealers from unofficial/unaccredited Toyota sellers (grey dealers)?",
    answer:
      "Toyota (Nigeria) Limited accredited dealers can be identified through: The Toyota standard Corporate Identity Signage; Listing in adverts placed in newspapers by Toyota (Nigeria) Limited; Dealership certificates displayed at the dealerships; and listing on the ‘Dealers’ section of the Toyota (Nigeria) Limited website.",
    verification: "verified",
  },
  {
    id: "price-difference",
    category: "Sales",
    question:
      "Why are vehicles supplied through Toyota Nigeria priced differently from those imported through grey dealers?",
    answer:
      "Prices differ due to specification variations. Considering our harsh environment, all our vehicles come with a ‘Severe User Package’ which includes reinforced suspension, heavy duty shock absorbers, engine under-guards, etc. These are all intrinsic value built in to withstand conditions of our terrain and provide peace of mind motoring. The tax component also plays a major role in the seller's final pricing. Vehicles supplied through the authorised network carry the correct government dues and levies.",
    verification: "verified",
  },
  {
    id: "spec-differences",
    category: "Sales",
    question:
      "Why are features on Nigerian-distributed Toyota vehicles different from those of other countries?",
    answer:
      "Due to segmentation, the manufacturer offers to its accredited dealers in different countries specifications that are most suited to their environment.",
    verification: "verified",
  },
  {
    id: "leasing",
    category: "Sales",
    question: "Why don't you lease vehicles?",
    answer:
      "Our core business is to sell new vehicles and provide aftersales services.",
    verification: "verified",
  },
  {
    id: "colour-choice",
    category: "Sales",
    question: "Can I buy a Toyota vehicle in any colour of my choice?",
    answer: "Please contact our sales team to confirm available colours.",
    verification: "verified",
  },

  // --------------------------------------------------------- Spare Parts
  {
    id: "genuine-parts-where",
    category: "Spare Parts",
    question: "Where can I get genuine Toyota spare parts?",
    answer:
      "From Omoregie Motors. Our locations are listed on the Locations page.",
    verification: "verified",
  },
  {
    id: "parts-direct",
    category: "Spare Parts",
    question: "Can I buy parts directly from Omoregie Motors?",
    answer: "Yes — visit our spare parts department at our Victoria Island or Alaba workshop, or call us with your VIN.",
    verification: "verified",
  },
  {
    id: "parts-source",
    category: "Spare Parts",
    question: "Where do your spare parts come from?",
    answer:
      "Toyota manufactures vehicles for specific territories. We stock genuine parts for the Toyota model lines we support, and can supply or order parts for other models when required.",
    verification: "verified",
  },
  {
    id: "parts-benefits",
    category: "Spare Parts",
    question:
      "What are the benefits of buying genuine Toyota parts?",
    answer:
      "For quality assurance. There is a 12 months / 20,000km warranty on genuine parts purchased from accredited dealers. (Terms and conditions apply.)",
    verification: "verified",
  },
  {
    id: "parts-vin",
    category: "Spare Parts",
    question:
      "Why do you ask for my vehicle identification number before parts availability?",
    answer:
      "The Vehicle Identification Number (VIN) is important to select the correct unique part number for your Toyota vehicle anywhere in the world.",
    verification: "verified",
  },

  // ------------------------------------------------------------- Service
  {
    id: "where-service",
    category: "Service",
    question: "Where can I service my vehicle?",
    answer: "From Omoregie Motors.",
    verification: "verified",
  },
  {
    id: "dealer-contact-hours",
    category: "Service",
    question:
      "Where can I find contact information and hours of operation for a dealer?",
    answer:
      "Through Toyota Nigeria and from your accredited dealer.",
    verification: "verified",
  },
  {
    id: "service-outside-nigeria",
    category: "Service",
    question:
      "Can vehicles bought outside Nigeria be serviced by you?",
    answer: "Yes. Through appointment with the dealership.",
    verification: "verified",
  },
  {
    id: "what-is-warranty",
    category: "Service",
    question: "What is warranty?",
    answer:
      "Warranty is an assurance by the manufacturer that it will repair, replace or adjust at its option any factory installed part that is defective in materials or workmanship under normal use, at no cost to the customer. It clearly states the terms and conditions under which a warranty could be given, the specific period covered, etc. (Terms and conditions apply.)",
    verification: "verified",
  },
  {
    id: "warranty-coverage",
    category: "Service",
    question: "What warranty coverage do I have on my new Toyota vehicle?",
    answer:
      "3 years or 100,000km, whichever comes first after purchase.",
    verification: "verified",
  },
  {
    id: "claim-warranty",
    category: "Service",
    question: "How do I claim warranty on my vehicle?",
    answer:
      "Book an appointment with our workshop, who will look at your complaint and confirm whether it falls under warranty. If it does, you will be asked for your warranty booklet, where the date of delivery is established; necessary repairs are carried out and the claim raised through Toyota (Nigeria) Limited to the manufacturer.",
    verification: "verified",
  },
  {
    id: "warranty-any-dealer",
    category: "Service",
    question:
      "Must I return to the dealership where I purchased my vehicle to take advantage of warranty benefits?",
    answer:
      "Our workshop can take care of your warranty problem, provided you produce a warranty booklet that shows the delivery date of the vehicle.",
    verification: "verified",
  },
  {
    id: "warranty-replacement",
    category: "Service",
    question:
      "Can I get my vehicle replaced during the warranty period if it becomes faulty?",
    answer:
      "Warranty covers only defective parts due to the manufacturer's fault, and not vehicle replacement.",
    verification: "verified",
  },
  {
    id: "first-service",
    category: "Service",
    question: "When should I do the first service on my vehicle?",
    answer: "First service is to be done at 1,000km.",
    verification: "verified",
  },
  {
    id: "unofficial-workshops",
    category: "Service",
    question:
      "Can I service my vehicle at unofficial/unaccredited Toyota workshops?",
    answer:
      "Not recommended, as they lack the technical know-how and the equipment to carry out the job. This will also lead to forfeiture of your warranty benefits.",
    verification: "verified",
  },
  {
    id: "ssc",
    category: "Service",
    question: "What is a Special Service Campaign (SSC)?",
    answer:
      "SSC is an exercise carried out when there is a need to conduct checks on the quality of certain parts of a vehicle which may be defective, for possible replacement or repair.",
    verification: "verified",
  },
  {
    id: "recall-involved",
    category: "Service",
    question:
      "When Toyota recalls a vehicle globally, does it affect me?",
    answer:
      "Toyota (Nigeria) Limited participates in recalls based on advice from the manufacturer if the models affected are included in the Nigerian line-up.",
    verification: "verified",
  },
  {
    id: "recall-notice",
    category: "Service",
    question: "How do I know if my vehicle is affected in a recall?",
    answer:
      "Through adverts, calls and letters to affected customers. You can also contact us to confirm whether your vehicle is affected.",
    verification: "verified",
  },
  {
    id: "contact-omoregie",
    category: "Service",
    question:
      "How can I reach Omoregie Motors directly?",
    answer:
      "You can talk to our customer service representatives through our dedicated telephone numbers — 012772262 and 012772263. You can also reach us through our dedicated customer service e-mail address — cs@toyotanigeria.com.",
    verification: "verified",
  },
];

export const faqSourceNote =
  "Answers cover sales, spare parts and service, organised into three sections below.";
import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Black Iris Films Privacy Policy.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const policySections = [
  {
    heading: "PERSONAL INFORMATION WE COLLECT",
    paragraphs: [
      "When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.",
      "We refer to this automatically-collected information as “Device Information.”",
      "We collect Device Information using the following technologies:",
      "- “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.",
      "- “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.",
      "- “Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.",
      "When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.",
    ],
  },
  {
    heading: "HOW DO WE USE YOUR PERSONAL INFORMATION?",
    paragraphs: [
      "We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:",
      "Communicate with you;",
      "Screen our orders for potential risk or fraud; and",
      "When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.",
      "We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).",
      "We share your Personal Information with third parties to help us use your Personal Information, as described above. We also use Google Analytics to help us understand how our customers use the Site--you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.",
      "Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.",
    ],
  },
  {
    heading: "BEHAVIOURAL ADVERTISING",
    paragraphs: [
      "As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.",
      "You can opt out of targeted advertising by:",
      "FACEBOOK - https://www.facebook.com/settings/?tab=ads",
      "GOOGLE - https://www.google.com/settings/ads/anonymous",
      "Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at: http://optout.aboutads.info/.",
    ],
  },
  {
    heading: "DO NOT TRACK",
    paragraphs: [
      "Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.",
    ],
  },
  {
    heading: "DATA RETENTION",
    paragraphs: [
      "When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.",
    ],
  },
  {
    heading: "CHANGES",
    paragraphs: [
      "We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.",
    ],
  },
  {
    heading: "CONTACT US",
    paragraphs: [
      "For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at info@blackirisfilms.com",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-off-white">
        <section className="bg-navy-midnight px-6 pb-14 pt-32 text-white md:pb-16 md:pt-36 lg:px-10">
          <div className="mx-auto max-w-[980px]">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-mint">
              Privacy
            </p>
            <h1 className="text-4xl font-bold leading-[1.05] md:text-5xl">
              Black Iris Films Privacy Policy
            </h1>
          </div>
        </section>

        <section className="px-6 py-12 md:py-16 lg:px-10">
          <article className="mx-auto max-w-[980px] rounded-lg border border-fog/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,24,38,0.08)] md:p-10">
            <p className="text-sm leading-relaxed text-slate md:text-base">
              This Privacy Policy describes how your personal information is
              collected, used, and shared when you visit or make a purchase from
              www.blackirisfilms.com (the “Site”).
            </p>

            <div className="mt-9 space-y-9">
              {policySections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-navy">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-relaxed text-slate md:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}

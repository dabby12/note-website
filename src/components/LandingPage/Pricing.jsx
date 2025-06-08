import { FaCheck } from "react-icons/fa";
import { useState } from "react";
// add payment system in future for pricing
// import { useStripe } from '@stripe/react-stripe-js';
const tiers = [
  {
    name: "Free",
    id: "tier-free",
    href: "#",
    priceMonthly: "$0",
    priceYearly: "$0",
    description: "Perfect for personal note-taking and basic organization.",
    features: [
      "50 notes",
      "Basic text formatting",
      "Mobile access",
      "Tags and categories",
      "Export as PDF",
    ],
    featured: false,
    colorClass: "text-light-coral-500",
    bgColorClass: "bg-light-coral-500",
    ringColorClass: "ring-light-coral-500",
    shadowClass: "shadow-2xl shadow-light-coral-500",
  },
  {
    name: "Premium",
    id: "tier-premium",
    href: "#",
    priceMonthly: "$5.99",
    priceYearly: "$59.99",
    description:
      "Enhanced note-taking with advanced features for serious users.",
    features: [
      "Unlimited notes",
      "Advanced formatting",
      "Cloud sync across devices",
      "Offline access",
      "File attachments",
      "Priority support",
    ],
    featured: true,
    colorClass: "text-light-blue-500",
    bgColorClass: "bg-light-blue-500",
    ringColorClass: "ring-light-blue-500",
    shadowClass: "shadow-2xl shadow-light-blue-700",
  },
  {
    name: "Teams",
    id: "tier-teams",
    href: "#",
    priceMonthly: "$12.99",
    priceYearly: "$129.99",
    description: "Collaborative note-taking and sharing for teams.",
    features: [
      "Everything in Premium",
      "Shared workspaces",
      "Collaborative editing",
      "Permission controls",
      "Version history",
      "Admin dashboard",
    ],
    featured: false,
    colorClass: "text-light-amber-500",
    bgColorClass: "bg-light-amber-500",
    ringColorClass: "ring-light-amber-500",
    shadowClass: "shadow-2xl shadow-light-amber-700",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <div
      className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8"
      id="pricing"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-semibold text-indigo-600">Pricing</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose your perfect plan
        </p>
      </div>

      <div className="mx-auto mt-10 flex justify-center">
        <div className="flex items-center gap-x-3">
          <span
            className={`text-sm ${!annual ? "font-semibold text-gray-900" : "text-gray-500"}`}
          >
            Monthly
          </span>
          <button
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${annual ? "bg-indigo-600" : "bg-gray-200"}`}
            onClick={() => setAnnual(!annual)}
          >
            <span className="sr-only">Enable yearly billing</span>
            <span
              className={`${annual ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </button>
          <span
            className={`text-sm ${annual ? "font-semibold text-gray-900" : "text-gray-500"}`}
          >
            Yearly{" "}
            <span className="text-indigo-600 font-medium">(Save 20%)</span>
          </span>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 lg:max-w-6xl lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "bg-gray-900 scale-105"
                : "bg-white/60 sm:mx-4 lg:mx-0",
              "relative p-8 ring-1 ring-gray-900/10 sm:p-10 transition-all duration-300 hover:shadow-lg rounded-3xl",
              tier.shadowClass,
            )}
          >
            {tier.featured && (
              <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-indigo-500 px-3 py-1 text-center text-xs font-medium text-white">
                Most Popular
              </div>
            )}
            <h3
              id={tier.id}
              className={classNames(tier.colorClass, "text-base font-semibold")}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.colorClass,
                  "text-5xl font-semibold tracking-tight",
                )}
              >
                {annual ? tier.priceYearly : tier.priceMonthly}
              </span>
              <span className="text-base text-gray-500">
                /{annual ? "year" : "month"}
              </span>
            </p>
            <p className="mt-6 text-base text-gray-600">{tier.description}</p>
            <ul role="list" className="mt-8 space-y-3 text-sm text-gray-600">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3 items-center">
                  <FaCheck className={classNames(tier.colorClass, "h-6 w-5")} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold transition-all duration-300",
                tier.featured
                  ? `${tier.bgColorClass} text-white`
                  : `${tier.colorClass} ring-1 ring-inset ${tier.ringColorClass}`,
              )}
            >
              {tier.name === "Free"
                ? "Get started"
                : tier.featured
                  ? "Start free trial"
                  : "Get started"}
            </a>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-16 text-center text-gray-600 text-sm">
        Need special pricing?{" "}
        <a
          href="#contact"
          className="text-indigo-600 font-semibold hover:underline"
        >
          Contact us →
        </a>
      </div>
      <div className="text-center m-4  font-bold">
        <a href="/" className="text-gray-500">
          Not now?{" "}
          <a className="hover:underline text-light-coral-300 cursor-pointer">
            {" "}
            Back to home
          </a>
        </a>
      </div>
    </div>
  );
}

export default Pricing;

import { FaCheck } from "react-icons/fa";
import { useState } from 'react'

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '#',
    priceMonthly: '$0',
    priceYearly: '$0',
    description: "Perfect for personal note-taking and basic organization.",
    features: ['50 notes', 'Basic text formatting', 'Mobile access', 'Tags and categories', 'Export as PDF'],
    featured: false,
  },
  {
    name: 'Premium',
    id: 'tier-premium',
    href: '#',
    priceMonthly: '$5.99',
    priceYearly: '$59.99',
    description: 'Enhanced note-taking with advanced features for serious users.',
    features: [
      'Unlimited notes',
      'Advanced formatting',
      'Cloud sync across devices',
      'Offline access',
      'File attachments',
      'Priority support',
    ],
    featured: true,
  },
  {
    name: 'Teams',
    id: 'tier-teams',
    href: '#',
    priceMonthly: '$12.99',
    priceYearly: '$129.99',
    description: 'Collaborative note-taking and sharing for teams.',
    features: [
      'Everything in Premium',
      'Shared workspaces',
      'Collaborative editing',
      'Permission controls',
      'Version history',
      'Admin dashboard',
    ],
    featured: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Pricing() {
  console.error("NOTE: THE FUNCTIONS ARE NOT PROPERLY SETUP!")
  const [annual, setAnnual] = useState(false)

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8" id="pricing">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-1155/678 w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
          Choose your perfect plan
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
        Start with our free tier and upgrade as your note-taking needs grow. No hidden fees, cancel anytime.
      </p>
      
      {/* Billing toggle */}
      <div className="mx-auto mt-10 flex justify-center">
        <div className="flex items-center gap-x-3">
          <span className={`text-sm ${!annual ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>Monthly</span>
          <button
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${annual ? 'bg-indigo-600' : 'bg-gray-200'}`}
            onClick={() => setAnnual(!annual)}
          >
            <span className="sr-only">Enable yearly billing</span>
            <span
              className={`${
                annual ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </button>
          <span className={`text-sm ${annual ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
            Yearly <span className="text-indigo-600 font-medium">(Save 20%)</span>
          </span>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-6xl lg:grid-cols-3">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? 'relative z-10 bg-gray-900 shadow-2xl scale-105' : 'bg-white/60 sm:mx-4 lg:mx-0',
              tier.featured
                ? 'rounded-3xl'
                : tierIdx === 0
                  ? 'rounded-3xl lg:rounded-r-none'
                  : 'rounded-3xl lg:rounded-l-none',
              'p-8 ring-1 ring-gray-900/10 sm:p-10 transition-all duration-300 hover:shadow-lg',
            )}
          >
            {tier.featured && (
              <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-indigo-500 px-3 py-1 text-center text-xs font-medium text-white">
                Most Popular
              </div>
            )}
            <h3
              id={tier.id}
              className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'text-base/7 font-semibold')}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-5xl font-semibold tracking-tight',
                )}
              >
                {annual ? tier.priceYearly : tier.priceMonthly}
              </span>
              <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>
                /{annual ? 'year' : 'month'}
              </span>
            </p>
            <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? 'text-gray-300' : 'text-gray-600',
                'mt-8 space-y-3 text-sm/6 sm:mt-10',
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3 items-center">
                  <FaCheck
                    aria-hidden="true"
                    className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? 'bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500'
                  : 'text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600',
                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 transition-all duration-300',
              )}
            >
              {tier.name === 'Free' ? 'Get started' : tier.featured ? 'Start free trial' : 'Get started'}
            </a>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center">
        <h3 className="text-lg font-semibold text-gray-900">Need custom features?</h3>
        <p className="mt-2 text-gray-600">
          Contact us to discuss custom integrations, enterprise solutions, or specific note-taking features.
        </p>
        <a href="#contact" className="mt-4 inline-block text-indigo-600 font-medium hover:text-indigo-500">
          Contact support →
        </a>
      </div>
      <button className=''>
        <a href="/">
        Back to home
        </a>
      </button>
    </div>
  )
} 

export default Pricing

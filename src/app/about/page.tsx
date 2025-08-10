import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | M&B Fashion',
  description: 'Learn about M&B Fashion — who we are, what we stand for, and how we serve our customers.',
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <section className="space-y-6">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">About M&B Fashion</h1>
        <p className="text-gray-700 leading-7">
          M&B Fashion is your destination for contemporary style and everyday essentials. We curate versatile collections
          that blend quality, comfort, and design — helping you look and feel your best, from workdays to weekends.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Our Story</h2>
        <p className="text-gray-700 leading-7">
          Founded with a passion for effortless fashion, M&B began as a small idea: make great style simple and accessible.
          Today, we partner with trusted suppliers and emerging designers to bring you pieces that last beyond seasons,
          with thoughtful details and responsible sourcing where possible.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">What We Offer</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Curated collections for men and women, updated regularly</li>
          <li>Quality materials and comfortable fits for daily wear</li>
          <li>Transparent pricing and seasonal promotions</li>
          <li>Fast shipping and easy returns for a smooth experience</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Our Promise</h2>
        <p className="text-gray-700 leading-7">
          We stand behind every item we offer. If something isn’t right, our support team is here to help. We’re committed
          to continuous improvement — listening to your feedback, refining our fits, and expanding our range to serve you better.
        </p>
      </section>
    </main>
  )
}
"use client"

import React, { useMemo } from 'react'
import Link from 'next/link'

type favouriteType = {
    _id: string;
    product_id: string;
    name: string;
    description: string;
    price: string;
    user: string;
  };

type Props = {
    favoriteProducts: null | favouriteType[]
}

const FavouriteItems = ({ favoriteProducts }: Props) => {
  const isLoggedOut = useMemo(() => favoriteProducts === null, [favoriteProducts])
  const hasNoFavourites = useMemo(() => Array.isArray(favoriteProducts) && favoriteProducts.length === 0, [favoriteProducts])

  if (isLoggedOut) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-violet-50 px-4 py-16">
        <div className="max-w-lg w-full bg-white border border-gray-100 rounded-3xl shadow-xl p-10 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 text-violet-600 text-2xl font-semibold">
            ♥
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Sign in to view favourites</h1>
            <p className="text-gray-500">
              Save products you love and access them across all your devices by signing in to your account.
            </p>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg shadow-violet-200 hover:shadow-violet-300 transition"
          >
            Go to Login
          </Link>
        </div>
      </section>
    )
  }

  if (hasNoFavourites) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-violet-50 px-4 py-16">
        <div className="max-w-lg w-full bg-white border border-gray-100 rounded-3xl shadow-xl p-10 text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">No favourites yet</h1>
          <p className="text-gray-500">
            You have not added any items to your favourites. Explore our catalog and start building your list.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-[60vh] bg-gradient-to-br from-gray-50 via-white to-violet-50 px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Your Favourite Picks</h1>
          <p className="text-gray-500">Curated items you love. Add them to cart whenever you are ready.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteProducts?.map((item) => {
            const priceLabel = Number.isNaN(Number(item.price))
              ? item.price
              : `Rs.${Number(item.price).toLocaleString()}`

            return (
              <article
                key={item._id}
                className="group h-full bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
              >
                <div className="px-6 py-5 space-y-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-violet-100 text-violet-600 rounded-full">
                      Favorite
                    </span>
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-violet-600 transition">
                      {item.name}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-3">
                    {item.description || 'No description available for this product yet.'}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xl font-semibold text-violet-600">{priceLabel}</div>
                    <Link
                      href={`/products/${item.product_id}`}
                      className="text-sm font-semibold text-violet-600 hover:text-violet-500"
                    >
                      View product
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FavouriteItems
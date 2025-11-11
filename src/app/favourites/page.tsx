"use client"

import { useEffect, useState } from 'react'
import FavourteItems from '@/container/favourite-items'
import Loader from '@/component/loader/loader'
import { getFavoriteProducts } from '@/services/userservices'
import { getAuthToken } from '@/utils/cookies-function'

type favouriteType = {
    _id: string;
    product_id: string;
    name: string;
    description: string;
    price: string;
    user: string;
  };

const Page = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<null | favouriteType[]>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const token = getAuthToken()

  const fetchFavorites = async () => {

    if (!token) {
      setFavoriteProducts(null)
      setIsLoading(false)
      return
    }

    try {
      const res = await getFavoriteProducts(token)

      if (res.success) {
        const data = res?.data
        setFavoriteProducts(Array.isArray(data) ? data : [])
      } else {
        setFavoriteProducts(null)
      }
    } catch (error) {
      setFavoriteProducts(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFavorites()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
  <div>
    {isLoading ? (
      <Loader />
    ) : (
      <FavourteItems favoriteProducts={favoriteProducts} />
    )}
  </div>
  )
}

export default Page
"use client"

import React, { useEffect, useState } from 'react'
import { getAllOrders } from '@/services/userservices'

type OrderItem = {
  name?: string
  price?: number
  qty?: number
}

type Order = {
  order_id?: string
  customerName?: string
  email?: string
  status?: string
  totalAmount?: number
  createdAt?: string
  items?: OrderItem[]
  shippingAddress?: string
  [key: string]: any
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders()
        if(response.success){
            const ordersData = response?.data
            setOrders(Array.isArray(ordersData) ? ordersData : [])
        }else{
            setError('Unable to load orders at this time. Please try again later.')
        }
      } catch (err) {
        console.error('Failed to load orders', err)
        setError('Unable to load orders at this time. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null || Number.isNaN(Number(amount))) {
      return 'Rs.0'
    }
    return `Rs.${Number(amount).toLocaleString()}`
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Date not available'
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return dateString
    return date.toLocaleString()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-violet-50">
        <div className="w-14 h-14 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white border border-red-100 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-3">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-400">If the problem persists, contact support.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Orders Dashboard
          </h1>
          <p className="text-gray-600">Manage and review all customer orders in one place.</p>
        </div>

        {/* Orders Grid */}
        {orders.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Orders Yet</h2>
            <p className="text-gray-500">Orders will appear here once customers start placing them.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order, index) => {
              const {
                _id,
                first_name,
                last_name,
                mobile_number,
                email,
                status,
                totalAmount,
                createdAt,
                items,
                shopping_address,
              } = order

              const customerName = first_name + " " + last_name
              const shippingAddress = shopping_address.street_address + ", " + shopping_address.area  + ", " + shopping_address.city + ", " + shopping_address.country

              const displayStatus = status || 'Pending'
              const badgeColor =
                displayStatus.toLowerCase() === 'delivered'
                  ? 'bg-green-100 text-green-700'
                  : displayStatus.toLowerCase() === 'shipped'
                  ? 'bg-blue-100 text-blue-700'
                  : displayStatus.toLowerCase() === 'cancelled'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-amber-100 text-amber-700'

              return (
                <div
                  key={_id}
                  className="group bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 text-white flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/80">Order ID</p>
                      <p className="text-sm font-semibold">{_id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}>
                      {displayStatus}
                    </span>
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {customerName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {email}
                      </p>
                      <p className="text-sm text-gray-500">
                        {mobile_number}
                      </p>
                      <p className="text-sm text-gray-500">
                        {shippingAddress || 'No shipping address'}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <span>Order Date</span>
                        <span className="font-medium text-gray-800">{formatDate(createdAt)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Total Amount</span>
                        <span className="text-lg font-semibold text-violet-600">
                          {formatCurrency(totalAmount || order.total || order.amount)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Items</h4>
                      <div className="space-y-2">
                        {(items || order.items || []).slice(0, 3).map((item, itemIndex) => (
                          <div
                            key={`${_id}-item-${itemIndex}`}
                            className="flex items-center justify-between text-sm bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl"
                          >
                            <span className="text-gray-700 flex-1">{item?.name || `Item ${itemIndex + 1}`}</span>
                            <span className="text-gray-500 flex-1 text-right">
                              {item?.qty || 1} × {formatCurrency(item?.price as number)}
                            </span>
                          </div>
                        ))}
                        {(items || order.items || []).length > 3 && (
                          <p className="text-xs text-gray-400">+ more items not shown</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOrders
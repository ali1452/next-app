import dynamic from 'next/dynamic'

const AdminOrders = dynamic(() => import('@/container/admin-orders'), { ssr: false })

export default function AdminOrdersPage() {
	return <AdminOrders />
}

import ProductsLayout from '@/container/productLayout'
import { getAllProducts } from '@/services/userservices'

export default async function Products() {
  let data = []
  const resp = await getAllProducts()
  if(resp?.status ==200){
    data = resp.data
  }

  return (
   <>
   <ProductsLayout productData ={data} />
   </>
  )
}
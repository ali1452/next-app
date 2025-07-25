import React from 'react';
import ProductDetailComp from '@/container/productDetailComp';
import { getProduct } from '@/services/userservices'

const ProductDetail = async({params}:any) => {
  let data = null
  const res = await getProduct(params.id)

  if(res?.status== 200){
    data = res.data[0]
  }

  return (
    <div>
      <ProductDetailComp data={data} />
    </div>
  )
}

export default ProductDetail
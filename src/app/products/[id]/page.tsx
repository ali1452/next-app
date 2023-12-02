import React from 'react';
import ProductDetailComp from '@/container/productDetailComp';

const ProductDetail = ({params}:any) => {
    console.log({params})
  return (
    <div>
      <ProductDetailComp id={params.id} />
    </div>
  )
}

export default ProductDetail
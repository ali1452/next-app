import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/css';
import Link from 'next/link';

type Iprops= {
  productData:any[],
  category:string
}

const ProductSlider = ({productData, category}:Iprops) => {

  return (
    <div style={{maxWidth:'1050px'}}>
    <Swiper
      pagination={false}
      navigation={false} 
      modules={[Autoplay, Navigation,Pagination]}
      spaceBetween={10}
      slidesPerView={'auto'}
      autoplay={{
        delay: 1500,
      }}
      loop={true}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      breakpoints={{
        1: {
          slidesPerView: 2.3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        
      }}
    >
      {productData && productData.length >0 && productData.map((item,index)=>{
         const {url,name,price,sku,brand,product_id} = item
        if(category == item.category){
          return(
            <SwiperSlide key ={index+1}>
              <Link href={`/products/${product_id}`}>
              <div>
                <img src={`https://res.cloudinary.com/dpnza2tuy/image/upload/v1717048876/${url}`} alt='image'  />
                <p>{name}</p>
                <p>{brand}</p>
                <p>{price}</p>
              </div>
              </Link>
            </SwiperSlide>
          )
        }
      })}
    </Swiper>
    </div>
  );
};

export default ProductSlider;
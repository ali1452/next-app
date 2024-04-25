import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

// Import Swiper styles
import 'swiper/css';

type Iprops= {
  productData:any[]
}

const ProductSlider = ({productData}:Iprops) => {

  return (
    <div style={{maxWidth:'1050px'}}>
    <Swiper
      pagination={false}
      navigation={true} 
      modules={[Navigation,Pagination]}
      spaceBetween={10}
      // slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      breakpoints={{
        1: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        
      }}
    >
      {productData && productData.length >0 && productData.map((item,index)=>{
         const {url,name,price,sku,brand} = item
        return(
          <SwiperSlide key ={index+1}>
            <div>
              <img src={`/${url}`} alt='image'  />
              <p>{name}</p>
              <p>{brand}</p>
              <p>{price}</p>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
    </div>
  );
};

export default ProductSlider;
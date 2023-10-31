





import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../swiper.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="src/assets/swiperSh.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/swiper4Sh.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/swiper2Sh.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/swiper3Sh.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
















        


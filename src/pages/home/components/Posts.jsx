import React from "react";
import Stories from "./stories";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper React components
import { SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
const Posts = () => {
  return (
    <div>
      <div className="w-[70%] sm:w-[60%] md:w-[55%] lg:w-[40%] mx-auto mb-20 mt-5">
        <div className="flex items-center mb-5 justify-between">
          <div className="flex items-center gap-2">
            <img
              className="w-[10%]"
              src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
              alt=""
            />
            <p>
              premierzal.tj <span className="text-gray-400">• 1 дн.</span>
            </p>
          </div>
          <MoreHorizIcon />
        </div>
        <div>
          <div className="h-[400px] sm:h-[500px] md:h-[650px] text-white 2xl:h-[700px]">
            <Swiper
              pagination={{
                type: "fraction",
                color: "white",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide className="text-white">
                <img
                  className="rounded-xl mt-3"
                  src="https://i.pinimg.com/564x/2a/83/69/2a8369e773ca23497e5b3055882f684f.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="rounded-xl mt-3"
                  src="https://i.pinimg.com/564x/96/a9/f9/96a9f98dab31a3200f0d94f94a5e70c9.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="rounded-xl mt-3"
                  src="https://i.pinimg.com/564x/3d/e5/82/3de582172f942f83c3a7c7c1af8bdbea.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="rounded-xl mt-3"
                  src="https://i.pinimg.com/564x/39/28/0f/39280ffc58854ba66e8047f3a881c2aa.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="rounded-xl mt-3"
                  src="https://i.pinimg.com/564x/6d/4b/2f/6d4b2f2fea3f5a94acf033c3aca0ece1.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="rounded-xl mt-3"
                  src="https://i.pinimg.com/564x/47/12/5f/47125faf05b3cde96ac044e6abd1d3e9.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="rounded-xl mt-3"
                  src="https://i.pinimg.com/564x/47/12/5f/47125faf05b3cde96ac044e6abd1d3e9.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="rounded-xl mt-3"
                  src="https://i.pinimg.com/736x/d4/6c/0f/d46c0fda5dfd86c0bc2223282a88fab6.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="rounded-xl mt-3"
                  src="https://i.pinimg.com/564x/2a/83/69/2a8369e773ca23497e5b3055882f684f.jpg"
                  alt=""
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;

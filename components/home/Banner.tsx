import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import Link from "next/link";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <div className="banner-section">
      <div className="container">
        <Swiper
          speed={2500}
          loop={true}
          autoplay={{
            delay: 4000,
          }}
          modules={[Autoplay]}
          className="banner-wrapper mySwiper">
          <SwiperSlide className="banner-items">
            <div className="container">
              <div className="banner-content banner-bg-one">
                <h1>100% de Bonus</h1>
                <h2>Sur votre 1er Parie</h2>
                <Link
                  href="#0"
                  className="cmn--btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2">
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="banner-items banner-bg-two">
            <div className="container">
              <div className="banner-content">
                <h1>Bonus CashBack</h1>
                <h2>20% si votre 1er Paris est perdant</h2>
                <Link
                  href="#0"
                  className="cmn--btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2">
                  <span>Inscrivez vous</span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="banner-items banner-bg-three">
            <div className="container">
              <div className="banner-content">
                <h1>Interdit au -18 Ans</h1>
                <Link
                  href="#0"
                  className="cmn--btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2">
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;

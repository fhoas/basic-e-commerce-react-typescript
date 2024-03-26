import { useState, useEffect } from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MenuCarousel() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container hidden sm:block mx-16 my-8 max-h-[400px]">
      <Slider {...settings}>
        <div className="max-h-[400px] md:min-h-[400px]">
          {loading ? (
            <Skeleton height={400} />
          ) : (
            <img
              className="w-full h-full max-h-[400px] rounded-[5px]"
              src="/assets/banner.jpeg"
              alt=""
            />
          )}
        </div>
        <div className="max-h-[400px]">
          {loading ? (
            <Skeleton height={400} />
          ) : (
            <img
              className="w-full h-full max-h-[500px] rounded-[5px]"
              src="https://img.freepik.com/free-vector/realistic-winter-sale-banner-template_52683-100252.jpg?w=2000&t=st=1711363892~exp=1711364492~hmac=66229b8408b1b0e38516b8b561d241ca074b5c277f2a2b0b062e609207e7cc0a"
              alt=""
            />
          )}
        </div>
      </Slider>
    </div>
  );
}

export default MenuCarousel;

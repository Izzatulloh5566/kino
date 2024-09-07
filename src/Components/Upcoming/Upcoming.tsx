import { SwiperSlide, Swiper } from "swiper/react"
import 'swiper/css';
import { Autoplay, Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import { getData } from "../../api/getData";
import Btn from "../UI/Btn";
import Loader from "../UI/Loader";

const Upcoming = () => {
  const { data } = getData('movie', 'upcoming', 1)
  const fullImg = import.meta.env.VITE_FULL_IMG
  const hdImg = import.meta.env.VITE_HD_IMG
  const [next, setNext] = useState(1)

  const line = useRef<HTMLElement>(null)
  const onAutoplayTimeLeft = (_: any, __: any, progress: number) => {
    if (line.current) {
      line.current.style.width = `${(1 - progress) * 100}%`
    }
  }

  if (data) {
    const changeSlide = () => {
      if (data.length - 1 == next) {
        setNext(0)
      } else {
        setNext(next + 1)
      }
    }
    return (
      <>

        <Swiper
          className="upcoming"
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          modules={[Autoplay, Navigation]}
          loop={true}
          navigation={{ nextEl: ".upcoming_next" }}
          onSlideChangeTransitionEnd={changeSlide}
          allowTouchMove={false}
          breakpoints={{
            0: {
              allowTouchMove: true,
              allowSlidePrev: false
            },
            600: {
              allowTouchMove: false,
            }
          }}
        >
          {data.map(movie => (
            <SwiperSlide className="upcoming_item" key={movie.id}>
              <img className="upcoming_item_img" src={`${fullImg}${movie.backdrop_path}`} alt="" />
              <h2 className="upcoming_item_title">{movie.title}</h2>
              <p className="upcoming_item_text">{movie.overview}</p>
              <Btn id={movie.id} type="movie" />
            </SwiperSlide >
          ))}

          <div className="upcoming_next">
            <img className="upcoming_next_img" src={`${hdImg}${data[next].backdrop_path}`} alt="" />
            <p className="upcoming_next_text">Следующий</p>
            <h2 className="upcoming_next_title">{data[next].title}</h2>
            <div className="upcoming_next_line">
              <span ref={line}></span>
            </div>
          </div>

        </Swiper>
      </>
    )
  }
  else return <Loader />
}

export default Upcoming
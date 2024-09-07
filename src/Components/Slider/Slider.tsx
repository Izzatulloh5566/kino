import { FC, useState } from "react"
import { RiArrowRightSLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css/navigation';
import { getData } from "../../api/getData"
import Infoblock from "../Infoblock/Infoblock"
import { axiosClient } from "../../api/axiosClinets"
import infoStore from "../../store/infoId"
interface ISliderProps {
    type: string
}
const Slider: FC<ISliderProps> = ({ type }) => {
    const [active, setActive] = useState(false)
    const img = import.meta.env.VITE_HD_IMG
    const { data } = getData(type, 'popular',1)
    const { setActors, setInfoMovie, setInfoTv, infoMovie, infoTv } = infoStore()
    const getInfo = async (id: number) => {
        setActive(false)
        setInfoMovie(null)
        setInfoTv(null)
        const res = await axiosClient.get(`${type}/${id}`)
        const res2 = await axiosClient.get(`${type}/${id}/credits`)
        setActors(res2)
        type == 'movie' ? setInfoMovie(res) : setInfoTv(res)
        setActive(true)
    }
    if (data) {
        return (
            <>
                <div className="slider">
                    <Link to={`/${type}`} className="slider_title">
                        {type == 'movie' ? "Фильмы" : "Сереалы"}
                        <span><RiArrowRightSLine /></span>
                    </Link>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={24}
                        modules={[Navigation]}
                        navigation={true}
                        grabCursor={true}
                        breakpoints={{
                            1700: {
                                slidesPerView: 5
                            },
                            1500: {
                                slidesPerView: 4.5
                            },
                            1300: {
                                slidesPerView: 4
                            },
                            1100: {
                                slidesPerView: 3.5
                            },
                            800: {
                                slidesPerView: 3
                            },
                            700: {
                                slidesPerView: 2.8,
                                spaceBetween: 20
                            },
                            500: {
                                slidesPerView: 2.3,
                                spaceBetween: 15
                            },
                            400: {
                                slidesPerView: 2
                            },
                            350: {
                                slidesPerView: 1.5
                            },
                            0: {
                                slidesPerView: 1.2
                            },
                        }}
                    >
                        {
                            data.map(movie => (
                                <SwiperSlide key={movie.id} className="slider_slide" onClick={() => getInfo(movie.id)}>
                                    <img src={img + movie.poster_path} alt="" />
                                </SwiperSlide>
                            ))
                        }
                        <SwiperSlide className="slider_slide" >
                            <Link to={type} className="slider_slide_link">
                                <span><RiArrowRightSLine /></span>
                                Все {type == 'movie' ? "Фильмы" : "Сереалы"}
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <Infoblock type={type} active={active} setActive={setActive} info={type == 'movie' ? infoMovie : infoTv} />
            </>
        )
    }
}
export default Slider